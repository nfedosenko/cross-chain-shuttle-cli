import {StargateBlockchainType} from "./providers";

export enum TokenType {
    USDC = 'USDC',
    USDT = 'USDT',
    BUSD = 'BUSD',
    DAI = 'DAI',
    FRAX = 'FRAX',
    USDD = 'USDD',
    SGETH = 'SGETH',
    SUSD = 'SUSD',
    LUSD = 'LUSD',
    MAI = 'MAI',
    METIS = 'METIS',
    mUSDT = 'm.USDT'
}

export const BlockchainToToken: any = {
    [StargateBlockchainType.Fantom]: {
        [TokenType.USDC]: {
            address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
            poolId: 1,
            decimals: 6
        }
    },
    [StargateBlockchainType.Metis]: {
        [TokenType.METIS]: {
            address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
            poolId: 17,
            decimals: 18
        },
        [TokenType.mUSDT]: {
            address: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
            poolId: 19,
            decimals: 6
        }
    },
    [StargateBlockchainType.Polygon]: {
        [TokenType.USDC]: {
            address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
            poolId: 1,
            decimals: 6
        },
        [TokenType.USDT]: {
            address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
            poolId: 2,
            decimals: 6
        },
        [TokenType.DAI]: {
            address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            poolId: 3,
            decimals: 18
        },
        [TokenType.MAI]: {
            address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
            poolId: 16,
            decimals: 18
        }
    },
    [StargateBlockchainType.Avalanche]: {
        [TokenType.USDC]: {
            address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
            poolId: 1,
            decimals: 6
        },
        [TokenType.USDT]: {
            address: '0xc7198437980c041c805a1edcba50c1ce5db95118',
            poolId: 2,
            decimals: 6
        },
        [TokenType.FRAX]: {
            address: '0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64',
            poolId: 7,
            decimals: 18
        },
        [TokenType.MAI]: {
            address: '0x3B55E45fD6bd7d4724F5c47E0d1bCaEdd059263e',
            poolId: 16,
            decimals: 18
        }
    },
    [StargateBlockchainType.BnbChain]: {
        [TokenType.USDT]: {
            address: '0x55d398326f99059ff775485246999027b3197955',
            poolId: 2,
            decimals: 18
        },
        [TokenType.BUSD]: {
            address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
            poolId: 5,
            decimals: 18
        },
        [TokenType.USDD]: {
            address: '0xd17479997f34dd9156deef8f95a52d81d265be9c',
            poolId: 11,
            decimals: 18
        },
        [TokenType.MAI]: {
            address: '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d',
            poolId: 16,
            decimals: 18
        },
        [TokenType.METIS]: {
            address: '0xe552Fb52a4F19e44ef5A967632DBc320B0820639',
            poolId: 17,
            decimals: 18
        },
    },
    [StargateBlockchainType.Ethereum]: {
        [TokenType.USDC]: {
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            poolId: 1,
            decimals: 6
        },
        [TokenType.USDT]: {
            address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            poolId: 2,
            decimals: 6
        },
        [TokenType.DAI]: {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            poolId: 3,
            decimals: 18
        },
        [TokenType.SGETH]: {
            address: '0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c',
            poolId: 0,
            decimals: 18
        },
        [TokenType.FRAX]: {
            address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
            poolId: 7,
            decimals: 18
        },
        [TokenType.USDD]: {
            address: '0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6',
            poolId: 11,
            decimals: 18
        },
        [TokenType.SUSD]: {
            address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
            poolId: 14,
            decimals: 18
        },
        [TokenType.LUSD]: {
            address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
            poolId: 15,
            decimals: 18
        },
        [TokenType.METIS]: {
            address: '0x9e32b13ce7f2e80a01932b42553652e053d6ed8e',
            poolId: 17,
            decimals: 18
        }
    },
    [StargateBlockchainType.Arbitrum]: {
        [TokenType.USDC]: {
            address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
            poolId: 1,
            decimals: 6
        },
        [TokenType.USDT]: {
            address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
            poolId: 2,
            decimals: 6
        },
        [TokenType.FRAX]: {
            address: '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
            poolId: 7,
            decimals: 18
        },
        [TokenType.LUSD]: {
            address: '0x93b346b6bc2548da6a1e7d98e9a421b42541425b',
            poolId: 15,
            decimals: 18
        },
        [TokenType.MAI]: {
            address: '0x3f56e0c36d275367b8c502090edf38289b3dea0d',
            poolId: 16,
            decimals: 18
        },
    },
    [StargateBlockchainType.Optimism]: {
        [TokenType.USDC]: {
            address: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
            poolId: 1,
            decimals: 6
        },
        [TokenType.DAI]: {
            address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
            poolId: 3,
            decimals: 18
        },
        [TokenType.FRAX]: {
            address: '0x2e3d870790dc77a83dd1d18184acc7439a53f475',
            poolId: 7,
            decimals: 18
        },
        [TokenType.SUSD]: {
            address: '0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9',
            poolId: 14,
            decimals: 18
        },
        [TokenType.LUSD]: {
            address: '0xc40f949f8a4e094d1b49a23ea9241d289b7b2819',
            poolId: 15,
            decimals: 18
        },
        [TokenType.MAI]: {
            address: '0xdfa46478f9e5ea86d57387849598dbfb2e964b02',
            poolId: 16,
            decimals: 18
        },
    }
};
