#! /usr/bin/env node
import fs from 'fs/promises'
import dotenv from 'dotenv'
import {program} from 'commander'
import chalk from "chalk";
import figlet from "figlet";
// @ts-ignore
import select, {Separator} from '@inquirer/select';
// @ts-ignore
import confirm from '@inquirer/confirm';
// @ts-ignore
import input from '@inquirer/input';
import crossChainSwap from "./src/scripts/crossChainSwap";
import {SingleCrossChainSwapSetup} from "./src/setups/singleCrossChainSwapSetup";
import {IShuttleConfig} from "./src/interfaces/IShuttleConfig";
import ConfigController from "./src/controllers/ConfigController";
import {initAll} from "./src/utils/providers";
import GasEstimator from "./src/controllers/GasEstimator";

dotenv.config();

const log = console.log;
const providers = initAll();

log(
    chalk.cyan(
        figlet.textSync("Cross Chain Shuttle", {
            font: "Big Money-ne",
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    )
);

enum SelectMode {
    SingleCrossChainSwap = 'single-cross-chain-swap',
    Circular = 'circular',
    FixedRanges = 'fixed-ranges'

}

const init = async () => {
    const selectedMode = await select({
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
            new Separator(),
        ],
    });

    let finalAction,
        finalRun = () => {
        },
        finalSave = () => {
        };

    switch (selectedMode) {
        case SelectMode.SingleCrossChainSwap:
            try {
                const shuttleConfig = await SingleCrossChainSwapSetup();

                if (shuttleConfig) {
                    finalAction = await select({
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

                    finalRun = async () => await crossChainSwap(shuttleConfig, providers);
                    finalSave = async () => await ConfigController.saveConfig(shuttleConfig)
                }
            } catch (e: any) {
                console.log(chalk.red('Error during cross chain swap: '), e)
            }
            break;
    }

    if (finalAction === 'save-and-run') {
        await Promise.all([
            finalSave(),
            finalRun()
        ]);
    } else if (finalAction === 'save-only') {
        await finalSave();
    } else if (finalAction === 'run-only') {
        await finalRun();
    }
};

const run = async (options: { configPath: string }) => {
    try {
        const configJson = await ConfigController.getConfig(options.configPath)

        switch (configJson.mode) {
            case 'single-swap':
                try {
                    await crossChainSwap(configJson, providers)
                } catch (e: any) {
                    console.log(chalk.red('Error during cross chain swap: '), e.reason || e.message)
                }
                break;
        }
    } catch (e: any) {
        console.log(chalk.red('Error during config read. Make sure path is correct and file exists'))
    }
}

program
    .name('cross-chain-shuttle')
    .version('1.0.0')
    .description(`Cross Chain Shuttle - is a CLI tool developed using TypeScript, designed to enable users to perform cross-chain swaps effortlessly and securely from their terminal!`);

program
    .command('init')
    .description(`Setup script through interactive CLI experience and run it or save`)
    .action((options) => {
        init().catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });
    })

program
    .command('run')
    .description(`Starts script with specified config`)
    .argument('<config>')
    .action((configPath) => {
        run({configPath: configPath}).catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });
    })

program.parse();

