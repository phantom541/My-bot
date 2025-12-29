// playerData.js
const fs = require('fs');
const path = './playerData.json';

// Load player data from file or create empty object
function loadPlayers() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
  }
  const raw = fs.readFileSync(path);
  return JSON.parse(raw);
}

// Save player data to file
function savePlayers(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// Get player profile or create new one
function getPlayer(id, name) {
  const players = loadPlayers();
  if (!players[id]) {
    // Create a new user with the Nexus Society profile structure
    players[id] = {
      id,
      name,
      age: null,
      gender: null,
      bio: "No bio set.",
      avatar: "https://i.imgur.com/76pA8gq.jpeg",
      cover: "https://i.imgur.com/76pA8gq.jpeg",
      frame: null,
      wallet: 1000, // Renamed from gold
      bank: 0,
      bankMax: 50000,
      xp: 0,
      level: 1,
      rank: null,
      titles: [],
      badges: [],
      inventory: {},
      equipment: {},
      warnings: [],
      moderation_flags: [],
      achievements: {},
      stats: {},
      createdAt: new Date().toISOString(),
      // Legacy fields to be migrated
      party: [],
      den: [],
      cooldowns: {},
      roles: [],
      banned: false,
      dailyQuest: null,
      guildId: null,
    };
    savePlayers(players);
  } else {
    // --- Data migration for existing players ---
    let needsSave = false;
    const player = players[id];

    // Rename gold to wallet
    if (player.gold !== undefined) {
      player.wallet = player.gold;
      delete player.gold;
      needsSave = true;
    }

    // Add new fields with default values if they don't exist
    const defaultFields = {
      age: null,
      gender: null,
      bio: "No bio set.",
      avatar: "https://i.imgur.com/76pA8gq.jpeg",
      cover: "https://i.imgur.com/76pA8gq.jpeg",
      frame: null,
      wallet: 1000,
      bank: 0,
      bankMax: 50000,
      xp: player.playerXp || 0, // Migrate from old xp
      level: player.playerLevel || 1, // Migrate from old level
      rank: null,
      titles: [],
      badges: [],
      equipment: {},
      warnings: [],
      moderation_flags: [],
      achievements: {},
      stats: {},
      createdAt: new Date().toISOString(),
      inventory: player.inventory || {},
      party: player.party || [],
      den: player.den || [],
      cooldowns: player.cooldowns || {},
      roles: player.roles || [],
      banned: player.banned || false,
      dailyQuest: player.dailyQuest || null,
      guildId: player.guildId || null,
    };

    for (const field in defaultFields) {
      if (player[field] === undefined) {
        player[field] = defaultFields[field];
        needsSave = true;
      }
    }

    // Clean up old level fields
    if (player.playerXp !== undefined) {
      delete player.playerXp;
      needsSave = true;
    }
    if (player.playerLevel !== undefined) {
      delete player.playerLevel;
      needsSave = true;
    }

    if (needsSave) {
      savePlayers(players);
    }
  }
  return players[id];
}

// Update player data
function updatePlayer(player) {
  const players = loadPlayers();
  players[player.id] = player;
  savePlayers(players);
}

function getAllPlayers() {
    return loadPlayers();
}

module.exports = {
  getPlayer,
  updatePlayer,
  getAllPlayers,
};
