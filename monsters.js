const MOVE_POOLS = {
    Fire: [
        { name: "Ember", damage: 20, type: "Fire" },
        { name: "Fireball", damage: 35, type: "Fire" },
        { name: "Flame Burst", damage: 50, type: "Fire" },
        { name: "Inferno", damage: 70, type: "Fire" },
        { name: "Scorching Ray", damage: 85, type: "Fire" },
        { name: "Conflagrate", damage: 100, type: "Fire" },
        { name: "Incinerate", damage: 110, type: "Fire" },
        { name: "Pyroclasm", damage: 130, type: "Fire" },
    ],
    Water: [
        { name: "Douse", damage: 20, type: "Water" },
        { name: "Aqua Jet", damage: 35, type: "Water" },
        { name: "Water Pulse", damage: 50, type: "Water" },
        { name: "Tidal Wave", damage: 70, type: "Water" },
        { name: "Hydro Pump", damage: 90, type: "Water" },
        { name: "Geyser", damage: 110, type: "Water" },
        { name: "Maelstrom", damage: 125, type: "Water" },
        { name: "Tsunami", damage: 140, type: "Water" },
    ],
    Earth: [
        { name: "Pebble Toss", damage: 22, type: "Earth" },
        { name: "Rock Slide", damage: 38, type: "Earth" },
        { name: "Earth Spike", damage: 55, type: "Earth" },
        { name: "Stone Edge", damage: 75, type: "Earth" },
        { name: "Fissure", damage: 95, type: "Earth" },
        { name: "Earthquake", damage: 115, type: "Earth" },
        { name: "Landslide", damage: 130, type: "Earth" },
        { name: "Tectonic Shift", damage: 150, type: "Earth" },
    ],
    Wind: [
        { name: "Gust", damage: 18, type: "Wind" },
        { name: "Tornado", damage: 33, type: "Wind" },
        { name: "Aerial Ace", damage: 48, type: "Wind" },
        { name: "Gale Force", damage: 68, type: "Wind" },
        { name: "Cyclone", damage: 88, type: "Wind" },
        { name: "Hurricane", damage: 105, type: "Wind" },
        { name: "Sky Uppercut", damage: 120, type: "Wind" },
        { name: "Tempest", damage: 140, type: "Wind" },
    ],
    Ice: [
        { name: "Frostbite", damage: 20, type: "Ice" },
        { name: "Ice Shard", damage: 35, type: "Ice" },
        { name: "Glaciate", damage: 52, type: "Ice" },
        { name: "Avalanche", damage: 72, type: "Ice" },
        { name: "Blizzard", damage: 92, type: "Ice" },
        { name: "Absolute Zero", damage: 112, type: "Ice" },
        { name: "Ice Beam", damage: 128, type: "Ice" },
        { name: "Frozen Orb", damage: 145, type: "Ice" },
    ],
    Lightning: [
        { name: "Spark", damage: 21, type: "Lightning" },
        { name: "Thunder Shock", damage: 36, type: "Lightning" },
        { name: "Volt Tackle", damage: 53, type: "Lightning" },
        { name: "Thunderbolt", damage: 73, type: "Lightning" },
        { name: "Thunder", damage: 93, type: "Lightning" },
        { name: "Plasma Burst", damage: 113, type: "Lightning" },
        { name: "Ion Cannon", damage: 128, type: "Lightning" },
        { name: "Lightning Storm", damage: 148, type: "Lightning" },
    ],
    Metal: [
        { name: "Scrap", damage: 23, type: "Metal" },
        { name: "Iron Head", damage: 40, type: "Metal" },
        { name: "Steel Wing", damage: 58, type: "Metal" },
        { name: "Metal Claw", damage: 78, type: "Metal" },
        { name: "Gear Grind", damage: 98, type: "Metal" },
        { name: "Heavy Metal", damage: 118, type: "Metal" },
        { name: "Meteor Mash", damage: 135, type: "Metal" },
        { name: "Blade Storm", damage: 155, type: "Metal" },
    ],
    Shadow: [
        { name: "Fade", damage: 19, type: "Shadow" },
        { name: "Shadow Sneak", damage: 34, type: "Shadow" },
        { name: "Dark Pulse", damage: 51, type: "Shadow" },
        { name: "Night Shade", damage: 71, type: "Shadow" },
        { name: "Phantom Force", damage: 91, type: "Shadow" },
        { name: "Soul Drain", damage: 111, type: "Shadow" },
        { name: "Abyssal Grasp", damage: 126, type: "Shadow" },
        { name: "Nevermore", damage: 146, type: "Shadow" },
    ]
};

