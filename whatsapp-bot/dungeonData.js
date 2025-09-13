const BATTLE_ENVIRONMENTS = [
    { name: "Fiery Volcano", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds2.jpg", boostedType: "Fire", boost: 0.15 },
    { name: "Mystical Forest", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds2.jpg", boostedType: "Wind", boost: 0.15 },
    { name: "Ancient Ruins", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds3.jpg", boostedType: "Earth", boost: 0.15 },
    { name: "Night Forest", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds3.jpg", boostedType: "Shadow", boost: 0.15 },
    { name: "Glacier Plains", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds5.jpg", boostedType: "Ice", boost: 0.15 },
    { name: "Sunken Temple", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds4.jpg", boostedType: "Water", boost: 0.15 },
    { name: "Clockwork Tower", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds5.jpg", boostedType: "Metal", boost: 0.15 },
    { name: "Stormy Peaks", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds6.jpg", boostedType: "Lightning", boost: 0.15 },
];

const DUNGEON_TIERS = {
    Easy: {
        name: "Forgotten Mine",
        floors: 10,
        monster_pool: ["Easy"],
        boss_pool: ["Medium"],
        rewards: { gold: 1000, xp: 500, special: ["Basic Chest"] },
        environment: BATTLE_ENVIRONMENTS[2] // Ancient Ruins
    },
    Medium: {
        name: "Sunken Temple",
        floors: 10,
        monster_pool: ["Medium"],
        boss_pool: ["Hard"],
        rewards: { gold: 5000, xp: 2500, special: ["Rare Chest"] },
        environment: BATTLE_ENVIRONMENTS[5] // Sunken Temple
    },
    Hard: {
        name: "Volcanic Lair",
        floors: 10,
        monster_pool: ["Hard"],
        boss_pool: ["Difficult"],
        rewards: { gold: 15000, xp: 7500, special: ["Epic Chest", "Ability Scroll Fragment"] },
        environment: BATTLE_ENVIRONMENTS[0] // Fiery Volcano
    },
    Difficult: {
        name: "Void Nexus",
        floors: 10,
        monster_pool: ["Difficult"],
        boss_pool: ["Extreme"],
        rewards: { gold: 40000, xp: 20000, special: ["Legendary Chest", "Ability Scroll"] },
        environment: BATTLE_ENVIRONMENTS[3] // Night Forest
    },
    Extreme: {
        name: "Timeless Labyrinth",
        floors: 10,
        monster_pool: ["Extreme"],
        boss_pool: ["Extreme"], // Bosses fighting bosses
        rewards: { gold: 100000, xp: 50000, special: ["Mythic Chest", "Pet Shard"] },
        environment: BATTLE_ENVIRONMENTS[6] // Clockwork Tower
    }
};

const FLOOR_SCALING = {
    "1-2": { multiplier: 0.8, count: 2 },   // Weak
    "3-4": { multiplier: 1.0, count: 2 },   // Moderate
    "5-6": { multiplier: 1.2, count: 3 },   // Advanced
    "7-8": { multiplier: 1.5, count: 3 },   // Strong
    "9":   { multiplier: 1.8, count: 4 },   // Very Strong
    "10":  { multiplier: 2.5, count: 1 }    // Boss
};

function getFloorConfig(floor) {
    if (floor <= 2) return FLOOR_SCALING["1-2"];
    if (floor <= 4) return FLOOR_SCALING["3-4"];
    if (floor <= 6) return FLOOR_SCALING["5-6"];
    if (floor <= 8) return FLOOR_SCALING["7-8"];
    if (floor === 9) return FLOOR_SCALING["9"];
    if (floor === 10) return FLOOR_SCALING["10"];
    return null;
}

/**
 * Generates a new dungeon instance based on difficulty.
 * @param {string} difficulty - The chosen difficulty tier ('Easy', 'Medium', etc.).
 * @param {Array} allMonsters - The complete list of monsters from monsters.js.
 * @returns {object|null} A generated dungeon object or null if invalid difficulty.
 */
function generateDungeon(difficulty, allMonsters) {
    const tier = DUNGEON_TIERS[difficulty];
    if (!tier) return null;

    const monsterPool = allMonsters.filter(m => tier.monster_pool.includes(m.difficulty));
    const bossPool = allMonsters.filter(m => tier.boss_pool.includes(m.difficulty));

    if (monsterPool.length === 0 || bossPool.length === 0) {
        console.error(`Cannot generate dungeon: Not enough monsters for difficulty '${difficulty}'`);
        return null;
    }

    const dungeon = {
        name: tier.name,
        difficulty: difficulty,
        floors: tier.floors,
        environment: tier.environment,
        rewards: tier.rewards,
        monster_layout: {}
    };

    for (let i = 1; i <= tier.floors; i++) {
        const floorConfig = getFloorConfig(i);
        const floorMonsters = [];

        for (let j = 0; j < floorConfig.count; j++) {
            let baseMonster;
            if (i === 10) {
                // Boss floor
                baseMonster = { ...bossPool[Math.floor(Math.random() * bossPool.length)] };
            } else {
                // Regular floor
                baseMonster = { ...monsterPool[Math.floor(Math.random() * monsterPool.length)] };
            }

            // Apply scaling
            baseMonster.hp = Math.floor(baseMonster.hp * floorConfig.multiplier);
            baseMonster.atk = Math.floor(baseMonster.atk * floorConfig.multiplier);

            floorMonsters.push(baseMonster);
        }
        dungeon.monster_layout[`floor${i}`] = floorMonsters;
    }

    return dungeon;
}

module.exports = { DUNGEON_TIERS, generateDungeon };
