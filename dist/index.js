#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
// @ts-ignore
const select_1 = __importStar(require("@inquirer/select"));
const crossChainSwap_1 = __importDefault(require("./src/scripts/crossChainSwap"));
const singleCrossChainSwapSetup_1 = require("./src/setups/singleCrossChainSwapSetup");
const ConfigController_1 = __importDefault(require("./src/controllers/ConfigController"));
const providers_1 = require("./src/utils/providers");
dotenv_1.default.config();
const log = console.log;
const providers = (0, providers_1.initAll)();
log(chalk_1.default.cyan(figlet_1.default.textSync("Cross Chain Shuttle", {
    font: "Big Money-ne",
    horizontalLayout: "default",
    verticalLayout: "default"
})));
var SelectMode;
(function (SelectMode) {
    SelectMode["SingleCrossChainSwap"] = "single-cross-chain-swap";
    SelectMode["Circular"] = "circular";
    SelectMode["FixedRanges"] = "fixed-ranges";
})(SelectMode || (SelectMode = {}));
const init = async () => {
    const selectedMode = await (0, select_1.default)({
        message: 'Select desired mode',
        choices: [
            {
                name: 'Single Cross Chain Swap',
                value: SelectMode.SingleCrossChainSwap,
                description: 'Select Source/Destination chains and Token to send.',
            },
            {
                name: 'Circular',
                value: SelectMode.Circular,
                description: "Select Source Chain and Token, number of cross chain swaps. " +
                    "Money will cycle from network to network N times and got back to Source chain",
                disabled: true
            },
            {
                name: 'N swaps between chains',
                value: SelectMode.FixedRanges,
                description: 'Select Source/Destination chains and N number of cross-chain swaps in between',
                disabled: true,
            },
            new select_1.Separator(),
        ],
    });
    let finalAction, finalRun = () => {
    }, finalSave = () => {
    };
    switch (selectedMode) {
        case SelectMode.SingleCrossChainSwap:
            try {
                const shuttleConfig = await (0, singleCrossChainSwapSetup_1.SingleCrossChainSwapSetup)();
                if (shuttleConfig) {
                    finalAction = await (0, select_1.default)({
                        message: 'Select final action for this config',
                        choices: [{
                                name: 'Save&Run',
                                value: 'save-and-run'
                            }, {
                                name: 'Save Only',
                                value: 'save-only'
                            }, {
                                name: 'Run Only',
                                value: 'run-only'
                            }]
                    });
                    finalRun = async () => await (0, crossChainSwap_1.default)(shuttleConfig, providers);
                    finalSave = async () => await ConfigController_1.default.saveConfig(shuttleConfig);
                }
            }
            catch (e) {
                console.log(chalk_1.default.red('Error during cross chain swap: '), e);
            }
            break;
    }
    if (finalAction === 'save-and-run') {
        await Promise.all([
            finalSave(),
            finalRun()
        ]);
    }
    else if (finalAction === 'save-only') {
        await finalSave();
    }
    else if (finalAction === 'run-only') {
        await finalRun();
    }
};
const run = async (options) => {
    try {
        const configJson = await ConfigController_1.default.getConfig(options.configPath);
        switch (configJson.mode) {
            case 'single-swap':
                try {
                    await (0, crossChainSwap_1.default)(configJson, providers);
                }
                catch (e) {
                    console.log(chalk_1.default.red('Error during cross chain swap: '), e.reason || e.message);
                }
                break;
        }
    }
    catch (e) {
        console.log(chalk_1.default.red('Error during config read. Make sure path is correct and file exists'));
    }
};
commander_1.program
    .name('cross-chain-shuttle')
    .version('1.0.0')
    .description(`Cross Chain Shuttle - is a CLI tool developed using TypeScript, designed to enable users to perform cross-chain swaps effortlessly and securely from their terminal!`);
commander_1.program
    .command('init')
    .description(`Setup script through interactive CLI experience and run it or save`)
    .action((options) => {
    init().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
});
commander_1.program
    .command('run')
    .description(`Starts script with specified config`)
    .argument('<config>')
    .action((configPath) => {
    run({ configPath: configPath }).catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
});
commander_1.program.parse();
