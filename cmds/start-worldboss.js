const worldBosses = require('../worldBossData');
const activeEvents = require('../activeEvents');

module.exports = {
    name: 'start-worldboss',
    description: 'Starts a server-wide world boss event (Owner only).',
    async execute(context) {
        const { sock, from, args, isOwner } = context;

        if (!isOwner) return;

        const events = activeEvents.get();
        if (events.worldBoss) {
            return sock.sendMessage(from, { text: 'A world boss is already active!' });
        }

        const bossId = args[0];
        if (!bossId || !worldBosses[bossId]) {
            return sock.sendMessage(from, { text: `Invalid boss ID. Available bosses: ${Object.keys(worldBosses).join(', ')}` });
        }

        const bossData = worldBosses[bossId];
        events.worldBoss = {
            ...bossData,
            hp: bossData.hp, // Ensure HP is set to max
            participants: {}, // Track damage from each player
        };
        activeEvents.save();

        const announcement = `*A World Boss has appeared!* 🔥\n\nAll players, unite to defeat the mighty *${bossData.name}*!\n\nUse the command \`%attack-boss\` to deal damage. Great rewards await all who participate!`;

        // Announce in the current channel
        try {
            await sock.sendMessage(from, {
                image: { url: bossData.imageUrl },
                caption: announcement,
            });
        } catch (e) {
            await sock.sendMessage(from, { text: announcement });
        }
    },
};