const MONSTERS = [
    // --- Beasts & Creatures ---
    {
        id: 101,
        name: "Basilisk",
        type: "Earth",
        difficulty: "Hard",
        hp: 1200,
        atk: 80,
        drops: ["Elemental Gem", "Basilisk Eye"],
        moveset: [ ...MOVE_POOLS.Earth.slice(0, 4), ...MOVE_POOLS.Shadow.slice(2, 4) ]
    },
    {
        id: 102,
        name: "Chimera",
        type: "Fire",
        difficulty: "Difficult",
        hp: 2200,
        atk: 160,
        drops: ["Rare Equipment", "Chimera's Mane"],
        moveset: [ ...MOVE_POOLS.Fire.slice(2, 6), ...MOVE_POOLS.Metal.slice(3, 5) ]
    },
    {
        id: 103,
        name: "Wyvern",
        type: "Wind",
        difficulty: "Medium",
        hp: 600,
        atk: 50,
        drops: ["Coins", "Wyvern Scale"],
        moveset: [ ...MOVE_POOLS.Wind.slice(0, 6) ]
    },
    {
        id: 104,
        name: "Manticore",
        type: "Earth",
        difficulty: "Hard",
        hp: 1500,
        atk: 100,
        drops: ["Elemental Gem", "Manticore Spike"],
        moveset: [ ...MOVE_POOLS.Earth.slice(1, 5), ...MOVE_POOLS.Metal.slice(0, 2) ]
    },
    {
        id: 105,
        name: "Hydra",
        type: "Water",
        difficulty: "Difficult",
        hp: 2800,
        atk: 180,
        drops: ["Ability Scroll", "Hydra Tooth"],
        moveset: [ ...MOVE_POOLS.Water.slice(2, 8) ]
    },
    {
        id: 106,
        name: "Warg",
        type: "Earth",
        difficulty: "Easy",
        hp: 200,
        atk: 25,
        drops: ["Small Coins", "Warg Pup Fur"],
        moveset: [ ...MOVE_POOLS.Earth.slice(0, 6) ]
    },
    {
        id: 107,
        name: "Cerberus",
        type: "Fire",
        difficulty: "Hard",
        hp: 1800,
        atk: 120,
        drops: ["Elemental Gem", "Hellstone"],
        moveset: [ ...MOVE_POOLS.Fire.slice(2, 5), ...MOVE_POOLS.Shadow.slice(2, 5) ]
    },
    {
        id: 108,
        name: "Minotaur",
        type: "Earth",
        difficulty: "Medium",
        hp: 750,
        atk: 60,
        drops: ["Coins", "Minotaur Horn"],
        moveset: [ ...MOVE_POOLS.Earth.slice(1, 7) ]
    },
    {
        id: 109,
        name: "Werebear",
        type: "Earth",
        difficulty: "Medium",
        hp: 800,
        atk: 55,
        drops: ["Rare Items", "Werebear Claw"],
        moveset: [ ...MOVE_POOLS.Earth.slice(0, 6) ]
    },
    {
        id: 110,
        name: "Thunderfang",
        type: "Lightning",
        difficulty: "Hard",
        hp: 1300,
        atk: 90,
        drops: ["Elemental Gem", "Charged Fang"],
        moveset: [ ...MOVE_POOLS.Lightning.slice(1, 7) ]
    },
    // --- Demons & Terrors ---
    {
        id: 111,
        name: "Hellhound",
        type: "Fire",
        difficulty: "Medium",
        hp: 500,
        atk: 45,
        drops: ["Coins", "Hellstone Shard"],
        moveset: [ ...MOVE_POOLS.Fire.slice(1, 5), ...MOVE_POOLS.Shadow.slice(0, 2) ]
    },
    {
        id: 112,
        name: "Banshee",
        type: "Shadow",
        difficulty: "Medium",
        hp: 400,
        atk: 40,
        drops: ["Rare Items", "Sorrowful Essence"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(1, 7) ]
    },
    {
        id: 113,
        name: "Dread Wraith",
        type: "Shadow",
        difficulty: "Hard",
        hp: 1100,
        atk: 75,
        drops: ["Elemental Gem", "Wraith Essence"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(2, 8) ]
    },
    {
        id: 114,
        name: "Succubus",
        type: "Shadow",
        difficulty: "Hard",
        hp: 1000,
        atk: 70,
        drops: ["Stat Boosts", "Charm of Seduction"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(1, 5), ...MOVE_POOLS.Fire.slice(0, 2) ]
    },
    {
        id: 115,
        name: "Revenant",
        type: "Shadow",
        difficulty: "Easy",
        hp: 250,
        atk: 20,
        drops: ["Small Coins", "Grave Dust"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(0, 6) ]
    },
    {
        id: 116,
        name: "Shadow Fiend",
        type: "Shadow",
        difficulty: "Difficult",
        hp: 2500,
        atk: 170,
        drops: ["Rare Equipment", "Shadow Soul"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(3, 8), { name: "Requiem of Souls", damage: 200, type: "Shadow" } ]
    },
    {
        id: 117,
        name: "Abyssal Watcher",
        type: "Metal",
        difficulty: "Difficult",
        hp: 2800,
        atk: 190,
        drops: ["Ability Scroll", "Watcher's Greatsword"],
        moveset: [ ...MOVE_POOLS.Metal.slice(2, 6), ...MOVE_POOLS.Fire.slice(2, 4) ]
    },
    {
        id: 118,
        name: "Bone Knight",
        type: "Earth",
        difficulty: "Medium",
        hp: 650,
        atk: 50,
        drops: ["Coins", "Bone Shards"],
        moveset: [ ...MOVE_POOLS.Earth.slice(1, 5), ...MOVE_POOLS.Shadow.slice(1, 3) ]
    },
    {
        id: 119,
        name: "Dreadflame Reaper",
        type: "Fire",
        difficulty: "Difficult",
        hp: 2600,
        atk: 200,
        drops: ["Rare Equipment", "Scythe of Dreadflame"],
        moveset: [ ...MOVE_POOLS.Fire.slice(4, 8), ...MOVE_POOLS.Shadow.slice(4, 6) ]
    },
    {
        id: 120,
        name: "Blood Widow",
        type: "Shadow",
        difficulty: "Extreme",
        hp: 4000,
        atk: 250,
        drops: ["Legendary Items", "Venom of the Widow"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(2, 8) ]
    },

    // --- Mythic & Arcane ---
    {
        id: 121,
        name: "Arcane Serpent",
        type: "Lightning",
        difficulty: "Hard",
        hp: 1400,
        atk: 95,
        drops: ["Elemental Gem", "Arcane Scale"],
        moveset: [ ...MOVE_POOLS.Lightning.slice(2, 8) ]
    },
    {
        id: 122,
        name: "Star Eater",
        type: "Shadow",
        difficulty: "Extreme",
        hp: 5000,
        atk: 300,
        drops: ["Legendary Items", "Cosmic Dust"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(4, 8), ...MOVE_POOLS.Fire.slice(4, 6) ]
    },
    {
        id: 123,
        name: "Dream Devourer",
        type: "Shadow",
        difficulty: "Difficult",
        hp: 2400,
        atk: 160,
        drops: ["Ability Scroll", "Essence of Nightmares"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(2, 8) ]
    },
    {
        id: 124,
        name: "Temporal Beast",
        type: "Metal",
        difficulty: "Difficult",
        hp: 3000,
        atk: 150,
        drops: ["Rare Equipment", "Temporal Crystal"],
        moveset: [ ...MOVE_POOLS.Metal.slice(3, 8), { name: "Time Warp", damage: 180, type: "Metal" } ]
    },
    {
        id: 125,
        name: "Chaos Elemental",
        type: "Fire", // Base type, can be randomized later
        difficulty: "Hard",
        hp: 1600,
        atk: 110,
        drops: ["Elemental Gem", "Chaotic Remnant"],
        moveset: [ ...MOVE_POOLS.Fire.slice(2, 5), ...MOVE_POOLS.Water.slice(2, 5) ]
    },
    {
        id: 126,
        name: "Void Lurker",
        type: "Shadow",
        difficulty: "Difficult",
        hp: 2700,
        atk: 185,
        drops: ["Ability Scroll", "Void Essence"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(3, 8), { name: "Unravel", damage: 190, type: "Shadow" } ]
    },
    {
        id: 127,
        name: "Rift Hydra",
        type: "Water",
        difficulty: "Extreme",
        hp: 4500,
        atk: 280,
        drops: ["Legendary Items", "Rift Core"],
        moveset: [ ...MOVE_POOLS.Water.slice(3, 8), ...MOVE_POOLS.Lightning.slice(3, 5) ]
    },
    {
        id: 128,
        name: "Soul Mirror",
        type: "Metal",
        difficulty: "Hard",
        hp: 1300,
        atk: 85,
        drops: ["Stat Boosts", "Mirrored Shard"],
        moveset: [ ...MOVE_POOLS.Metal.slice(1, 7) ]
    },
    {
        id: 129,
        name: "Rune Golem",
        type: "Earth",
        difficulty: "Medium",
        hp: 700,
        atk: 40,
        drops: ["Coins", "Runic Fragment"],
        moveset: [ ...MOVE_POOLS.Earth.slice(1, 7) ]
    },
    {
        id: 130,
        name: "Eternity Watcher",
        type: "Extreme",
        difficulty: "Extreme",
        hp: 6000,
        atk: 350,
        drops: ["Dungeon Titles", "Eye of Eternity"],
        moveset: [ ...MOVE_POOLS.Metal.slice(5, 8), ...MOVE_POOLS.Shadow.slice(5, 8) ]
    },
    // --- Elementals & Spirits ---
    {
        id: 131,
        name: "Ember Titan",
        type: "Fire",
        difficulty: "Hard",
        hp: 1700,
        atk: 115,
        drops: ["Elemental Gem", "Heart of the Titan"],
        moveset: [ ...MOVE_POOLS.Fire.slice(2, 8) ]
    },
    {
        id: 132,
        name: "Frost Wraith",
        type: "Ice",
        difficulty: "Medium",
        hp: 600,
        atk: 48,
        drops: ["Rare Items", "Frost Essence"],
        moveset: [ ...MOVE_POOLS.Ice.slice(1, 7) ]
    },
    {
        id: 133,
        name: "Stone Behemoth",
        type: "Earth",
        difficulty: "Difficult",
        hp: 2900,
        atk: 140,
        drops: ["Rare Equipment", "Behemoth Core"],
        moveset: [ ...MOVE_POOLS.Earth.slice(2, 8) ]
    },
    {
        id: 134,
        name: "Gale Specter",
        type: "Wind",
        difficulty: "Medium",
        hp: 450,
        atk: 42,
        drops: ["Coins", "Spectral Dust"],
        moveset: [ ...MOVE_POOLS.Wind.slice(1, 7) ]
    },
    {
        id: 135,
        name: "Crystal Phantom",
        type: "Ice",
        difficulty: "Easy",
        hp: 150,
        atk: 18,
        drops: ["Small Coins", "Crystal Shard"],
        moveset: [ ...MOVE_POOLS.Ice.slice(0, 6) ]
    },
    {
        id: 136,
        name: "Magma Drake",
        type: "Fire",
        difficulty: "Hard",
        hp: 1600,
        atk: 110,
        drops: ["Elemental Gem", "Drake Scale"],
        moveset: [ ...MOVE_POOLS.Fire.slice(2, 7), ...MOVE_POOLS.Earth.slice(2, 3) ]
    },
    {
        id: 137,
        name: "Toxic Sludge",
        type: "Water",
        difficulty: "Easy",
        hp: 300,
        atk: 15,
        drops: ["Basic Potions", "Toxic Goop"],
        moveset: [ ...MOVE_POOLS.Water.slice(0, 6) ]
    },
    {
        id: 138,
        name: "Ash Revenant",
        type: "Fire",
        difficulty: "Medium",
        hp: 550,
        atk: 40,
        drops: ["Coins", "Ashen Dust"],
        moveset: [ ...MOVE_POOLS.Fire.slice(0, 4), ...MOVE_POOLS.Shadow.slice(0, 2) ]
    },
    {
        id: 139,
        name: "Storm Herald",
        type: "Lightning",
        difficulty: "Difficult",
        hp: 2300,
        atk: 175,
        drops: ["Ability Scroll", "Storm Core"],
        moveset: [ ...MOVE_POOLS.Lightning.slice(2, 8) ]
    },
    {
        id: 140,
        name: "Thunder Core",
        type: "Lightning",
        difficulty: "Difficult",
        hp: 2100,
        atk: 190,
        drops: ["Rare Equipment", "Charged Core"],
        moveset: [ ...MOVE_POOLS.Lightning.slice(3, 8), { name: "Supernova", damage: 220, type: "Lightning" } ]
    },
    // --- Constructs & Undead ---
    {
        id: 141,
        name: "Iron Juggernaut",
        type: "Metal",
        difficulty: "Difficult",
        hp: 3000,
        atk: 160,
        drops: ["Rare Equipment", "Juggernaut Plating"],
        moveset: [ ...MOVE_POOLS.Metal.slice(2, 8) ]
    },
    {
        id: 142,
        name: "Clockwork Horror",
        type: "Metal",
        difficulty: "Medium",
        hp: 650,
        atk: 52,
        drops: ["Coins", "Clockwork Gear"],
        moveset: [ ...MOVE_POOLS.Metal.slice(1, 7) ]
    },
    {
        id: 143,
        name: "Spectral Armor",
        type: "Shadow",
        difficulty: "Medium",
        hp: 500,
        atk: 45,
        drops: ["Rare Items", "Ectoplasm"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(1, 5), ...MOVE_POOLS.Metal.slice(1, 3) ]
    },
    {
        id: 144,
        name: "Bone Colossus",
        type: "Earth",
        difficulty: "Hard",
        hp: 1800,
        atk: 90,
        drops: ["Elemental Gem", "Colossal Bone"],
        moveset: [ ...MOVE_POOLS.Earth.slice(3, 8), ...MOVE_POOLS.Shadow.slice(1, 2) ]
    },
    {
        id: 145,
        name: "Corrupted Sentinel",
        type: "Metal",
        difficulty: "Hard",
        hp: 1500,
        atk: 100,
        drops: ["Stat Boosts", "Sentinel Core"],
        moveset: [ ...MOVE_POOLS.Metal.slice(2, 6), ...MOVE_POOLS.Shadow.slice(2, 4) ]
    },
    {
        id: 146,
        name: "Wailing Automaton",
        type: "Wind",
        difficulty: "Medium",
        hp: 580,
        atk: 47,
        drops: ["Coins", "Screaming Gear"],
        moveset: [ ...MOVE_POOLS.Wind.slice(1, 7) ]
    },
    {
        id: 147,
        name: "Shadow Puppet",
        type: "Shadow",
        difficulty: "Easy",
        hp: 180,
        atk: 22,
        drops: ["Small Coins", "Shadow String"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(0, 6) ]
    },
    {
        id: 148,
        name: "Necrotic Horror",
        type: "Shadow",
        difficulty: "Difficult",
        hp: 2600,
        atk: 180,
        drops: ["Ability Scroll", "Necrotic Slime"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(3, 8), { name: "Death Gaze", damage: 210, type: "Shadow" } ]
    },
    {
        id: 149,
        name: "Phantom Berserker",
        type: "Shadow",
        difficulty: "Hard",
        hp: 1200,
        atk: 110,
        drops: ["Elemental Gem", "Berserker's Axe Head"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(2, 6), ...MOVE_POOLS.Metal.slice(2, 4) ]
    },
    {
        id: 150,
        name: "Plaguebound Lich",
        type: "Extreme",
        difficulty: "Extreme",
        hp: 5500,
        atk: 320,
        drops: ["Pet Shards", "Lich's Phylactery"],
        moveset: [ ...MOVE_POOLS.Shadow.slice(4, 8), ...MOVE_POOLS.Ice.slice(4, 6) ]
    },
];

module.exports = { MONSTERS, MOVE_POOLS };
