const axios = require('axios');

module.exports = {
  name: 'buypack',
  description: 'Buy a pack of 3 random cards for 300 gold.',
  async execute(context) {
    const { player, savePlayer, reply, CARD_PACK_COST, CARD_PACK_SIZE } = context;

    if (player.gold < CARD_PACK_COST) {
      return reply(`You need ${CARD_PACK_COST} gold to buy a card pack, but you only have ${player.gold}.`);
    }

    try {
      // Deduct cost first
      player.gold -= CARD_PACK_COST;

      let receivedCards = [];
      let cardFetchPromises = [];

      for (let i = 0; i < CARD_PACK_SIZE; i++) {
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

      savePlayer();

      let message = `You spent ${CARD_PACK_COST} gold and received a card pack containing:\n\n`;
      receivedCards.forEach(card => {
        message += `- *${card.name}* (Tier: ${card.tier})\n`;
      });

      await reply(message);

    } catch (error) {
      console.error('Error buying card pack:', error);
      // Refund the player if the API call fails
      player.gold += CARD_PACK_COST;
      savePlayer();
      reply('There was an error trying to buy a card pack. Your gold has been refunded.');
    }
  },
};
