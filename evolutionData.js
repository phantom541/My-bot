// evolutionData.js
// This file defines the evolution paths for various dragons.

const evolutionPaths = {
  // The key is the ID of the dragon that can evolve.
  '1': { // Night Fury
    evolvesTo: 1, // Stays a Night Fury, but becomes Alpha
    requirements: {
      level: 50,
      items: { 'dragon_soulstone': 5 }
    },
    enhancements: {
      classChange: 'Alpha',
      moveDamageMultiplier: 1.5, // 50% damage boost
      damageReduction: 0.25 // 25% damage reduction
    }
  },
  '7': { // Terrible Terror
    evolvesTo: 20, // Evolves into a Typhoomerang
    requirements: {
      level: 30,
      items: { 'dragon_soulstone': 1 }
    },
    enhancements: {
      moveDamageMultiplier: 1.2,
      damageReduction: 0.1
    }
  },
  '5': { // Gronckle
    evolvesTo: 16, // Evolves into an Eruptodon
    requirements: {
      level: 35,
      items: { 'dragon_soulstone': 1, 'fire_essence': 5 }
    },
    enhancements: {
      moveDamageMultiplier: 1.3,
      damageReduction: 0.15
    }
  }
};

module.exports = evolutionPaths;
