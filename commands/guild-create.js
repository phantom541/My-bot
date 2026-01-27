module.exports = {
    name: 'guild-create',
    description: 'Create a new guild (Costs 10,000 gold).',
    async execute({ reply, player, args, config }) {
        const cost = config.economy.guildCreateCost;
        if (player.progression.wallet < cost) {
            return reply(`❌ You need ${cost.toLocaleString()} gold to create a guild!`);
        }

        const name = args.join(' ');
        if (!name) return reply('❌ Please provide a name for your guild.');

        if (player.guildId) return reply('❌ You are already in a guild!');

        const guildId = `guild_${Date.now()}`;
        global.db.guilds[guildId] = {
            id: guildId,
            name: name,
            owner: player.jid || player.id,
            members: [player.jid || player.id],
            level: 1,
            xp: 0,
            wallet: 0
        };

        player.guildId = guildId;
        player.progression.wallet -= cost;

        await reply(`🏰 *Congratulations!* You have founded the guild: *${name}*!`);
    }
};
