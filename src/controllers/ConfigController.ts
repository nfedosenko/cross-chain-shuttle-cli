import fsPromises from "fs/promises";
import fs from 'fs';
import {IShuttleConfig} from "../interfaces/IShuttleConfig";
import chalk from "chalk";

export default class ConfigController {
    static async getConfig(path: string): Promise<IShuttleConfig> {
        return JSON.parse(await fsPromises.readFile(path, {encoding: 'utf8'}))
    }

    static async saveConfig(data: IShuttleConfig) {
        try {
            const fileName = `./shuttle-configs/${data.options.sourcePath}->${data.options.destinationPath}(${data.options.amount} ${data.options.sourcePath.split('-')[1]}).json`;

            if (!fs.existsSync('./shuttle-configs')) {
                await fsPromises.mkdir('./shuttle-configs')
            }

            await fsPromises.writeFile(fileName, JSON.stringify(data, null, 2), 'utf-8')

            return true;
        } catch (e: any) {
            console.log(chalk.red(`ConfigController error during config save: `), e.message)
        }
    }
}