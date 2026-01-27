const axios = require('axios');

module.exports = {
  name: 'buypack',
  description: 'Buy a pack of 3 random cards for 300 gold.',
  async execute(context) {
    const { player, reply, config, sock, from } = context;
    const { cardPackCost, cardPackSize } = config.economy;

    if (player.gold < cardPackCost) {
      return reply(`You need ${cardPackCost} gold to buy a card pack, but you only have ${player.gold}.`);
    }

    try {
      // Deduct cost first
      player.gold -= cardPackCost;

      let receivedCards = [];
      let cardFetchPromises = [];

      for (let i = 0; i < cardPackSize; i++) {
        cardFetchPromises.push(axios.get('https://aurora-api-ten.vercel.app/card/random'));
      }

      const responses = await Promise.all(cardFetchPromises);

      // Add cards to player's collection
      if (!player.pc) {
        player.pc = [];
      }

      responses.forEach(response => {
        const cardData = response.data;
        const newCard = {
          id: cardData.id,
          name: cardData.title,
          tier: cardData.tier,
          source: cardData.source,
          imageUrl: cardData.image,
        };
        player.pc.push(newCard);
        receivedCards.push(newCard);
      });

      require('../database/index').saveDb();

      let message = `You spent ${cardPackCost} gold and received a card pack containing:\n\n`;
      receivedCards.forEach(card => {
        message += `- *${card.name}* (Tier: ${card.tier})\n`;
      });

      await reply(message);

      const { sendCardImage } = require('../services/media');
      for (const card of receivedCards) {
        await sendCardImage(sock, from, card, `🃏 Pulled: *${card.name}* (${card.tier})`);
      }

    } catch (error) {
      console.error('Error buying card pack:', error);
      // Refund the player if the API call fails
      player.gold += cardPackCost;
      require('../database/index').saveDb();
      reply('There was an error trying to buy a card pack. Your gold has been refunded.');
    }
  },
};
