const axios = require('axios');

module.exports = {
  name: 'spawncard',
  description: 'Spawns a random card.',
  async execute(context) {
    const { activeCardSpawns, from, reply, GIPHY_API_KEY, sock, msg } = context;
    if (activeCardSpawns[from]) {
        return reply('A card has already been spawned. Use %claim to get it.');
    }

    try {
        let cardToSpawn;
        const spawnType = Math.random() < 0.5 ? 'dragon_card' : 'anime_gif';

        if (spawnType === 'dragon_card') {
            const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?race=Dragon');
            const dragonCards = response.data.data;
            const randomDragonCard = dragonCards[Math.floor(Math.random() * dragonCards.length)];

            cardToSpawn = {
                name: randomDragonCard.name,
                tier: 'Dragon',
                imageUrl: randomDragonCard.card_images[0].image_url,
                type: 'dragon_card'
            };
        } else { // anime_gif
            const searchTerms = ['anime', 'anime fight', 'kawaii', 'chibi'];
            const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
            const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${randomTerm}&limit=50&rating=pg-13`);
            const gifs = response.data.data;
            const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

            cardToSpawn = {
                name: randomGif.title || 'Anime GIF',
                tier: 'Anime',
                imageUrl: randomGif.images.original.url.split('?')[0],
                type: 'anime_gif'
            };
        }

        activeCardSpawns[from] = cardToSpawn;

        const imageResponse = await axios.get(cardToSpawn.imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');

        let caption = `A wild card has appeared!\n\n`;
        caption += `*${cardToSpawn.name}* (Tier: ${cardToSpawn.tier})\n\n`;
        caption += `Use \`%claim\` to add it to your collection!`;

        await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });

    } catch (error) {
        console.error('Error fetching or sending card:', error);
        await reply('Sorry, I could not spawn a card at this time. Please try again later.');
    }
  },
};
