// explorationData.js
// Defines the locations and events for the %explore command.

const explorationEvents = {
  'forest': [
    { text: "You found 50 gold!", type: 'gold', amount: 50, chance: 0.6 },
    { text: "You stumbled upon a rare herb!", type: 'item', id: 'steel_scale', amount: 1, chance: 0.3 },
    { text: "You were ambushed by a wild dragon! You barely escaped, dropping 25 gold.", type: 'lose_gold', amount: 25, chance: 0.1 },
  ],
  'cave': [
    { text: "You discovered a vein of 100 gold!", type: 'gold', amount: 100, chance: 0.5 },
    { text: "You found a Dragon Soulstone!", type: 'item', id: 'dragon_soulstone', amount: 1, chance: 0.1 },
    { text: "A rockslide traps you for a moment. You lose some time.", type: 'nothing', chance: 0.4 },
  ],
};

module.exports = explorationEvents;
