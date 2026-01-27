const { saveDb } = require('../database/index');

function ensureStructures() {
    if (!global.db) throw new Error("Database not initialized");
    if (!global.db.players) global.db.players = {};
    if (!global.db.sessions) global.db.sessions = {};
}

function normalizeJid(jid) {
    if (!jid) return jid;
    return jid.toString().trim().replace('+', '');
}

function ensureUserExists(jid, name) {
    ensureStructures();
    jid = normalizeJid(jid);

    if (global.db.players[jid]) {
        // Migration/Repair of existing player data if fields are missing
        const player = global.db.players[jid];
        if (!player.progression) player.progression = { level: 1, xp: 0, wallet: 100, location: "Hatchling Haven" };
        if (player.gold !== undefined) {
            player.progression.wallet = (player.progression.wallet || 0) + player.gold;
            delete player.gold;
        }
        if (player.progression.gold !== undefined) {
            player.progression.wallet = (player.progression.wallet || 0) + player.progression.gold;
            delete player.progression.gold;
        }
        if (!player.stats) player.stats = { health: 100, mana: 10, str: 5, agi: 5, int: 5, battles: 0, wins: 0, quests_done: 0 };
        if (!player.dragon) player.dragon = { name: "Hatchling", type: "BASIC", level: 1, mood: "HAPPY", skills: ["WeakBite"], stats: { hp: 50, attack: 5, defense: 5, speed: 5, affinity: "NONE" } };
        if (!player.inventory) player.inventory = { items: { HealthPotion: 2, DragonTreat: 1 }, equipment: { weapon: "Fists", armor: "Rags", dragon_gear: "None" } };
        if (!player.profile) player.profile = { name: name || jid.split('@')[0], join_date: Date.now(), last_daily: 0, notifications: true, text_speed: "normal", language: "en" };

        return player;
    }

    const profile = {
        profile: {
            name: name || jid.split("@")[0],
            join_date: Date.now(),
            last_daily: 0,
            notifications: true,
            text_speed: "normal",
            language: "en"
        },
        progression: {
            level: 1,
            xp: 0,
            wallet: 100, // Starter wallet
            location: "Hatchling Haven",
            total_xp_earned: 0
        },
        stats: {
            health: 100,
            mana: 10,
            str: 5,
            agi: 5,
            int: 5,
            battles: 0,
            wins: 0,
            quests_done: 0
        },
        dragon: {
            name: "Hatchling",
            type: "BASIC",
            level: 1,
            mood: "HAPPY",
            skills: ["WeakBite"],
            stats: { hp: 50, attack: 5, defense: 5, speed: 5, affinity: "NONE" }
        },
        inventory: {
            items: { HealthPotion: 2, DragonTreat: 1 },
            equipment: { weapon: "Fists", armor: "Rags", dragon_gear: "None" }
        },
        quests: { active: [], completed: [] },
        achievements: [],
        cards: [],
        deck: [],
        holder: []
    };

    global.db.players[jid] = profile;

    if (!global.db.sessions[jid]) {
        global.db.sessions[jid] = { state: "IDLE", context: {} };
    }

    saveDb();

    return profile;
}

function getPlayerProfile(jid) {
    ensureStructures();
    jid = normalizeJid(jid);
    return global.db.players[jid] || null;
}

function getSessionState(jid) {
    ensureStructures();
    jid = normalizeJid(jid);
    return global.db.sessions[jid] || { state: "IDLE", context: {} };
}

function updateSessionState(jid, state, context = {}) {
    ensureStructures();
    jid = normalizeJid(jid);
    global.db.sessions[jid] = { state, context };
    saveDb();
}

module.exports = {
    ensureUserExists,
    getPlayerProfile,
    getSessionState,
    updateSessionState,
    normalizeJid
};
