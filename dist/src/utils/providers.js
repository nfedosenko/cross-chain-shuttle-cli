"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAll = exports.initProvider = exports.BlockchainToScannerUrl = exports.BlockchainToRpcProvider = exports.BlockchainToRouterAddress = exports.BlockchainToChainId = exports.StargateBlockchainType = void 0;
const ethers_1 = require("ethers");
var StargateBlockchainType;
(function (StargateBlockchainType) {
    StargateBlockchainType["Ethereum"] = "ETHEREUM";
    StargateBlockchainType["BnbChain"] = "BSC";
    StargateBlockchainType["Avalanche"] = "AVALANCHE";
    StargateBlockchainType["Polygon"] = "POLYGON";
    StargateBlockchainType["Arbitrum"] = "ARBITRUM";
    StargateBlockchainType["Optimism"] = "OPTIMISM";
    StargateBlockchainType["Fantom"] = "FANTOM";
    StargateBlockchainType["Metis"] = "METIS";
})(StargateBlockchainType = exports.StargateBlockchainType || (exports.StargateBlockchainType = {}));
/**
 * ChainId values needed for Cross-chain swap on Stargate
 */
exports.BlockchainToChainId = {
    [StargateBlockchainType.Ethereum]: 101,
    [StargateBlockchainType.BnbChain]: 102,
    [StargateBlockchainType.Avalanche]: 106,
    [StargateBlockchainType.Polygon]: 109,
    [StargateBlockchainType.Arbitrum]: 110,
    [StargateBlockchainType.Optimism]: 111,
    [StargateBlockchainType.Fantom]: 112,
    [StargateBlockchainType.Metis]: 151,
};
/**
 * Router addresses
 */
exports.BlockchainToRouterAddress = {
    [StargateBlockchainType.Ethereum]: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
    [StargateBlockchainType.BnbChain]: '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8',
    [StargateBlockchainType.Avalanche]: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
    [StargateBlockchainType.Polygon]: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
    [StargateBlockchainType.Arbitrum]: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
    [StargateBlockchainType.Optimism]: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
    [StargateBlockchainType.Fantom]: '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6',
    [StargateBlockchainType.Metis]: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
};
/**
 * URLs for RPC providers for every network
 */
exports.BlockchainToRpcProvider = {
    [StargateBlockchainType.Ethereum]: 'https://eth.llamarpc.com',
    [StargateBlockchainType.BnbChain]: 'https://bsc.publicnode.com',
    [StargateBlockchainType.Avalanche]: 'https://avalanche.public-rpc.com',
    [StargateBlockchainType.Polygon]: 'https://polygon-rpc.com/',
    [StargateBlockchainType.Arbitrum]: 'https://arbitrum-one.public.blastapi.io',
    [StargateBlockchainType.Optimism]: 'https://mainnet.optimism.io',
    [StargateBlockchainType.Fantom]: 'https://rpc.ftm.tools',
    [StargateBlockchainType.Metis]: 'https://andromeda.metis.io/?owner=1088'
};
exports.BlockchainToScannerUrl = {
    [StargateBlockchainType.Ethereum]: 'https://etherscan.io',
    [StargateBlockchainType.BnbChain]: 'https://bscscan.com',
    [StargateBlockchainType.Avalanche]: 'https://avascan.info/blockchain/c',
    [StargateBlockchainType.Polygon]: 'https://polygonscan.com',
    [StargateBlockchainType.Arbitrum]: 'https://arbiscan.io',
    [StargateBlockchainType.Optimism]: 'https://optimistic.etherscan.io',
    [StargateBlockchainType.Fantom]: 'https://ftmscan.com',
    [StargateBlockchainType.Metis]: 'https://andromeda-explorer.metis.io/'
};
function initProvider(blockchain) {
    return new ethers_1.ethers.providers.JsonRpcProvider(exports.BlockchainToRpcProvider[blockchain]);
}
exports.initProvider = initProvider;
function initAll() {
    const keys = Object.keys(StargateBlockchainType).filter((v) => isNaN(Number(v)));
    let result = {};
    keys.forEach((blockchain, index) => {
        try {
            const enumValue = StargateBlockchainType[blockchain];
            result[enumValue] = initProvider(enumValue);
        }
        catch (e) {
            console.log(`Error initialising provider ${blockchain}`);
            console.log(e);
        }
    });
    return result;
}
exports.initAll = initAll;
