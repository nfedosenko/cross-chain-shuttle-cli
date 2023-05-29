"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleCrossChainSwapSetup = void 0;
// @ts-ignore
const input_1 = __importDefault(require("@inquirer/input"));
// @ts-ignore
const confirm_1 = __importDefault(require("@inquirer/confirm"));
// @ts-ignore
const select_1 = __importDefault(require("@inquirer/select"));
const providers_1 = require("../utils/providers");
const chainPaths_1 = require("../utils/chainPaths");
const chalk_1 = __importDefault(require("chalk"));
const SingleCrossChainSwapSetup = async () => {
    const sourceChain = await (0, select_1.default)({
        message: 'Select Source Chain',
        choices: Object.keys(providers_1.StargateBlockchainType).map(chain => ({
            name: chain,
            value: providers_1.StargateBlockchainType[chain]
        }))
    });
    const sourceToken = await (0, select_1.default)({
        message: 'Select one of the available tokens to send from Source network',
        choices: Object.keys(chainPaths_1.ChainPaths[sourceChain]).map(token => ({
            name: token,
            value: token
        }))
    });
    const selectedPath = await (0, select_1.default)({
        message: 'Select destination path for cross chain swap',
        choices: chainPaths_1.ChainPaths[sourceChain][sourceToken].map((path) => ({
            name: path,
            value: path
        }))
    });
    const amount = await (0, input_1.default)({
        message: `Enter amount of ${sourceToken} to send`
    });
    const slippage = await (0, select_1.default)({
        message: 'Select one of the available slippage options',
        choices: [{ name: '0.1%', value: 1 }, { name: '0.5%', value: 5 }, { name: '1%', value: 10 }]
    });
    const isRefuelEnabled = await (0, confirm_1.default)({
        message: `Do you want to enable the ${chalk_1.default.cyan('Refuel Mode')}? 
It will allow you perform transactions on the Destination chain.`
    });
    let refuelAmount = '0';
    if (isRefuelEnabled) {
        refuelAmount = await (0, input_1.default)({
            message: 'How much USD do you want to send for commissions on Destination chain?'
        });
    }
    const [dstChain, dstToken] = selectedPath.split('-');
    const confirmation = await (0, confirm_1.default)({
        message: `Final Config 
Source Path: ${chalk_1.default.cyan(sourceChain)}-${chalk_1.default.cyan(sourceToken)}
Destination Path: ${chalk_1.default.cyan(dstChain)}-${chalk_1.default.cyan(dstToken)} 
Amount: ${chalk_1.default.green(amount)} ${chalk_1.default.green(sourceToken)}
Slippage: ${chalk_1.default.green(slippage / 10)}%
Refuel Enabled: ${chalk_1.default.green(isRefuelEnabled)}
Refuel Amount ${chalk_1.default.green(refuelAmount)}
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
        };
    }
    else {
        return null;
    }
};
exports.SingleCrossChainSwapSetup = SingleCrossChainSwapSetup;
