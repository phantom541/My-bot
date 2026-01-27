const axios = require('axios');

module.exports = {
  name: 'spawncard',
  description: 'Spawns a random card.',
  async execute(context) {
    const { sock, from, reply, hasRole, activeCardSpawns, CARD_CLAIM_COST } = context;

    if (!hasRole('mod')) {
        return reply('You do not have permission to use this command.');
    }

    if (activeCardSpawns[from]) {
        return reply('There is already an active card spawn in this chat. Use %claim to get it!');
    }

    try {
        const response = await axios.get('https://aurora-api-ten.vercel.app/card/random');
        const cardData = response.data;

        activeCardSpawns[from] = {
            id: cardData.id,
            name: cardData.title,
            tier: cardData.tier,
            source: cardData.source,
            imageUrl: cardData.image,
            price: CARD_CLAIM_COST,
            spawnTime: Date.now(),
        };

        let caption = `🃏 *A rare card has appeared!* 🃏\n\n`;
        caption += `*Name:* ${cardData.title}\n`;
        caption += `*Source:* ${cardData.source}\n`;
        caption += `*Tier:* ${cardData.tier}\n\n`;
        caption += `*Price:* ${CARD_CLAIM_COST} wallet\n\n`;
        caption += `Type \`%%claim\` to add it to your deck!`;

        const { sendCardImage } = require('../services/media');
        await sendCardImage(sock, from, activeCardSpawns[from], caption);

        setTimeout(() => {
            if (activeCardSpawns[from] && activeCardSpawns[from].id === cardData.id) {
                delete activeCardSpawns[from];
                sock.sendMessage(from, { text: `The card "${cardData.title}" was not claimed and has disappeared.` });
            }
        }, 5 * 60 * 1000);

    } catch (error) {
        console.error('Error spawning card:', error);
        reply('There was an error trying to spawn a card.');
    }
  },
};
