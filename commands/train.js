module.exports = {
    name: 'train',
    description: 'Train your primary dragon to gain XP.',
    cooldown: 600, // 10 minutes
    async execute({ reply, player }) {
        const dragons = player.inventory.dragons || [];
        if (dragons.length === 0) return reply('❌ You have no dragons to train!');

        const primary = dragons[0];
        const xpGained = Math.floor(Math.random() * 50) + 20;
        primary.xp = (primary.xp || 0) + xpGained;

        // Level up logic
        const xpNeeded = (primary.level || 1) * 100;
        if (primary.xp >= xpNeeded) {
            primary.level = (primary.level || 1) + 1;
            primary.xp -= xpNeeded;
            return reply(`🔥 *Training Complete!* ${primary.name} gained ${xpGained} XP and leveled up to *Level ${primary.level}*!`);
        }

        await reply(`🔥 *Training Complete!* ${primary.name} gained ${xpGained} XP.`);
    }
};
