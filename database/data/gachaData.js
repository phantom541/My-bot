// gachaData.js

const gachaData = {
  cardCase: {
    cost: 100,
    probabilities: {
        'Legendary': 1,
        'Rare': 10,
        'Uncommon': 30,
        'Common': 59
    },
    rewards: [
      // Legendary
      { type: 'card', id: 1, rarity: 'Legendary' },
      { type: 'card', id: 2, rarity: 'Legendary' },
      { type: 'card', id: 3, rarity: 'Legendary' },
      // Rare
      { type: 'card', id: 4, rarity: 'Rare' },
      { type: 'card', id: 5, rarity: 'Rare' },
      // Uncommon
      { type: 'card', id: 6, rarity: 'Uncommon' },
      { type: 'card', id: 7, rarity: 'Uncommon' },
      // Common
      { type: 'card', id: 8, rarity: 'Common' },
      { type: 'card', id: 9, rarity: 'Common' },
      { type: 'card', id: 10, rarity: 'Common' },
    ],
  },
  dragonCase: {
    cost: 500,
    probabilities: {
        'Legendary': 1,
        'Rare': 10,
        'Uncommon': 30,
        'Common': 59
    },
    rewards: [
        // Legendary
        { type: 'dragon', id: 1, rarity: 'Legendary' },
        { type: 'dragon', id: 13, rarity: 'Legendary' },
        { type: 'dragon', id: 14, rarity: 'Legendary' },
        // Rare
        { type: 'dragon', id: 2, rarity: 'Rare' },
        { type: 'dragon', id: 10, rarity: 'Rare' },
        { type: 'dragon', id: 17, rarity: 'Rare' },
        // Uncommon
        { type: 'dragon', id: 3, rarity: 'Uncommon' },
        { type: 'dragon', id: 8, rarity: 'Uncommon' },
        { type: 'dragon', id: 15, rarity: 'Uncommon' },
        // Common
        { type: 'dragon', id: 7, rarity: 'Common' },
        { type: 'dragon', id: 5, rarity: 'Common' },
        { type: 'dragon', id: 31, rarity: 'Common' },
    ]
  },
  goldCase: {
      cost: 50,
      probabilities: {
          'Legendary': 1,
          'Rare': 10,
          'Uncommon': 30,
          'Common': 59
      },
      rewards: [
          { type: 'gold', amount: 10, rarity: 'Common' },
          { type: 'gold', amount: 50, rarity: 'Uncommon' },
          { type: 'gold', amount: 100, rarity: 'Rare' },
          { type: 'gold', amount: 500, rarity: 'Legendary' },
      ]
  }
};

module.exports = gachaData;
