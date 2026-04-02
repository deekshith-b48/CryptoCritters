interface TokenData {
    address: string;
    symbol: string;
    name: string;
    balance: string;
    volatility: number;
    liquidity: number;
}
export declare class BSCService {
    private provider;
    private rpcUrl;
    constructor();
    private initProvider;
    scanWallet(walletAddress: string): Promise<TokenData[]>;
    getTokenData(tokenAddress: string): Promise<any>;
    getLiquidity(tokenAddress: string): Promise<number>;
    getPriceChange(tokenAddress: string): Promise<number>;
}
export {};
