"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockCritters_js_1 = require("./mockCritters.js");
console.log('🐾 Seeding demo critters...\n');
mockCritters_js_1.mockCritters.forEach(critter => {
    console.log(`Created: ${critter.name} (${critter.species})`);
    console.log(`  State: ${critter.state}`);
    console.log(`  Stats: HP ${critter.stats.health} | HAPPY ${critter.stats.happiness} | ENERGY ${critter.stats.energy}`);
    console.log(`  Personality: ${critter.personality}`);
    console.log(`  Bio: ${critter.bio}\n`);
});
console.log('✅ Seed complete! Demo critters loaded.');
console.log('Wallet: demo_wallet');
console.log('Total critters:', mockCritters_js_1.mockCritters.length);
