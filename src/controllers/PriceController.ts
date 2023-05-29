import CoinGecko from 'coingecko-api';
import chalk from "chalk";
import {StargateBlockchainType} from "../utils/providers";

const CoinGeckoClient = new CoinGecko();

export default class PriceController {

    static getNativeTokenIdForChain(chain: StargateBlockchainType) {
        switch (chain) {
            case StargateBlockchainType.Ethereum:
            case StargateBlockchainType.Optimism:
            case StargateBlockchainType.Arbitrum:
                return 'ethereum';
            case StargateBlockchainType.BnbChain:
                return 'oec-binance-coin';
            case StargateBlockchainType.Avalanche:
                return 'avalanche-2';
            case StargateBlockchainType.Fantom:
                return 'fantom';
            case StargateBlockchainType.Polygon:
                return 'matic-network';
            case StargateBlockchainType.Metis:
                return 'metis'
        }
    }

    static async getCurrentPrice(tokenId: string): Promise<number> {
        return await CoinGeckoClient.simple
            .price({ids: [tokenId], vs_currencies: ['USD']})
            .then(res => {
                return res.data?.[tokenId].usd;
            })
            .catch((e: any) => {
                console.log(chalk.red('PriceController Error [getCurrentEthPrice]'), e.message);
            })
    }
}