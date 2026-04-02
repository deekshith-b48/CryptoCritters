"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CritterEngine = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const CritterGenerator_js_1 = require("./CritterGenerator.js");
const BSCService_js_1 = require("./BSCService.js");
const cache = new node_cache_1.default({ stdTTL: 300 });
class CritterEngine {
    critters = new Map();
    generator;
    bscService;
    constructor() {
        this.generator = new CritterGenerator_js_1.CritterGenerator();
        this.bscService = new BSCService_js_1.BSCService();
    }
    async generateCritter(tokenData, walletAddress) {
        const aiData = await this.generator.generate(tokenData);
        const stats = this.calculateStats(tokenData);
        const critter = {
            id: `critter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            walletAddress: walletAddress.toLowerCase(),
            tokenAddress: tokenData.address,
            tokenSymbol: tokenData.symbol,
            tokenName: tokenData.name,
            name: aiData.name,
            species: aiData.species,
            personality: aiData.personality,
            bio: aiData.bio,
            avatarUrl: aiData.avatarUrl,
            stats,
            state: 'alive',
            xp: 0,
            holdTime: 0,
            createdAt: Date.now(),
            lastInteraction: Date.now()
        };
        this.critters.set(critter.id, critter);
        cache.set(critter.id, critter);
        return critter;
    }
    calculateStats(tokenData) {
        const volatility = tokenData.volatility || 0.5;
        const liquidity = tokenData.liquidity || 50000;
        const health = Math.max(0, Math.min(100, Math.round((1 - volatility) * 100)));
        const happiness = Math.max(0, Math.min(100, 50 + Math.random() * 50));
        const energy = Math.max(0, Math.min(100, Math.min(100, Math.round((liquidity / 100000) * 100))));
        return { health, happiness, energy };
    }
    async interact(critterId, action, walletAddress) {
        const critter = this.critters.get(critterId);
        if (!critter) {
            throw new Error('Critter not found');
        }
        switch (action) {
            case 'feed':
                critter.stats.happiness = Math.min(100, critter.stats.happiness + 10);
                critter.stats.health = Math.min(100, critter.stats.health + 5);
                critter.xp += 5;
                break;
            case 'play':
                critter.stats.energy = Math.min(100, critter.stats.energy + 15);
                critter.stats.happiness = Math.min(100, critter.stats.happiness + 5);
                critter.xp += 10;
                break;
            case 'clean':
                critter.stats.health = Math.min(100, critter.stats.health + 10);
                critter.xp += 15;
                break;
            case 'train':
                critter.xp += 25;
                break;
        }
        critter.lastInteraction = Date.now();
        this.critters.set(critterId, critter);
        cache.set(critterId, critter);
        return critter;
    }
    getCritter(id) {
        const cached = cache.get(id);
        if (cached)
            return cached;
        return this.critters.get(id);
    }
    getCollection(walletAddress) {
        const userCritters = [];
        this.critters.forEach(critter => {
            if (critter.walletAddress === walletAddress.toLowerCase()) {
                userCritters.push(critter);
            }
        });
        return userCritters;
    }
    generateDailyMessage(critter) {
        const messages = {
            healthy: [
                `${critter.name} is feeling great! The market looks good today. 🌟`,
                `${critter.name} did some yoga and feels refreshed! 🧘`,
                `${critter.name} baked you some rewards! 🎂`
            ],
            warning: [
                `${critter.name} seems worried about the market... 📉`,
                `${critter.name} suggests you do some research! 🔍`,
                `${critter.name} feels a bit unstable today. ⚠️`
            ],
            fainted: [
                `${critter.name} has fainted. Remember: Always check LP locks! 💀`,
                `${critter.name} needs rest. Lesson: DYOR before investing! 📚`
            ]
        };
        if (critter.state === 'fainted') {
            return messages.fainted[Math.floor(Math.random() * messages.fainted.length)];
        }
        if (critter.stats.health > 70) {
            return messages.healthy[Math.floor(Math.random() * messages.healthy.length)];
        }
        return messages.warning[Math.floor(Math.random() * messages.warning.length)];
    }
    updateStatsFromMarket(critterId, marketData) {
        const critter = this.critters.get(critterId);
        if (!critter)
            throw new Error('Critter not found');
        if (marketData.liquidity === 0) {
            critter.state = 'fainted';
        }
        critter.stats.health = Math.max(0, Math.min(100, critter.stats.health + (marketData.priceChange || 0)));
        this.critters.set(critterId, critter);
        return critter;
    }
    addDemoCritters(walletAddress) {
        const demoTokens = [
            { symbol: 'CAKE', name: 'PancakeSwap', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', volatility: 0.15, liquidity: 150000 },
            { symbol: 'PEPE', name: 'Pepe', address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933', volatility: 0.85, liquidity: 30000 },
            { symbol: 'RUG', name: 'RugPull', address: '0x000000000000000000000000000000000000dEaD', volatility: 1, liquidity: 0 }
        ];
        const critters = [];
        demoTokens.forEach(async (token, index) => {
            const critter = await this.generateCritter(token, walletAddress);
            if (token.symbol === 'RUG') {
                critter.state = 'fainted';
                critter.stats.health = 0;
                critter.stats.happiness = 0;
            }
            critters.push(critter);
        });
        return critters;
    }
}
exports.CritterEngine = CritterEngine;
