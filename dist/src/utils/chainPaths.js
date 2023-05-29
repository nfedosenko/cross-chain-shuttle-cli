"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainPaths = void 0;
const providers_1 = require("./providers");
const tokens_1 = require("./tokens");
exports.ChainPaths = {
    [providers_1.StargateBlockchainType.Ethereum]: {
        [tokens_1.TokenType.USDC]: ['ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.USDT]: ['ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.DAI]: ['POLYGON-DAI', 'OPTIMISM-DAI'],
        [tokens_1.TokenType.FRAX]: ['AVALANCHE-FRAX', 'ARBITRUM-FRAX', 'OPTIMISM-FRAX'],
        [tokens_1.TokenType.USDD]: ['BSC-USDD'],
        [tokens_1.TokenType.SGETH]: ['ARBITRUM-SGETH', 'OPTIMISM-SGETH'],
        [tokens_1.TokenType.SUSD]: ['OPTIMISM-SUSD'],
        [tokens_1.TokenType.LUSD]: ['ARBITRUM-LUSD', 'OPTIMISM-LUSD'],
        [tokens_1.TokenType.MAI]: ['BSC-MAI', 'AVALANCHE-MAI', 'POLYGON-MAI', 'ARBITRUM-MAI', 'OPTIMISM-MAI'],
        [tokens_1.TokenType.METIS]: ['BSC-METIS', 'METIS-METIS'],
        [tokens_1.TokenType.mUSDT]: ['METIS-m.USDT'],
    },
    [providers_1.StargateBlockchainType.BnbChain]: {
        [tokens_1.TokenType.BUSD]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.USDT]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.USDD]: ['ETHEREUM-USDD'],
        [tokens_1.TokenType.MAI]: ['ETHEREUM-MAI', 'AVALANCHE-MAI', 'POLYGON-MAI', 'ARBITRUM-MAI', 'OPTIMISM-MAI'],
        [tokens_1.TokenType.METIS]: ['ETHEREUM-METIS', 'METIS-METIS'],
        [tokens_1.TokenType.mUSDT]: ['METIS-m.USDT'],
    },
    [providers_1.StargateBlockchainType.Avalanche]: {
        [tokens_1.TokenType.USDC]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.USDT]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.FRAX]: ['ETHEREUM-FRAX', 'ARBITRUM-FRAX', 'OPTIMISM-FRAX'],
        [tokens_1.TokenType.MAI]: ['ETHEREUM-MAI', 'BSC-MAI', 'POLYGON-MAI', 'ARBITRUM-MAI', 'OPTIMISM-MAI'],
        [tokens_1.TokenType.mUSDT]: ['METIS-m.USDT']
    },
    [providers_1.StargateBlockchainType.Polygon]: {
        [tokens_1.TokenType.USDC]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.USDT]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.DAI]: ['ETHEREUM-DAI', 'OPTIMISM-DAI'],
        [tokens_1.TokenType.MAI]: ['OPTIMISM-MAI', 'ARBITRUM-MAI', 'AVALANCHE-MAI', 'BSC-MAI', 'ETHEREUM-MAI'],
    },
    [providers_1.StargateBlockchainType.Arbitrum]: {
        [tokens_1.TokenType.USDC]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.USDT]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'OPTIMISM-USDC', 'FANTOM-USDC'],
        [tokens_1.TokenType.FRAX]: ['ETHEREUM-FRAX', 'AVALANCHE-FRAX', 'OPTIMISM-FRAX'],
        [tokens_1.TokenType.SGETH]: ['ETHEREUM-SGETH', 'OPTIMISM-SGETH'],
        [tokens_1.TokenType.LUSD]: ['ETHEREUM-LUSD', 'OPTIMISM-LUSD'],
        [tokens_1.TokenType.MAI]: ['OPTIMISM-MAI', 'POLYGON-MAI', 'AVALANCHE-MAI', 'BSC-MAI', 'ETHEREUM-MAI'],
    },
    [providers_1.StargateBlockchainType.Optimism]: {
        [tokens_1.TokenType.USDC]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'FANTOM-USDC'],
        [tokens_1.TokenType.DAI]: ['ETHEREUM-DAI', 'POLYGON-DAI'],
        [tokens_1.TokenType.FRAX]: ['ETHEREUM-FRAX', 'AVALANCHE-FRAX', 'ARBITRUM-FRAX'],
        [tokens_1.TokenType.SGETH]: ['ETHEREUM-SGETH', 'ARBITRUM-SGETH'],
        [tokens_1.TokenType.SUSD]: ['ETHEREUM-SUSD'],
        [tokens_1.TokenType.LUSD]: ['ETHEREUM-LUSD', 'ARBITRUM-LUSD'],
        [tokens_1.TokenType.MAI]: ['ARBITRUM-MAI', 'POLYGON-MAI', 'AVALANCHE-MAI', 'BSC-MAI', 'ETHEREUM-MAI'],
    },
    [providers_1.StargateBlockchainType.Fantom]: {
        [tokens_1.TokenType.USDC]: ['ETHEREUM-USDC', 'ETHEREUM-USDT', 'BSC-BUSD', 'BSC-USDT', 'AVALANCHE-USDC', 'AVALANCHE-USDT', 'POLYGON-USDC', 'POLYGON-USDT', 'ARBITRUM-USDC', 'ARBITRUM-USDT', 'OPTIMISM-USDC'],
    },
    [providers_1.StargateBlockchainType.Metis]: {
        [tokens_1.TokenType.METIS]: ['ETHEREUM-METIS', 'BSC-METIS'],
        [tokens_1.TokenType.mUSDT]: ['ETHEREUM-m.USDT', 'BSC-m.USDT', 'AVALANCHE-m.USDT'],
    },
};
