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
    players[id] = {
      id,
      name,
      gold: 1000,
      bank: 0,
      playerLevel: 1,
      playerXp: 0,
      party: [],
      den: [],
      cooldowns: {},
      inventory: {},
      roles: [],
      banned: false,
      dailyQuest: null,
      guildId: null,
      titles: []
    };
    savePlayers(players);
  } else {
    // Data migration for existing players
    let needsSave = false;
    if (players[id].titles === undefined) {
        players[id].titles = [];
        needsSave = true;
    }
    if (players[id].guildId === undefined) {
        players[id].guildId = null;
        needsSave = true;
    }
    if (players[id].playerLevel === undefined) {
        players[id].playerLevel = 1;
        needsSave = true;
    }
    if (players[id].playerXp === undefined) {
        players[id].playerXp = 0;
        needsSave = true;
    }
    if (players[id].banned === undefined) {
        players[id].banned = false;
        needsSave = true;
    }
    if (players[id].dailyQuest === undefined) {
        players[id].dailyQuest = null;
        needsSave = true;
    }
    ['party', 'den'].forEach(location => {
        if (players[id][location]) {
            players[id][location].forEach(dragon => {
                if (dragon.level === undefined) {
                    dragon.level = 1;
                    needsSave = true;
                }
                if (dragon.xp === undefined) {
                    dragon.xp = 0;
                    needsSave = true;
                }
            });
        }
    });
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
