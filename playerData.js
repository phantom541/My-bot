const { ensureUserExists, getPlayerProfile } = require('./utils/rpg_user_manager');
const { saveDb } = require('./database/index');

function getPlayer(id, name) {
    return ensureUserExists(id, name);
}

function updatePlayer(player) {
    global.db.players[player.id || player.jid] = player;
    saveDb();
}

function getAllPlayers() {
    return global.db.players;
}

module.exports = {
    getPlayer,
    updatePlayer,
    getAllPlayers,
};
