const dragons = require('../database/data/dragonData');
const cards = require('../database/data/cardData');
const { sendDragonImage, sendCardImage } = require('./media');
const spawnCmd = require('../commands/spawn');
const spawnCardCmd = require('../commands/spawncard');

/**
 * Initializes autonomous spawners for dragons and cards.
 */
function initSpawners(sock) {
    // Wild Dragon Spawner - every 10 minutes
    setInterval(async () => {
        const groupSettings = global.db.groupSettings || {};
        for (const [groupId, settings] of Object.entries(groupSettings)) {
            if (settings.wild) {
                try {
                    const dragon = dragons[Math.floor(Math.random() * dragons.length)];
                    spawnCmd.activeSpawns.set(groupId, dragon);

                    const caption = `⚠️ *A wild ${dragon.name} has appeared!* ⚠️\n\nType \`%catch\` to try and capture it!`;
                    await sendDragonImage(sock, groupId, dragon, caption);
                } catch (err) {
                    console.error(`[SPAWNER] Error spawning dragon in ${groupId}:`, err);
                }
            }
        }
    }, 10 * 60 * 1000);

    // Wild Card Spawner - every 20 minutes
    setInterval(async () => {
        const groupSettings = global.db.groupSettings || {};
        for (const [groupId, settings] of Object.entries(groupSettings)) {
            if (settings.wildcard) {
                try {
                    const card = cards[Math.floor(Math.random() * cards.length)];
                    const claimPrice = 100; // Default claim price
                    spawnCardCmd.activeCardSpawns.set(groupId, { ...card, claimPrice });

                    let caption = `🃏 *A wild card has appeared!* 🃏\n\n`;
                    caption += `*Name:* ${card.name}\n`;
                    caption += `*Rarity:* ${card.rarity || 'Common'}\n`;
                    caption += `*Claim Price:* ${claimPrice.toLocaleString()} wallet\n\n`;
                    caption += `Type \`%claim\` to add it to your deck!`;

                    await sendCardImage(sock, groupId, card, caption);
                } catch (err) {
                    console.error(`[SPAWNER] Error spawning card in ${groupId}:`, err);
                }
            }
        }
    }, 20 * 60 * 1000);
}

module.exports = { initSpawners };
