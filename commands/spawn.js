const dragons = require('../database/data/dragonData');
const { sendImage } = require('../services/media');
const { saveDb } = require('../database/index');

// In-memory store for active spawns in groups
const activeSpawns = new Map();

module.exports = {
    name: 'spawn',
    description: 'Spawn a random dragon (Owner Only).',
    ownerOnly: true,
    async execute({ sock, from, msg }) {
        const dragon = dragons[Math.floor(Math.random() * dragons.length)];
        activeSpawns.set(from, dragon);

        const caption = `⚠️ *A wild ${dragon.name} has appeared!* ⚠️\n\nType \`%catch\` to try and capture it!`;
        await sendImage(sock, from, dragon.imageUrl, caption, msg);

        // Auto-despawn after 5 mins
        setTimeout(() => {
            if (activeSpawns.get(from) === dragon) {
                activeSpawns.delete(from);
            }
        }, 5 * 60 * 1000);
    },
    // Exporting activeSpawns for catch command
    activeSpawns
};
