const { saveDb } = require('../database/index');
const spawnCmd = require('./spawn');

module.exports = {
    name: 'catch',
    description: 'Try to catch a spawned dragon.',
    async execute({ sock, from, player, msg }) {
        const dragon = spawnCmd.activeSpawns.get(from);
        if (!dragon) {
            return sock.sendMessage(from, { text: '❌ No wild dragon here to catch!' }, { quoted: msg });
        }

        // Logic for catching (simplified for now)
        const success = Math.random() > 0.3;

        if (success) {
            spawnCmd.activeSpawns.delete(from);

            player.inventory.dragons = player.inventory.dragons || [];
            player.inventory.dragons.push({
                ...dragon,
                level: 1,
                xp: 0,
                capturedAt: Date.now()
            });
            saveDb();

            await sock.sendMessage(from, { text: `🎉 *Congratulations!* You caught the ${dragon.name}!` }, { quoted: msg });
        } else {
            await sock.sendMessage(from, { text: `💨 The ${dragon.name} resisted your attempt!` }, { quoted: msg });
        }
    }
};
