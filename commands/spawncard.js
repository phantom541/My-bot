const cards = require('../database/data/cardData');
const { sendImage } = require('../services/media');
const { saveDb } = require('../database/index');

const activeCardSpawns = new Map();

module.exports = {
    name: 'spawncard',
    description: 'Spawn a random card (Owner Only).',
    ownerOnly: true,
    async execute({ sock, from, msg, config }) {
        // cardData might be an array or object, based on earlier read_file it was an array exported
        const card = cards[Math.floor(Math.random() * cards.length)];
        const claimPrice = config.economy.cardClaimCost;

        activeCardSpawns.set(from, { ...card, claimPrice });

        let caption = `🃏 *A rare card has appeared!* 🃏\n\n`;
        caption += `*Name:* ${card.name}\n`;
        caption += `*Rarity:* ${card.rarity || 'Common'}\n`;
        caption += `*Claim Price:* ${claimPrice.toLocaleString()} gold\n\n`;
        caption += `Type \`%claim\` to add it to your deck!`;

        await sendImage(sock, from, card.imageUrl, caption, msg);
    },
    activeCardSpawns
};
