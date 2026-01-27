module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'View the top players by wealth.',
    async execute({ reply }) {
        const players = Object.values(global.db.players);
        const sorted = players
            .map(p => ({
                name: p.profile?.name || 'Unknown',
                wealth: (p.progression?.wallet || 0) + (p.bank || 0)
            }))
            .sort((a, b) => b.wealth - a.wealth)
            .slice(0, 10);

        let lbText = `🏆 *DragonBound Leaderboard* 🏆\n\n`;
        sorted.forEach((p, i) => {
            lbText += `${i + 1}. *${p.name}* - ${p.wealth.toLocaleString()} gold\n`;
        });

        await reply(lbText);
    }
};
