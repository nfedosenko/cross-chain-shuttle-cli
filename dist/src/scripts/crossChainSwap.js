"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const experimental_1 = require("@ethersproject/experimental");
const providers_1 = require("../utils/providers");
const tokens_1 = require("../utils/tokens");
const typechain_1 = require("../../typechain");
const chalk_1 = __importDefault(require("chalk"));
const scan_client_1 = require("@layerzerolabs/scan-client");
const loading_cli_1 = __importDefault(require("loading-cli"));
const PriceController_1 = __importDefault(require("../controllers/PriceController"));
const lzClient = (0, scan_client_1.createClient)('mainnet');
async function main(config, providers) {
    console.log(chalk_1.default.cyan('Starting with config: '), config);
    if (!config.options.sourcePath || !config.options.destinationPath || !config.options.amount) {
        return new Error('Arguments missing');
    }
    const { amount, sourcePath, destinationPath, slippage } = config.options;
    const [srcChain, srcToken] = sourcePath.split('-');
    const [dstChain, dstToken] = destinationPath.split('-');
    const fromNetwork = srcChain;
    const toNetwork = dstChain;
    console.log(chalk_1.default.cyan(`Cross Chain Swap from ${fromNetwork} to ${toNetwork}`));
    const tokenDecimals = tokens_1.BlockchainToToken[fromNetwork][srcToken].decimals;
    const amountFormatted = ethers_1.ethers.utils.parseUnits(amount, tokenDecimals);
    const amountOutMin = ethers_1.ethers.BigNumber.from(amountFormatted)
        .sub(ethers_1.ethers.BigNumber.from(amountFormatted)
        .div(1000)
        .mul(slippage));
    const providerFeeData = await providers[fromNetwork].getFeeData();
    const signer = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, providers[fromNetwork]);
    const nonceManager = new experimental_1.NonceManager(signer);
    nonceManager.connect(providers[fromNetwork]);
    // Check if we have enough balance for specified amount for swap
    const tokenFromContract = typechain_1.ERC20Abi__factory.connect(tokens_1.BlockchainToToken[fromNetwork][srcToken].address, signer);
    const balance = await tokenFromContract.balanceOf(signer.address);
    console.log(chalk_1.default.cyan('Connected wallet: '), signer.address);
    console.log(chalk_1.default.cyan(`${fromNetwork} ${srcToken} Balance:`), `${ethers_1.ethers.utils.formatUnits(balance, tokenDecimals)}`);
    console.log(chalk_1.default.cyan(`Amount for Swap:`), `${ethers_1.ethers.utils.formatUnits(amountFormatted, tokenDecimals)}`);
    if (balance.lt(amountFormatted)) {
        throw new Error(`Not enough balance of $${srcToken} found on ${fromNetwork}`);
    }
    // Check if we have enough allowance for Router contract
    // Approving spend if needed
    const allowance = await tokenFromContract.allowance(signer.address, providers_1.BlockchainToRouterAddress[fromNetwork]);
    console.log(chalk_1.default.cyan(`Allowance: `), `${ethers_1.ethers.utils.formatUnits(allowance, tokenDecimals)}`);
    if (allowance.lt(amountFormatted)) {
        const approveFunctionData = tokenFromContract.interface.encodeFunctionData("approve", [providers_1.BlockchainToRouterAddress[fromNetwork], amountFormatted]);
        await nonceManager.sendTransaction({
            from: signer.address,
            to: tokenFromContract.address,
            gasPrice: providerFeeData.gasPrice,
            data: approveFunctionData
        });
    }
    // We initialize router on fromNetwork, as we will specify destination network during swap
    const router = typechain_1.StargateRouterAbi__factory.connect(providers_1.BlockchainToRouterAddress[fromNetwork], signer);
    let dstNativeAmount = '0';
    let dstNativeAddr = "0x";
    if (config.refuel.enabled) {
        console.log(chalk_1.default.cyan(`Refuel Enabled, fetching dst chain Native token price`));
        const dstChainNativeTokenId = PriceController_1.default.getNativeTokenIdForChain(toNetwork);
        const currentEthPrice = await PriceController_1.default.getCurrentPrice(dstChainNativeTokenId);
        const amountToPriceRatio = (config.refuel.amountUSD / currentEthPrice).toFixed(3);
        dstNativeAmount = ethers_1.ethers.utils.parseEther(amountToPriceRatio).toString();
        dstNativeAddr = signer.address;
        console.log(chalk_1.default.cyan('DstNativeAmount set to '), `${ethers_1.ethers.utils.formatUnits(dstNativeAmount)}`);
    }
    const lzObject = {
        dstGasForCall: 0,
        dstNativeAmount: dstNativeAmount,
        dstNativeAddr: dstNativeAddr
    };
    const quoteData = await router.quoteLayerZeroFee(providers_1.BlockchainToChainId[toNetwork], 1, signer.address, "0x", lzObject);
    const feeWei = quoteData[0];
    console.log(chalk_1.default.cyan('LayerZero fee: '), ethers_1.ethers.utils.formatUnits(feeWei));
    const swapFunctionData = router.interface.encodeFunctionData("swap", [
        providers_1.BlockchainToChainId[toNetwork],
        tokens_1.BlockchainToToken[fromNetwork][srcToken].poolId,
        tokens_1.BlockchainToToken[toNetwork][dstToken].poolId,
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
    });
    await tx.wait(1);
    console.log(chalk_1.default.cyan(`Source chain TX link:`), `${providers_1.BlockchainToScannerUrl[fromNetwork]}/tx/${tx.hash}`);
    const load = (0, loading_cli_1.default)(chalk_1.default.cyan('Waiting for money to come on destination chain...')).start();
    const waitForDepositOnDestinationChain = setInterval(async () => {
        try {
            const { messages } = await lzClient.getMessagesBySrcTxHash(tx.hash);
            if (messages && messages.length) {
                const currentStatus = messages[0].status;
                if (currentStatus === 'INFLIGHT') {
                    load.text = chalk_1.default.cyan('LayerZero Status changed to Inflight');
                }
                else if (currentStatus === 'DELIVERED') {
                    load.stop();
                    console.log(chalk_1.default.green(`Funds transferred successfully from ${srcChain} to ${dstChain} 🚀`));
                    clearInterval(waitForDepositOnDestinationChain);
                }
                else if (currentStatus === 'FAILED') {
                    load.stop();
                    console.log(chalk_1.default.red(`There was an error during transfer of funds from ${srcChain} to ${dstChain}`));
                    clearInterval(waitForDepositOnDestinationChain);
                }
            }
        }
        catch (e) {
            console.log(chalk_1.default.red(`LZ API Error: `), e.message);
        }
    }, 10000);
}
exports.default = main;
