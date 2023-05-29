"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
class ConfigController {
    static async getConfig(path) {
        return JSON.parse(await promises_1.default.readFile(path, { encoding: 'utf8' }));
    }
    static async saveConfig(data) {
        try {
            const fileName = `./shuttle-configs/${data.options.sourcePath}->${data.options.destinationPath}(${data.options.amount} ${data.options.sourcePath.split('-')[1]}).json`;
            if (!fs_1.default.existsSync('./shuttle-configs')) {
                await promises_1.default.mkdir('./shuttle-configs');
            }
            await promises_1.default.writeFile(fileName, JSON.stringify(data, null, 2), 'utf-8');
            return true;
        }
        catch (e) {
            console.log(chalk_1.default.red(`ConfigController error during config save: `), e.message);
        }
    }
}
exports.default = ConfigController;
