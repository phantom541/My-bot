const dungeons = {
    "The Goblin Cave": {
        difficulty: "Easy",
        floors: 3,
        environment: { name: "Cave", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds4.jpg", boostedType: "Earth", boost: 0.10 },
        monsters: {
            floor1: [1001, 1003], // IDs of possible monsters for this floor
            floor2: [1001, 1002],
            floor3: [1002, 1002]  // Final floor has a tougher fight
        },
        rewards: {
            gold: 500,
            xp: 200
        }
    }
    // More dungeons can be added here
};

module.exports = dungeons;
