export interface Critter {
  id: string;
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
}

export const mockCritters: Critter[] = [
  {
    id: 'demo_cake_1',
    tokenSymbol: 'CAKE',
    tokenName: 'PancakeSwap',
    name: 'Cosmic Sage',
    species: 'Yield Owl',
    personality: 'wise',
    bio: 'Ancient owl of the yield forests. Has seen many market cycles.',
    avatarUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=cake',
    stats: { health: 92, happiness: 88, energy: 75 },
    state: 'evolved',
    xp: 450,
    holdTime: 30 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'demo_pepe_1',
    tokenSymbol: 'PEPE',
    tokenName: 'Pepe',
    name: 'Chaotic Gremlin',
    species: 'Chaotic Gremlin',
    personality: 'chaotic',
    bio: 'Loves chaos and meme farms. Will eat your gains if you feed after midnight.',
    avatarUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=pepe',
    stats: { health: 45, happiness: 70, energy: 30 },
    state: 'alive',
    xp: 120,
    holdTime: 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'demo_rug_1',
    tokenSymbol: 'RUG',
    tokenName: 'RugPull Token',
    name: 'Zombie',
    species: 'Fainted Spirit',
    personality: 'deceased',
    bio: 'Once a hopeful critter. Now a lesson about LP locks.',
    avatarUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=rug',
    stats: { health: 0, happiness: 0, energy: 0 },
    state: 'fainted',
    xp: 50,
    holdTime: 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'demo_usdc_1',
    tokenSymbol: 'USDC',
    tokenName: 'USD Coin',
    name: 'Stable Star',
    species: 'Liquidity Lion',
    personality: 'stable',
    bio: 'The most reliable critter in your portfolio.',
    avatarUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=usdc',
    stats: { health: 100, happiness: 95, energy: 60 },
    state: 'alive',
    xp: 200,
    holdTime: 15 * 24 * 60 * 60 * 1000,
  },
  {
    id: 'demo_usdt_1',
    tokenSymbol: 'USDT',
    tokenName: 'Tether USD',
    name: 'Chill Turtle',
    species: 'Farm Bunny',
    personality: 'calm',
    bio: 'Moves slowly but surely. The backbone of your portfolio.',
    avatarUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=usdt',
    stats: { health: 98, happiness: 90, energy: 55 },
    state: 'alive',
    xp: 180,
    holdTime: 12 * 24 * 60 * 60 * 1000,
  },
];
