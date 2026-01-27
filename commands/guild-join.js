module.exports = {
    name: 'guild-join',
    description: 'Join a guild by its name.',
    async execute({ reply, player, args }) {
        if (player.guildId) return reply('❌ You are already in a guild!');

        const name = args.join(' ');
        if (!name) return reply('❌ Provide the guild name.');

        const guild = Object.values(global.db.guilds).find(g => g.name.toLowerCase() === name.toLowerCase());
        if (!guild) return reply('❌ Guild not found.');

        guild.members.push(player.jid || player.id);
        player.guildId = guild.id;

        await reply(`✅ Successfully joined the guild: *${guild.name}*!`);
    }
};
