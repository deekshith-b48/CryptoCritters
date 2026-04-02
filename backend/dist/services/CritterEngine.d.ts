export interface CritterStats {
    health: number;
    happiness: number;
    energy: number;
}
export interface Critter {
    id: string;
    walletAddress: string;
    tokenAddress: string;
    tokenSymbol: string;
    tokenName: string;
    name: string;
    species: string;
    personality: string;
    bio: string;
    avatarUrl: string;
    stats: CritterStats;
    state: 'alive' | 'evolved' | 'fainted';
    xp: number;
    holdTime: number;
    createdAt: number;
    lastInteraction: number;
    dailyMessage?: string;
}
export declare class CritterEngine {
    private critters;
    private generator;
    private bscService;
    constructor();
    generateCritter(tokenData: any, walletAddress: string): Promise<Critter>;
    calculateStats(tokenData: any): CritterStats;
    interact(critterId: string, action: string, walletAddress: string): Promise<Critter>;
    getCritter(id: string): Critter | undefined;
    getCollection(walletAddress: string): Critter[];
    generateDailyMessage(critter: Critter): string;
    updateStatsFromMarket(critterId: string, marketData: any): Critter;
    addDemoCritters(walletAddress: string): Critter[];
}
