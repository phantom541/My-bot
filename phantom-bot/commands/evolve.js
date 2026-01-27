module.exports = {
    name: 'evolve',
    description: 'Evolve a dragon if it meets requirements.',
    async execute({ reply, player, args }) {
        const dragons = player.inventory.dragons || [];
        if (dragons.length === 0) return reply('❌ You have no dragons!');

        const index = parseInt(args[0]) - 1;
        if (isNaN(index) || !dragons[index]) return reply('❌ Specify the dragon number in your party to evolve (e.g., `%evolve 1`).');

        const dragon = dragons[index];
        if (dragon.level < 20) return reply(`❌ ${dragon.name} must be at least Level 20 to evolve!`);

        // Simple evolution by appending "Alpha" for now or similar
        const oldName = dragon.name;
        dragon.name = `Alpha ${dragon.name}`;
        dragon.stats.hp = (dragon.stats.hp || 50) + 50;
        dragon.stats.attack = (dragon.stats.attack || 5) + 10;

        await reply(`✨ *Amazing!* Your ${oldName} has evolved into *${dragon.name}*!`);
    }
};
