export interface MockCritter {
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
    stats: {
        health: number;
        happiness: number;
        energy: number;
    };
    state: 'alive' | 'evolved' | 'fainted';
    xp: number;
    holdTime: number;
    createdAt: number;
    lastInteraction: number;
}
export declare const mockCritters: MockCritter[];
