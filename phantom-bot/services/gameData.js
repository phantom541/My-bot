const dragons = require('../database/data/dragonData');
const cards = require('../database/data/cardData');
const shop = require('../database/data/shop');
const beasts = require('../database/data/beastData');
const monsters = require('../database/data/monsters');
const dungeonTiers = require('../database/data/dungeonData').DUNGEON_TIERS;
const { generateDungeon } = require('../database/data/dungeonData');

const activeBattles = {};
const activeTrades = {};
const activeDungeons = {};
const activeBeast = {};
const activeWildEncounters = {};
const activeCardSpawns = {};
const activeCardPacks = {};

const BATTLE_ENVIRONMENTS = [
    { name: "Fiery Volcano", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds2.jpg", boostedType: "Fire", boost: 0.15 },
    { name: "Mystical Forest", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds2.jpg", boostedType: "Wind", boost: 0.15 },
    { name: "Ancient Ruins", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds3.jpg", boostedType: "Earth", boost: 0.15 },
    { name: "Night Forest", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds3.jpg", boostedType: "Shadow", boost: 0.15 },
    { name: "Glacier Plains", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds5.jpg", boostedType: "Ice", boost: 0.15 },
];

const typeEffectiveness = {
    'Fire': { strongAgainst: ['Metal', 'Ice'], weakAgainst: ['Water'] },
    'Water': { strongAgainst: ['Fire', 'Earth'], weakAgainst: ['Lightning'] },
    'Earth': { strongAgainst: ['Lightning', 'Metal'], weakAgainst: ['Water', 'Wind'] },
    'Wind': { strongAgainst: ['Earth'], weakAgainst: ['Ice'] },
    'Ice': { strongAgainst: ['Wind', 'Shadow'], weakAgainst: ['Fire', 'Metal'] },
    'Lightning': { strongAgainst: ['Water'], weakAgainst: ['Earth', 'Shadow'] },
    'Metal': { strongAgainst: ['Ice'], weakAgainst: ['Fire', 'Earth'] },
    'Shadow': { strongAgainst: ['Lightning'], weakAgainst: ['Ice'] }
};

function getEffectiveness(moveType, targetDragonType) {
    const effectivenessInfo = typeEffectiveness[moveType];
    if (effectivenessInfo) {
        if (effectivenessInfo.strongAgainst.includes(targetDragonType)) return 1.5;
        if (effectivenessInfo.weakAgainst.includes(targetDragonType)) return 0.5;
    }
    return 1;
}

const RANKS = [
    'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master',
    'Grandmaster', 'Elder', 'Legendary', 'Mythic', 'Titan', 'Dragon Master'
];

function getRank(level) {
    const rankIndex = Math.floor((level - 1) / 10);
    return RANKS[rankIndex] || RANKS[RANKS.length - 1];
}

const XP_PER_LEVEL = 100;
const XP_GAIN_MULTIPLIER = 10;
const PLAYER_XP_GAIN = 50;
const GUILD_TIERS = {
    1: { name: "Bronze", xp_boost: 0.05, loot_bonus: 0.05 },
    10: { name: "Silver", xp_boost: 0.10, loot_bonus: 0.10 },
    25: { name: "Gold", xp_boost: 0.15, loot_bonus: 0.15 },
    50: { name: "Platinum", xp_boost: 0.20, loot_bonus: 0.20 },
    100: { name: "Mythic", xp_boost: 0.25, loot_bonus: 0.25 },
};

const battleService = require('./battle');

module.exports = {
    dragons, cards, shop, beasts, monsters, dungeonTiers, generateDungeon,
    activeBattles, activeTrades, activeDungeons, activeBeast, activeWildEncounters, activeCardSpawns, activeCardPacks,
    BATTLE_ENVIRONMENTS, typeEffectiveness, getEffectiveness, RANKS, getRank,
    XP_PER_LEVEL, XP_GAIN_MULTIPLIER, PLAYER_XP_GAIN, GUILD_TIERS,
    ...battleService
};
