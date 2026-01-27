const { sendImage } = require('../services/media');

module.exports = {
    name: 'profile',
    aliases: ['p'],
    description: 'View your RPG profile.',
    async execute({ sock, from, player, msg, auth }) {
        const { profile, progression, stats, dragon } = player;

        let caption = `✨ *[ ${profile.name} ] Player Profile* ✨\n\n`;
        caption += `🗺️ *PROGRESSION*\n`;
        caption += `  Level: ${progression.level} (${progression.xp} XP)\n`;
        caption += `  💰 Wallet: ${progression.wallet.toLocaleString()}\n`;
        caption += `  📍 Location: ${progression.location}\n\n`;

        caption += `💪 *STATS*\n`;
        caption += `  ❤️ HP: ${stats.health} | 💧 Mana: ${stats.mana}\n`;
        caption += `  ⚔️ STR: ${stats.str} | 🛡️ DEF: ${stats.agi} | 🧠 INT: ${stats.int}\n\n`;

        caption += `🐲 *DRAGON COMPANION: ${dragon.name}*\n`;
        caption += `  Type: ${dragon.type} (Lvl ${dragon.level})\n`;
        caption += `  Mood: ${dragon.mood}\n\n`;

        caption += `🏆 *ACTIVITY*\n`;
        caption += `  Battles: ${stats.battles} (Wins: ${stats.wins})\n`;
        caption += `  Quests: ${stats.quests_done}\n`;

        const ppUrl = await sock.profilePictureUrl(auth.senderJid, 'image').catch(() => 'https://i.imgur.com/76pA8gq.jpeg');

        await sendImage(sock, from, ppUrl, caption, msg);
    }
};
