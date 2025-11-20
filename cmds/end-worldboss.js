const activeEvents = require('../activeEvents');
const { getPlayer, updatePlayer } = require('../playerData');

module.exports = {
    name: 'end-worldboss',
    description: 'Ends the world boss event and distributes rewards (Owner only).',
    async execute(context) {
        const { sock, from, isOwner } = context;

        if (!isOwner) return;

        const events = activeEvents.get();
        const boss = events.worldBoss;
        if (!boss) {
            return sock.sendMessage(from, { text: 'There is no world boss event to end.' });
        }

        if (boss.hp > 0) {
            return sock.sendMessage(from, { text: `The ${boss.name} is not defeated yet! It still has ${boss.hp} HP.` });
        }

        let rewardsMessage = `*The ${boss.name} has been vanquished!* 🏆\n\nRewards have been distributed to all brave warriors who participated:\n\n`;

        for (const playerId in boss.participants) {
            const player = getPlayer(playerId);
            if (player) {
                // Give rewards
                player.gold += boss.rewards.gold;
                for (const itemId in boss.rewards.items) {
                    player.inventory[itemId] = (player.inventory[itemId] || 0) + boss.rewards.items[itemId];
                }
                if (boss.rewards.title) {
                    player.titles.push(boss.rewards.title);
                }
                updatePlayer(player);
                rewardsMessage += `- ${player.name} received gold, items, and the "${boss.rewards.title}" title!\n`;
            }
        }

        // Reset the world boss
        events.worldBoss = null;
        activeEvents.save();

        await sock.sendMessage(from, { text: rewardsMessage });
    },
};
