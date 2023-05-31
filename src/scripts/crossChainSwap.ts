import dotenv from 'dotenv'
import {ethers} from 'ethers'
import {NonceManager} from "@ethersproject/experimental";
import {
    initAll,
    StargateBlockchainType,
    BlockchainToRouterAddress,
    BlockchainToChainId,
    BlockchainToScannerUrl
} from '../utils/providers'
import {BlockchainToToken} from '../utils/tokens'
import {StargateRouterAbi__factory, ERC20Abi__factory} from "../../typechain";
import chalk from "chalk";
import {createClient} from '@layerzerolabs/scan-client';
import loading from 'loading-cli';
import {IShuttleConfig} from "../interfaces/IShuttleConfig";
import PriceController from "../controllers/PriceController";

const lzClient = createClient('mainnet');

async function main(config: IShuttleConfig, providers: any) {
    console.log(chalk.cyan('Starting with config: '), config);

    if (!config.options.sourcePath || !config.options.destinationPath || !config.options.amount) {
        return new Error('Arguments missing');
    }

    const {amount, sourcePath, destinationPath, slippage} = config.options

    const [srcChain, srcToken] = sourcePath.split('-');
    const [dstChain, dstToken] = destinationPath.split('-');

    const fromNetwork = srcChain as StargateBlockchainType;
    const toNetwork = dstChain as StargateBlockchainType;

    console.log(chalk.cyan(`Cross Chain Swap from ${fromNetwork} to ${toNetwork}`))

    const tokenDecimals = BlockchainToToken[fromNetwork][srcToken].decimals;

    const amountFormatted = ethers.utils.parseUnits(amount, tokenDecimals);
    const amountOutMin = ethers.BigNumber.from(amountFormatted)
        .sub(ethers.BigNumber.from(amountFormatted)
            .div(1000)
            .mul(slippage)
        )

    const providerFeeData = await providers[fromNetwork].getFeeData()

    const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, providers[fromNetwork])
    const nonceManager = new NonceManager(signer);
    nonceManager.connect(providers[fromNetwork]);

    // Check if we have enough balance for specified amount for swap
    const tokenFromContract = ERC20Abi__factory.connect(BlockchainToToken[fromNetwork][srcToken].address, signer)
    const balance = await tokenFromContract.balanceOf(signer.address);

    console.log(chalk.cyan('Connected wallet: '), signer.address)
    console.log(chalk.cyan(`${fromNetwork} ${srcToken} Balance:`), `${ethers.utils.formatUnits(balance, tokenDecimals)}`)
    console.log(chalk.cyan(`Amount for Swap:`), `${ethers.utils.formatUnits(amountFormatted, tokenDecimals)}`)

    if (balance.lt(amountFormatted)) {
        throw new Error(`Not enough balance of $${srcToken} found on ${fromNetwork}`);
    }

    // Check if we have enough allowance for Router contract
    // Approving spend if needed
    const allowance = await tokenFromContract.allowance(signer.address, BlockchainToRouterAddress[fromNetwork])

    console.log(chalk.cyan(`Allowance: `), `${ethers.utils.formatUnits(allowance, tokenDecimals)}`)

    if (allowance.lt(amountFormatted)) {
        const approveFunctionData = tokenFromContract.interface.encodeFunctionData("approve", [BlockchainToRouterAddress[fromNetwork], amountFormatted])

        await nonceManager.sendTransaction({
            from: signer.address,
            to: tokenFromContract.address,
            gasPrice: providerFeeData.gasPrice,
            data: approveFunctionData
        })
    }

    // We initialize router on fromNetwork, as we will specify destination network during swap
    const router = StargateRouterAbi__factory.connect(BlockchainToRouterAddress[fromNetwork], signer);

    let dstNativeAmount = '0';
    let dstNativeAddr = "0x";

    if (config.refuel.enabled) {
        console.log(chalk.cyan(`Refuel Enabled, fetching dst chain Native token price`));
        const dstChainNativeTokenId = PriceController.getNativeTokenIdForChain(toNetwork);
        const currentEthPrice = await PriceController.getCurrentPrice(dstChainNativeTokenId);

        const amountToPriceRatio = (config.refuel.amountUSD / currentEthPrice).toFixed(3);

        dstNativeAmount = ethers.utils.parseEther(amountToPriceRatio).toString()
        dstNativeAddr = signer.address;
        console.log(chalk.cyan('DstNativeAmount set to '), `${ethers.utils.formatUnits(dstNativeAmount)}`)
    }

    const lzObject = {
        dstGasForCall: 0,
        dstNativeAmount: dstNativeAmount,
        dstNativeAddr: dstNativeAddr
    };

    const quoteData = await router.quoteLayerZeroFee(
        BlockchainToChainId[toNetwork],
        1,
        signer.address,
        "0x",
        lzObject
    )
    const feeWei = quoteData[0];

    console.log(chalk.cyan('LayerZero fee: '), ethers.utils.formatUnits(feeWei))

    const swapFunctionData = router.interface.encodeFunctionData("swap", [
        BlockchainToChainId[toNetwork],
        BlockchainToToken[fromNetwork][srcToken].poolId,
        BlockchainToToken[toNetwork][dstToken].poolId,
        signer.address,
        amountFormatted,
        amountOutMin,
        lzObject,
        signer.address,
        "0x"
    ]);

    const tx = await nonceManager.sendTransaction({
        from: signer.address,
        to: router.address,
        value: feeWei,
        data: swapFunctionData,
        gasLimit: 900000,
        gasPrice: providerFeeData.gasPrice,
    })

    await tx.wait(1)

    console.log(chalk.cyan(`Source chain TX link:`), `${BlockchainToScannerUrl[fromNetwork]}/tx/${tx.hash}`)

    const load = loading(chalk.cyan('Waiting for money to come on destination chain...')).start();

    const waitForDepositOnDestinationChain = setInterval(async () => {
        try {
            const {messages} = await lzClient.getMessagesBySrcTxHash(tx.hash);

            if (messages && messages.length) {
                const currentStatus = messages[0].status;

                if (currentStatus === 'INFLIGHT') {
                    load.text = chalk.cyan('LayerZero Status changed to Inflight')
                } else if (currentStatus === 'DELIVERED') {
                    load.stop();

                    console.log(chalk.green(`Funds transferred successfully from ${srcChain} to ${dstChain} 🚀`));

                    clearInterval(waitForDepositOnDestinationChain);
                } else if (currentStatus === 'FAILED') {
                    load.stop();

                    console.log(chalk.red(`There was an error during transfer of funds from ${srcChain} to ${dstChain}`));

                    clearInterval(waitForDepositOnDestinationChain);
                }
            }
        } catch (e: any) {
            console.log(chalk.red(`LZ API Error: `), e.message)
        }
    }, 10000);
}

export default main;