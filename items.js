// items.js
// This file contains the master list of all items in the game.

const items = {
  // Evolution Items
  'dragon_soulstone': {
    id: 'dragon_soulstone',
    name: 'Dragon Soulstone',
    description: 'A crystal pulsating with raw draconic energy. Required to evolve certain dragons.',
    type: 'evolution',
  },

  // Enchanting / Forging Materials
  'steel_scale': {
    id: 'steel_scale',
    name: 'Steel Scale',
    description: 'A dragon scale as hard as steel. Used to forge and enhance dragon defenses.',
    type: 'material',
  },
  'fire_essence': {
    id: 'fire_essence',
    name: 'Fire Essence',
    description: 'The crystallized essence of a flame. Used to enhance a dragon\'s fire-type abilities.',
    type: 'material',
  },

  // Move Scrolls
  'move_scroll_fireball': {
    id: 'move_scroll_fireball',
    name: 'Move Scroll: Fireball',
    description: 'A magical scroll that can teach a dragon the "Fireball" ability.',
    type: 'scroll',
    move: { name: 'Fireball', damage: 80, type: 'Special' },
  },

  // Lootboxes
  'common_lootbox': {
    id: 'common_lootbox',
    name: 'Common Lootbox',
    description: 'A simple wooden chest. Who knows what it contains?',
    type: 'lootbox',
    rewards: [ // Define potential rewards
      { type: 'gold', amount: [50, 200], chance: 0.8 }, // 80% chance to get 50-200 gold
      { type: 'item', id: 'steel_scale', amount: [1, 3], chance: 0.15 }, // 15% chance for Steel Scales
      { type: 'item', id: 'move_scroll_fireball', amount: 1, chance: 0.05 }, // 5% chance for a scroll
    ]
  },
};

module.exports = items;
