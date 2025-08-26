// guildData.js
const fs = require('fs');
const path = './guilds.json';

function loadGuilds() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify({}));
    }
    const raw = fs.readFileSync(path);
    return JSON.parse(raw);
}

function saveGuilds(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function getAllGuilds() {
    return loadGuilds();
}

function getGuild(guildId) {
    const guilds = loadGuilds();
    return guilds[guildId];
}

function updateGuild(guildData) {
    const guilds = loadGuilds();
    guilds[guildData.id] = guildData;
    saveGuilds(guilds);
}

function createGuild(guildName, founderPlayer) {
    const guilds = loadGuilds();
    const guildId = `guild_${Date.now()}`;

    if (Object.values(guilds).some(g => g.name.toLowerCase() === guildName.toLowerCase())) {
        return null; // Guild name already exists
    }

    const newGuild = {
        id: guildId,
        name: guildName,
        master: founderPlayer.id,
        officers: [],
        members: [founderPlayer.id],
        joinRequests: [],
        level: 1,
        xp: 0,
    };

    guilds[guildId] = newGuild;
    saveGuilds(guilds);
    return newGuild;
}

module.exports = {
    getAllGuilds,
    getGuild,
    updateGuild,
    createGuild,
};
