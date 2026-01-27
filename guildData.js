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
    const guild = guilds[guildId];
    if (!guild) return null;

    // Data migration for existing guilds
    let needsSave = false;
    const defaults = {
        slogan: "A new guild, ready for adventure!",
        vice_leader: null,
        officers: [],
        joinRequests: [],
        level: 1,
        xp: 0,
        tier: "Bronze",
        perks: { xp_boost: 0, loot_bonus: 0 },
        treasury: 0,
        bank_reserve: 0,
        card_vault: [],
        achievements: []
    };

    for (const key in defaults) {
        if (guild[key] === undefined) {
            guild[key] = defaults[key];
            needsSave = true;
        }
    }

    if (needsSave) {
        updateGuild(guild);
    }

    return guild;
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
        slogan: "A new guild, ready for adventure!",
        master: founderPlayer.id,
        vice_leader: null,
        officers: [],
        members: [founderPlayer.id],
        joinRequests: [],
        level: 1,
        xp: 0,
        tier: "Bronze",
        perks: { xp_boost: 0, loot_bonus: 0 },
        treasury: 0,
        bank_reserve: 0,
        card_vault: [],
        achievements: []
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
