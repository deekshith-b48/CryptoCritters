export interface AIGeneratedData {
    name: string;
    species: string;
    personality: string;
    bio: string;
    avatarUrl: string;
}
export declare class CritterGenerator {
    private hfApiKey;
    constructor();
    generate(tokenData: any): Promise<AIGeneratedData>;
    categorizeToken(tokenData: any): string;
    getRandomSprite(category: string): {
        species: string;
        personality: string;
    };
    generateName(symbol: string): string;
    generateBio(species: string, personality: string, tokenName: string): string;
    generateAvatar(species: string, personality: string): Promise<string>;
    getFallbackAvatar(category: string): string;
}
