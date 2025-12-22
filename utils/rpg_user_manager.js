// utils/rpg_user_manager.js

// This file is adapted to use a global DB object loaded and saved by index.js
// and to use CommonJS module syntax.

/**
 * Ensures a player profile exists in the database. If new, creates the default profile.
 * This should run on the first interaction of any new user.
 * @param {string} jid - WhatsApp JID (e.g., '92301...@s.whatsapp.net').
 * @param {string} name - The user's displayed name.
 * @returns {object} The user's profile object.
 */
function ensureUserExists(jid, name) {
    global.db.players = global.db.players || {};
    global.db.sessions = global.db.sessions || {};

    if (global.db.players[jid]) {
        return global.db.players[jid];
    }

    // --- NEW USER ONBOARDING: Create default RPG profile ---
    global.db.players[jid] = {
        profile: {
            name: name || jid.split('@')[0],
            join_date: Date.now(),
            last_daily: 0,
            notifications: true,
            text_speed: "normal",
            language: "en"
        },
        progression: {
            level: 1,
            xp: 0,
            gold: 100, // Starter Gold
            location: "Hatchling Haven",
            total_xp_earned: 0
        },
        stats: {
            health: 100, mana: 10,
            str: 5, agi: 5, int: 5,
            battles: 0, wins: 0, quests_done: 0
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
            items: { "HealthPotion": 2, "DragonTreat": 1 },
            equipment: { weapon: "Fists", armor: "Rags", dragon_gear: "None" }
        },
        quests: { active: [], completed: [] },
        achievements: [],
    };

    // Set initial session state
    global.db.sessions[jid] = { state: "ONBOARDING_START", context: {} };

    // Assuming global.saveDb() is available from index.js
    if(global.saveDb) {
        global.saveDb();
    } else {
        console.error("FATAL: global.saveDb() function is not defined in index.js");
    }
    return global.db.players[jid];
}

/**
 * Retrieves a player's full profile data.
 * @param {string} jid
 * @returns {object|null} The player's profile object, or null if not found.
 */
function getPlayerProfile(jid) {
    return global.db.players?.[jid] || null;
}

/**
 * Retrieves the player's current session state.
 * @param {string} jid
 * @returns {object} The session state object, or a default 'IDLE' state.
 */
function getSessionState(jid) {
    return global.db.sessions?.[jid] || { state: "IDLE", context: {} };
}

module.exports = {
    ensureUserExists,
    getPlayerProfile,
    getSessionState,
};
