
![Logo](https://i.ibb.co/r2WK8dS/Cross-Chain-Shuttle-CLI.png)


# 🚀 CrossChainShuttle CLI

The CrossChainShuttle is a command-line interface (CLI) tool developed using TypeScript, designed to enable users to perform cross-chain swaps effortlessly and securely from their terminal. 

By leveraging the LayerZero and Stargate Finance liquidity pools, this tool provides users with access to a wide range of liquidity and token swaps across various blockchain networks.


## 📋 Features

- Cross Chain Swaps in any direction you want
- Ability to save configs for different swaps
- Built on top of LayerZero and Stargate
- User Friendly CLI Interface


## 💾 Installation

Install cross-chain-shuttle with npm

```bash
  npm install cross-chain-shuttle
```

## ✉️ Environmental Variables

To run the script on the behalf of your wallet, you would need to pass in the `PRIVATE_KEY`.
You can either specify `PRIVATE_KEY` under your `.env` file or pass it directly from the terminal.

Here is how you can do it from the terminal:

```PRIVATE_KEY=1hfdf333jhfjdsf2 cross-chain-swap run ./shuttle-configs/path-to-config.json```



## 🛠️ Commands

#### ```init```

![InitScreenshot](https://i.ibb.co/LgxKRmy/2023-05-29-19-48-36.png)

Starts the setup process for a config. After answering questions and confirming final configuration, you will be able to save it for a later use or run immediately (or even do both)!

#### ```run```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `<config>`| `string` | **Required**. Path to the config file |

Launches ```cross-chain-shuttle``` with specified config. You can generate config by running ```init``` command first.


## 🔠 Types

#### config

```
interface IShuttleConfig {
    mode: 'single-swap' | 'circular' | 'n-in-range';
    options: {
        sourcePath: string;
        destinationPath: string;
        amount: string;
        slippage: number;
    };
    refuel: {
        enabled: boolean;
        amountUSD: number;
    }
}
```


## ❓FAQ

#### What chains are supported?

Ethereum, BSC, Fantom, Polygon, Avalanche, Arbitrum, Optimism, Metis.

#### Which tokens can I send with ```cross-chain-shuttle```?

CLI tool supports all of the paths supported by Stargate. You can learn more about available chain paths [here](https://stargateprotocol.gitbook.io/stargate/developers/stargate-chain-paths). 

#### Can I send money for comissions on another chain with this tool?

Yes. There is a ```refuel``` option that allows you to specify how much money you want to send to destination chain for covering comissions.

#### Where configs are stored? And how to use them?

Configs generated by ```init``` command are stored under ```/shuttle-configs``` directory. You can call ```run``` command and pass the path to the config.


## Authors

- [@sir_fedos](https://twitter.com/sir_fedos)


## License

[MIT](https://choosealicense.com/licenses/mit/)

