const axios = require('axios');

module.exports = {
  name: 'buypack',
  description: 'Buy a pack of 3 random cards.',
  async execute(context) {
    const { player, CARD_PACK_COST, reply, CARD_PACK_SIZE, GIPHY_API_KEY, savePlayer } = context;
    if (player.gold < CARD_PACK_COST) {
        return reply(`You need ${CARD_PACK_COST} gold to buy a card pack. You only have ${player.gold}.`);
    }

    player.gold -= CARD_PACK_COST;
    await reply(`You spent ${CARD_PACK_COST} gold and bought a card pack! Fetching your cards...`);

    const newCards = [];
    try {
        for (let i = 0; i < CARD_PACK_SIZE; i++) {
            let cardToSpawn;
            const spawnType = Math.random() < 0.5 ? 'dragon_card' : 'anime_gif';

            if (spawnType === 'dragon_card') {
                const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?race=Dragon');
                const dragonCards = response.data.data;
                const randomDragonCard = dragonCards[Math.floor(Math.random() * dragonCards.length)];
                cardToSpawn = { name: randomDragonCard.name, tier: 'Dragon', imageUrl: randomDragonCard.card_images[0].image_url, type: 'dragon_card' };
            } else {
                const searchTerms = ['anime', 'anime fight', 'kawaii', 'chibi'];
                const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
                const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${randomTerm}&limit=50&rating=pg-13`);
                const gifs = response.data.data;
                const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
                cardToSpawn = { name: randomGif.title || 'Anime GIF', tier: 'Anime', imageUrl: randomGif.images.original.url.split('?')[0], type: 'anime_gif' };
            }
            newCards.push(cardToSpawn);

            if (player.deck.length < 12) {
                player.deck.push(cardToSpawn);
            } else {
                player.holder.push(cardToSpawn);
            }
        }

        savePlayer();

        let packContents = 'Your new pack contains:\n\n';
        newCards.forEach(card => {
            packContents += `- ${card.name} (Tier: ${card.tier})\n`;
        });
        packContents += '\nThese have been added to your collection.';
        await reply(packContents);

    } catch (error) {
        console.error('Error fetching card pack:', error);
        player.gold += CARD_PACK_COST; // Refund on error
        savePlayer();
        await reply('Sorry, there was an error creating your card pack. Your gold has been refunded.');
    }
  },
};
