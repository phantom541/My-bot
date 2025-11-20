// evolutionData.js
// This file defines the evolution paths for various dragons.

const evolutionPaths = {
  // The key is the ID of the dragon that can evolve.
  '7': { // Terrible Terror
    evolvesTo: 20, // Evolves into a Typhoomerang
    requirements: {
      level: 30, // Must be at least level 30
      items: {
        'dragon_soulstone': 1 // Requires 1 Dragon Soulstone
      }
    }
  },
  '5': { // Gronckle
    evolvesTo: 16, // Evolves into an Eruptodon
    requirements: {
      level: 35,
      items: {
        'dragon_soulstone': 1,
        'fire_essence': 5 // Requires 1 Soulstone and 5 Fire Essences
      }
    }
  }
  // Add more evolution paths here in the future
};

module.exports = evolutionPaths;
