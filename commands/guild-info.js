module.exports = {
    name: 'guild-info',
    description: 'View information about your guild.',
    async execute({ reply, player }) {
        const guildId = player.guildId;
        if (!guildId) return reply('❌ You are not in a guild.');

        const guild = global.db.guilds[guildId];
        if (!guild) return reply('❌ Guild data not found.');

        let text = `🏰 *Guild: ${guild.name}* 🏰\n\n`;
        text += `👑 *Owner:* ${guild.owner.split('@')[0]}\n`;
        text += `👥 *Members:* ${guild.members.length}\n`;
        text += `📈 *Level:* ${guild.level} (${guild.xp} XP)\n`;
        text += `💰 *Treasury:* ${guild.wallet.toLocaleString()} gold`;

        await reply(text);
    }
};
