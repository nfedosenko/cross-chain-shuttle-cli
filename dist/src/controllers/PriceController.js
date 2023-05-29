"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coingecko_api_1 = __importDefault(require("coingecko-api"));
const chalk_1 = __importDefault(require("chalk"));
const providers_1 = require("../utils/providers");
const CoinGeckoClient = new coingecko_api_1.default();
class PriceController {
    static getNativeTokenIdForChain(chain) {
        switch (chain) {
            case providers_1.StargateBlockchainType.Ethereum:
            case providers_1.StargateBlockchainType.Optimism:
            case providers_1.StargateBlockchainType.Arbitrum:
                return 'ethereum';
            case providers_1.StargateBlockchainType.BnbChain:
                return 'oec-binance-coin';
            case providers_1.StargateBlockchainType.Avalanche:
                return 'avalanche-2';
            case providers_1.StargateBlockchainType.Fantom:
                return 'fantom';
            case providers_1.StargateBlockchainType.Polygon:
                return 'matic-network';
            case providers_1.StargateBlockchainType.Metis:
                return 'metis';
        }
    }
    static async getCurrentPrice(tokenId) {
        return await CoinGeckoClient.simple
            .price({ ids: [tokenId], vs_currencies: ['USD'] })
            .then(res => {
            return res.data?.[tokenId].usd;
        })
            .catch((e) => {
            console.log(chalk_1.default.red('PriceController Error [getCurrentEthPrice]'), e.message);
        });
    }
}
exports.default = PriceController;
