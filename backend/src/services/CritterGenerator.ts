export interface AIGeneratedData {
  name: string;
  species: string;
  personality: string;
  bio: string;
  avatarUrl: string;
}

const SPRITES: Record<string, { species: string; personality: string }[]> = {
  meme: [
    { species: 'Chaotic Gremlin', personality: 'chaotic' },
    { species: 'Doge Spirit', personality: 'blessed' },
    { species: 'Pepe Variant', personality: 'mysterious' },
    { species: 'Frog Prince', personality: 'royal' }
  ],
  defi: [
    { species: 'Yield Owl', personality: 'wise' },
    { species: 'Liquidity Lion', personality: 'majestic' },
    { species: 'Swap Shark', personality: 'aggressive' },
    { species: 'Farm Bunny', personality: 'energetic' }
  ],
  nft: [
    { species: 'Pixel Panda', personality: 'artistic' },
    { species: 'Cube Cat', personality: 'geometric' },
    { species: 'Art Ape', personality: 'cultured' },
    { species: 'Meta Mouse', personality: 'clever' }
  ],
  utility: [
    { species: 'Chain Chipmunk', personality: 'busy' },
    { species: 'Node Newt', personality: 'connected' },
    { species: 'Gas Ghost', personality: 'ethereal' },
    { species: 'Block Beaver', personality: 'constructive' }
  ]
};

const CRITTER_NAMES = [
  'Biscuit', 'Nugget', 'Sprout', 'Bean', 'Pudding', 'Mochi', 'Peanut', 'Marshmallow',
  'Chip', 'Cookie', 'Crumb', 'Pebble', 'Spark', 'Ember', 'Shadow', 'Luna',
  'Cosmo', 'Jinx', 'Milo', 'Loki', 'Charlie', 'Mochi', 'Bongo', 'Ziggy'
];

export class CritterGenerator {
  private hfApiKey: string | undefined;

  constructor() {
    this.hfApiKey = process.env.HF_API_KEY;
  }

  async generate(tokenData: any): Promise<AIGeneratedData> {
    const category = this.categorizeToken(tokenData);
    const spriteData = this.getRandomSprite(category);
    
    const name = this.generateName(tokenData.symbol);
    const personality = spriteData.personality;
    const species = spriteData.species;
    const bio = this.generateBio(species, personality, tokenData.name);
    
    let avatarUrl: string;
    try {
      avatarUrl = await this.generateAvatar(species, personality);
    } catch {
      avatarUrl = this.getFallbackAvatar(category);
    }

    return { name, species, personality, bio, avatarUrl };
  }

  categorizeToken(tokenData: any): string {
    const symbol = tokenData.symbol?.toLowerCase() || '';
    const name = tokenData.name?.toLowerCase() || '';
    
    if (['pepe', 'doge', 'shib', 'baby', 'elon', 'moon'].some(k => symbol.includes(k) || name.includes(k))) {
      return 'meme';
    }
    if (['swap', 'farm', 'yield', 'lp', 'cake', 'bakery'].some(k => symbol.includes(k) || name.includes(k))) {
      return 'defi';
    }
    if (['nft', 'art', 'pixel', 'collection'].some(k => symbol.includes(k) || name.includes(k))) {
      return 'nft';
    }
    return 'utility';
  }

  getRandomSprite(category: string) {
    const sprites = SPRITES[category] || SPRITES.utility;
    return sprites[Math.floor(Math.random() * sprites.length)];
  }

  generateName(symbol: string): string {
    const baseName = CRITTER_NAMES[Math.floor(Math.random() * CRITTER_NAMES.length)];
    const epithet = ['Fluffy', 'Sparkly', 'Cosmic', 'Tiny', 'Mega', 'Hyper', 'Ultra'][Math.floor(Math.random() * 7)];
    return `${epithet} ${baseName}`;
  }

  generateBio(species: string, personality: string, tokenName: string): string {
    const bios: Record<string, string[]> = {
      chaotic: [
        `Loves chaos and meme farms. ${tokenName} enthusiast!`,
        'Will eat your gains if you feed after midnight.',
        'Chaos agent. Very cute though.'
      ],
      blessed: [
        'Always lucky. Probably because of all the belly rubs.',
        'Blessed by the crypto gods. Sends positive vibes.',
        'The goodest boy in the entire DeFi ecosystem.'
      ],
      mysterious: [
        'No one knows what it does. But it works.',
        'Exists in multiple dimensions simultaneously.',
        'Very strange. But adorable.'
      ],
      wise: [
        'Has seen many rug pulls. Shares wisdom.',
        'Knows when to farm and when to rest.',
        'Ancient critter of the yield forests.'
      ],
      energetic: [
        'Never stops bouncing! Infinite energy!',
        'Can flip pancakes faster than you can say CAKE!',
        'The most active critter in the portfolio!'
      ],
      artistic: [
        'Judges your NFTs. Doesn\'t like most of them.',
        'Creates masterpieces while you sleep.',
        'Very cultured. Prefers blue-chip art.'
      ],
      default: [
        `Just a normal ${species}. Loves ${tokenName}!`,
        'Average critter. Above average cuteness.',
        'Trying its best. That\'s all that matters.'
      ]
    };

    const options = bios[personality] || bios.default;
    return options[Math.floor(Math.random() * options.length)];
  }

  async generateAvatar(species: string, personality: string): Promise<string> {
    if (!this.hfApiKey || this.hfApiKey === 'your_huggingface_api_key_here') {
      throw new Error('No HF API key');
    }

    const prompt = `cute pixel art ${species.toLowerCase()}, crypto themed, vibrant colors, playful style, chibi, adorable, digital art, 8-bit`;
    
    const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1-base', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.hfApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      throw new Error('Avatar generation failed');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  getFallbackAvatar(category: string): string {
    const fallbacks: Record<string, string> = {
      meme: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=meme',
      defi: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=defi',
      nft: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=nft',
      utility: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=utility'
    };
    return fallbacks[category] || fallbacks.utility;
  }
}
