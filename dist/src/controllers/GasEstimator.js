"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const providers_1 = require("../utils/providers");
const ethers_1 = require("ethers");
class GasEstimator {
    static blockchainTypeToCovalentMapping(type) {
        switch (type) {
            case providers_1.StargateBlockchainType.BnbChain:
                return 'bnb-mainnet';
            case providers_1.StargateBlockchainType.Ethereum:
                return 'eth-mainnet';
            case providers_1.StargateBlockchainType.Fantom:
                return 'fantom-mainnet';
            case providers_1.StargateBlockchainType.Polygon:
                return 'matic-mainnet';
            case providers_1.StargateBlockchainType.Avalanche:
                return 'avalanche-mainnet';
            case providers_1.StargateBlockchainType.Arbitrum:
                return 'arbitrum-mainnet';
            case providers_1.StargateBlockchainType.Optimism:
                return 'optimism-mainnet';
        }
    }
    static async estimateAverageGas(dstChain) {
        const chainMapped = GasEstimator.blockchainTypeToCovalentMapping(dstChain);
        const latestBlockTransactions = await fetch(`https://api.covalenthq.com/v1/${chainMapped}/block/latest/transactions_v3/?key=${process.env.COVALENT_API_KEY}`).then(res => res.json());
        const averageFeesPaid = latestBlockTransactions.data
            .items
            .map((item) => ethers_1.ethers.BigNumber.from(item.fees_paid))
            .reduce((a, b) => ethers_1.ethers.BigNumber.from(a).add(ethers_1.ethers.BigNumber.from(b)), 0)
            .div(latestBlockTransactions.data.items.length);
        return averageFeesPaid.mul(3);
    }
    static async getAllDstNativeAmount() {
    }
}
exports.default = GasEstimator;
