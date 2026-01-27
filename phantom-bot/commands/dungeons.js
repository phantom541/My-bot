module.exports = {
    name: 'dungeons',
    description: 'View available dungeons.',
    async execute(context) {
        const { sock, from, msg, dungeonTiers } = context;

        let dungeonList = '*⚔️ Available Dungeons ⚔️*\n\n';
        dungeonList += 'Here are the dungeons you can explore:\n\n';

        for (const tier in dungeonTiers) {
            const dungeon = dungeonTiers[tier];
            dungeonList += `*${dungeon.name}* (Tier ${tier})\n`;
            dungeonList += `  - Floors: ${dungeon.floors}\n`;
            dungeonList += `  - Gold Reward: ${dungeon.rewards.gold}\n\n`;
        }

        dungeonList += 'Use `%spawn-dungeon <tier>` to start a dungeon.';

        try {
            await sock.sendMessage(from, {
                image: { url: 'https://i.imgur.com/8a6a2e8.jpeg' },
                caption: dungeonList
            }, { quoted: msg });
        } catch (error) {
            console.error("Error sending dungeons list:", error);
            await sock.sendMessage(from, { text: dungeonList }, { quoted: msg });
        }
    },
};
