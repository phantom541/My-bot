module.exports = {
    name: 'party',
    description: 'View your active dragon party.',
    async execute({ reply, player }) {
        const dragons = player.inventory.dragons || [];
        if (dragons.length === 0) return reply('❌ You have no dragons in your party!');

        let text = `🐉 *Active Party* 🐉\n\n`;
        dragons.slice(0, 6).forEach((d, i) => {
            text += `${i + 1}. *${d.name}* (Lvl ${d.level || 1})\n`;
            text += `   HP: ${d.stats?.hp || 50} | Type: ${d.type}\n`;
            if (d.moves) {
                text += `   Moves: ${d.moves.map(m => m.name).join(', ')}\n`;
            }
            text += `\n`;
        });

        await reply(text);
    }
};
