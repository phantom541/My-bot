module.exports = {
    name: 'guild-deposit',
    description: 'Deposit gold into your guild treasury.',
    async execute({ reply, player, args }) {
        if (!player.guildId) return reply('❌ You are not in a guild.');

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) return reply('❌ Provide a valid amount.');

        if (player.progression.wallet < amount) return reply('❌ Not enough gold in your wallet.');

        const guild = global.db.guilds[player.guildId];
        player.progression.wallet -= amount;
        guild.wallet += amount;

        await reply(`💰 Deposited ${amount.toLocaleString()} gold into the guild treasury.`);
    }
};
