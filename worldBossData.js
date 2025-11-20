// worldBossData.js
// Defines the world bosses for server-wide events.

const worldBosses = {
  'magma_titan': {
    id: 'magma_titan',
    name: 'Magma Titan',
    hp: 50000, // A huge amount of health
    imageUrl: 'https://i.imgur.com/v2a1J5h.jpeg',
    rewards: {
      gold: 10000,
      items: {
        'dragon_soulstone': 1,
        'fire_essence': 5,
      },
      title: 'Titan Slayer' // A unique title for participants
    }
  },
  'abyssal_serpent': {
    id: 'abyssal_serpent',
    name: 'Abyssal Serpent',
    hp: 75000,
    imageUrl: 'https://i.imgur.com/8mQ2Y7k.jpeg',
    rewards: {
      gold: 20000,
      items: {
        'dragon_soulstone': 2,
        'common_lootbox': 3,
      },
      title: 'Serpentbane'
    }
  }
};

module.exports = worldBosses;
