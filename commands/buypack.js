const cards = require('../database/data/cardData');
const { sendImage } = require('../services/media');

module.exports = {
    name: 'buypack',
    description: 'Buy a 3-card pack (300 gold).',
    async execute({ sock, from, player, config, msg, reply }) {
        const cost = config.economy.cardPackCost;
        if (player.progression.wallet < cost) {
            return reply(`❌ You need ${cost.toLocaleString()} gold to buy a pack!`);
        }

        player.progression.wallet -= cost;
        const packSize = config.economy.cardPackSize;
        const pulledCards = [];

        for (let i = 0; i < packSize; i++) {
            const card = cards[Math.floor(Math.random() * cards.length)];
            pulledCards.push(card);
            player.cards = player.cards || [];
            player.cards.push({ ...card, id: Date.now() + i });
        }

        await reply(`🎁 Opening your card pack... Pulled ${packSize} cards!`);

        for (const card of pulledCards) {
            await sendImage(sock, from, card.imageUrl, `🃏 Pulled: *${card.name}* (${card.rarity || 'Common'})`, msg);
        }
    }
};
