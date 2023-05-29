// @ts-ignore
import input from "@inquirer/input";
// @ts-ignore
import confirm from "@inquirer/confirm";
// @ts-ignore
import select from "@inquirer/select";
import {StargateBlockchainType} from "../utils/providers";
import {ChainPaths} from "../utils/chainPaths";
import chalk from "chalk";
import {TokenType} from "../utils/tokens";
import {IShuttleConfig} from "../interfaces/IShuttleConfig";

export const SingleCrossChainSwapSetup = async (): Promise<IShuttleConfig | null> => {
    const sourceChain: string = await select({
        message: 'Select Source Chain',
        choices: Object.keys(StargateBlockchainType).map(chain => ({
            name: chain,
            value: StargateBlockchainType[chain as keyof typeof StargateBlockchainType]
        }))
    })

    const sourceToken: string = await select({
        message: 'Select one of the available tokens to send from Source network',
        choices: Object.keys(ChainPaths[sourceChain as string]).map(token => ({
            name: token,
            value: token
        }))
    })

    const selectedPath: string = await select({
        message: 'Select destination path for cross chain swap',
        choices: ChainPaths[sourceChain][sourceToken].map((path: string) => ({
            name: path,
            value: path
        }))
    })

    const amount: string = await input({
        message: `Enter amount of ${sourceToken} to send`
    })

    const slippage: number = await select({
        message: 'Select one of the available slippage options',
        choices: [{name: '0.1%', value: 1}, {name: '0.5%', value: 5}, {name: '1%', value: 10}]
    })

    const isRefuelEnabled = await confirm({
        message: `Do you want to enable the ${chalk.cyan('Refuel Mode')}? 
It will allow you perform transactions on the Destination chain.`
    })

    let refuelAmount = '0';

    if (isRefuelEnabled) {
        refuelAmount = await input({
            message: 'How much USD do you want to send for commissions on Destination chain?'
        });
    }

    const [dstChain, dstToken] = selectedPath.split('-');

    const confirmation = await confirm({
        message: `Final Config 
Source Path: ${chalk.cyan(sourceChain)}-${chalk.cyan(sourceToken)}
Destination Path: ${chalk.cyan(dstChain)}-${chalk.cyan(dstToken)} 
Amount: ${chalk.green(amount)} ${chalk.green(sourceToken)}
Slippage: ${chalk.green(slippage / 10)}%
Refuel Enabled: ${chalk.green(isRefuelEnabled)}
Refuel Amount ${chalk.green(refuelAmount)}
`
    });

    if (confirmation) {
        return {
            mode: 'single-swap',
            options: {
                sourcePath: `${sourceChain}-${sourceToken}`,
                destinationPath: `${dstChain}-${dstToken}`,
                amount: amount,
                slippage: slippage
            },
            refuel: {
                enabled: isRefuelEnabled,
                amountUSD: parseFloat(refuelAmount)
            }
        }
    } else {
        return null;
    }
};
