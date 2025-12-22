const { ensureUserExists, getPlayerProfile } = require('../../utils/rpg_user_manager.js');

module.exports = {
    name: 'profile',
    aliases: ['p', 'me'],
    description: 'Displays your current Dragon RPG player profile and stats.',
    rpg: true, // Custom tag for RPG commands
    async execute(ctx) {
        const { sender, reply, msg } = ctx;
        const jid = sender; // JID is the unique identifier
        const pushName = msg.pushName;

        // 1. Ensure the user is registered (creates profile if new)
        const profileData = ensureUserExists(jid, pushName);

        // 2. Fetch required data points for the display
        const { profile, progression, stats, dragon } = profileData;

        // --- Determine Next Level XP (Placeholder Logic) ---
        // In a real RPG, this calculation would be complex. For now, we use a simple placeholder.
        const requiredXP = progression.level * progression.level * 100 + 1000;

        // 3. Format the output message
        let message = `✨ **[${profile.name}] Player Profile** ✨\n\n`;

        // A. Progression & Economy
        message += `🗺️ **PROGRESSION & STATS**\n` +
               `  Level: *${progression.level}* (${progression.xp}/${requiredXP} XP)\n` +
               `  💰 Gold: *${progression.gold.toLocaleString()}*\n` +
               `  📍 Location: *${progression.location}*\n` +
               `  ⚔️ Health/Mana: ${stats.health} / ${stats.mana}\n` +
               `  💪 STR: ${stats.str} | AGI: ${stats.agi} | INT: ${stats.int}\n\n`;

        // B. Dragon Companion
        message += `🐲 **DRAGON COMPANION: ${dragon.name}**\n` +
               `  Type: *${dragon.type}* (Lvl ${dragon.level})\n` +
               `  Mood: ${dragon.mood}\n` +
               `  Skills: ${dragon.skills.join(', ')}\n\n`;

        // C. Achievement/Activity
        message += `🏆 **ACHIEVEMENTS & ACTIVITY**\n` +
               `  Battles (W/L): ${stats.wins} / ${stats.battles - stats.wins}\n` +
               `  Quests Completed: ${stats.quests_done}\n` +
               `  Badges: ${profileData.achievements.length > 0 ? profileData.achievements.join(', ') : 'None'}\n`;

        // 4. Send the final profile message
        await reply(message);
    }
};
