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
        player.jid = jid;

        // Ensure progression exists and has all fields
        if (!player.progression) player.progression = {};
        if (player.progression.level === undefined) player.progression.level = 1;
        if (player.progression.xp === undefined) player.progression.xp = 0;
        if (player.progression.wallet === undefined) player.progression.wallet = 100;
        if (player.progression.location === undefined) player.progression.location = "Hatchling Haven";

        // Legacy gold migration
        if (player.gold !== undefined) {
            player.progression.wallet = (player.progression.wallet || 0) + player.gold;
            delete player.gold;
        }
        if (player.progression.gold !== undefined) {
            player.progression.wallet = (player.progression.wallet || 0) + player.progression.gold;
            delete player.progression.gold;
        }

        // Ensure stats exists and has all fields
        if (!player.stats) player.stats = {};
        if (player.stats.health === undefined) player.stats.health = 100;
        if (player.stats.mana === undefined) player.stats.mana = 10;
        if (player.stats.str === undefined) player.stats.str = 5;
        if (player.stats.agi === undefined) player.stats.agi = 5;
        if (player.stats.int === undefined) player.stats.int = 5;
        if (player.stats.battles === undefined) player.stats.battles = 0;
        if (player.stats.wins === undefined) player.stats.wins = 0;
        if (player.stats.quests_done === undefined) player.stats.quests_done = 0;

        // Ensure dragon exists
        if (!player.dragon) player.dragon = { name: "Hatchling", type: "BASIC", level: 1, mood: "HAPPY", skills: ["WeakBite"], stats: { hp: 50, attack: 5, defense: 5, speed: 5, affinity: "NONE" } };

        // Ensure inventory and dragons list exist
        if (!player.inventory) player.inventory = { items: { HealthPotion: 2, DragonTreat: 1 }, equipment: { weapon: "Fists", armor: "Rags", dragon_gear: "None" } };
        if (!player.inventory.dragons) player.inventory.dragons = [];

        // Ensure profile exists
        if (!player.profile) player.profile = { name: name || jid.split('@')[0], join_date: Date.now(), last_daily: 0, notifications: true, text_speed: "normal", language: "en" };

        // --- ADD COMPATIBILITY LAYER ---
        Object.defineProperty(player, 'wallet', {
            get() { return this.progression.wallet; },
            set(v) { this.progression.wallet = v; },
            configurable: true
        });
        Object.defineProperty(player, 'gold', {
            get() { return this.progression.wallet; },
            set(v) { this.progression.wallet = v; },
            configurable: true
        });
        Object.defineProperty(player, 'playerLevel', {
            get() { return this.progression.level; },
            set(v) { this.progression.level = v; },
            configurable: true
        });
        Object.defineProperty(player, 'playerXp', {
            get() { return this.progression.xp; },
            set(v) { this.progression.xp = v; },
            configurable: true
        });

        return player;
    }

    const profile = {
        jid: jid,
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
            equipment: { weapon: "Fists", armor: "Rags", dragon_gear: "None" },
            dragons: []
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

    // --- ADD COMPATIBILITY LAYER ---
    Object.defineProperty(profile, 'wallet', {
        get() { return this.progression.wallet; },
        set(v) { this.progression.wallet = v; },
        configurable: true
    });
    Object.defineProperty(profile, 'gold', {
        get() { return this.progression.wallet; },
        set(v) { this.progression.wallet = v; },
        configurable: true
    });
    Object.defineProperty(profile, 'playerLevel', {
        get() { return this.progression.level; },
        set(v) { this.progression.level = v; },
        configurable: true
    });
    Object.defineProperty(profile, 'playerXp', {
        get() { return this.progression.xp; },
        set(v) { this.progression.xp = v; },
        configurable: true
    });

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
