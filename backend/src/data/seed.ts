import { mockCritters } from './mockCritters.js';

console.log('🐾 Seeding demo critters...\n');

mockCritters.forEach(critter => {
  console.log(`Created: ${critter.name} (${critter.species})`);
  console.log(`  State: ${critter.state}`);
  console.log(`  Stats: HP ${critter.stats.health} | HAPPY ${critter.stats.happiness} | ENERGY ${critter.stats.energy}`);
  console.log(`  Personality: ${critter.personality}`);
  console.log(`  Bio: ${critter.bio}\n`);
});

console.log('✅ Seed complete! Demo critters loaded.');
console.log('Wallet: demo_wallet');
console.log('Total critters:', mockCritters.length);
