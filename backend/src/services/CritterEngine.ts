import NodeCache from 'node-cache';
import { CritterGenerator } from './CritterGenerator.js';
import { BSCService } from './BSCService.js';

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

const cache = new NodeCache({ stdTTL: 300 });

export class CritterEngine {
  private critters: Map<string, Critter> = new Map();
  private generator: CritterGenerator;
  private bscService: BSCService;

  constructor() {
    this.generator = new CritterGenerator();
    this.bscService = new BSCService();
  }

  async generateCritter(tokenData: any, walletAddress: string): Promise<Critter> {
    const aiData = await this.generator.generate(tokenData);
    
    const stats = this.calculateStats(tokenData);
    
    const critter: Critter = {
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

  calculateStats(tokenData: any): CritterStats {
    const volatility = tokenData.volatility || 0.5;
    const liquidity = tokenData.liquidity || 50000;
    
    const health = Math.max(0, Math.min(100, Math.round((1 - volatility) * 100)));
    const happiness = Math.max(0, Math.min(100, 50 + Math.random() * 50));
    const energy = Math.max(0, Math.min(100, Math.min(100, Math.round((liquidity / 100000) * 100))));
    
    return { health, happiness, energy };
  }

  async interact(critterId: string, action: string, walletAddress: string): Promise<Critter> {
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

  getCritter(id: string): Critter | undefined {
    const cached = cache.get<Critter>(id);
    if (cached) return cached;
    return this.critters.get(id);
  }

  getCollection(walletAddress: string): Critter[] {
    const userCritters: Critter[] = [];
    this.critters.forEach(critter => {
      if (critter.walletAddress === walletAddress.toLowerCase()) {
        userCritters.push(critter);
      }
    });
    return userCritters;
  }

  generateDailyMessage(critter: Critter): string {
    const messages: Record<string, string[]> = {
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

  updateStatsFromMarket(critterId: string, marketData: any): Critter {
    const critter = this.critters.get(critterId);
    if (!critter) throw new Error('Critter not found');

    if (marketData.liquidity === 0) {
      critter.state = 'fainted';
    }

    critter.stats.health = Math.max(0, Math.min(100, 
      critter.stats.health + (marketData.priceChange || 0)
    ));

    this.critters.set(critterId, critter);
    return critter;
  }

  addDemoCritters(walletAddress: string): Critter[] {
    const demoTokens = [
      { symbol: 'CAKE', name: 'PancakeSwap', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', volatility: 0.15, liquidity: 150000 },
      { symbol: 'PEPE', name: 'Pepe', address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933', volatility: 0.85, liquidity: 30000 },
      { symbol: 'RUG', name: 'RugPull', address: '0x000000000000000000000000000000000000dEaD', volatility: 1, liquidity: 0 }
    ];

    const critters: Critter[] = [];
    
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
