const { saveDb } = require('../database/index');
const spawnCardCmd = require('./spawncard');

module.exports = {
    name: 'claim',
    description: 'Claim a spawned card.',
    async execute({ sock, from, player, msg }) {
        const spawn = spawnCardCmd.activeCardSpawns.get(from);
        if (!spawn) {
            return sock.sendMessage(from, { text: '❌ No card here to claim!' }, { quoted: msg });
        }

        if (player.progression.wallet < spawn.claimPrice) {
            return sock.sendMessage(from, { text: `❌ You need ${spawn.claimPrice} gold in your wallet to claim this!` }, { quoted: msg });
        }

        player.progression.wallet -= spawn.claimPrice;
        player.cards = player.cards || [];
        player.cards.push({
            name: spawn.name,
            imageUrl: spawn.imageUrl,
            rarity: spawn.rarity,
            id: spawn.id || Date.now()
        });

        spawnCardCmd.activeCardSpawns.delete(from);
        saveDb();

        await sock.sendMessage(from, { text: `✅ *Success!* You claimed "${spawn.name}" for ${spawn.claimPrice.toLocaleString()} gold.` }, { quoted: msg });
    }
};
