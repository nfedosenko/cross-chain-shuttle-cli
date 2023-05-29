export interface IShuttleConfig {
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