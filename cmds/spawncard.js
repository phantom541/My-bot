const axios = require('axios');

module.exports = {
  name: 'spawncard',
  description: 'Spawns a random card.',
  async execute(context) {
    const { sock, from, reply, hasRole, activeCardSpawns, CARD_CLAIM_COST } = context;

    // In the original help, this was a mod command.
    if (!hasRole('mod')) {
        return reply('You do not have permission to use this command.');
    }

    if (activeCardSpawns[from]) {
        return reply('There is already an active card spawn in this chat. Use %claim to get it!');
    }

    try {
        const response = await axios.get('https://aurora-api-ten.vercel.app/card/random');
        const cardData = response.data;

        // Store the card details for the claim command
        activeCardSpawns[from] = {
            id: cardData.id,
            name: cardData.title,
            tier: cardData.tier,
            source: cardData.source,
            imageUrl: cardData.image,
            spawnTime: Date.now(),
        };

        let caption = `A wild card has appeared!\n\n`;
        caption += `*${cardData.title}*\n`;
        caption += `Source: ${cardData.source}\n`;
        caption += `Tier: ${cardData.tier}\n\n`;
        caption += `Use \`%claim\` to add it to your collection! It costs ${CARD_CLAIM_COST} gold.`;

        await sock.sendMessage(from, {
            image: { url: cardData.image },
            caption: caption,
        });

        // Set a timeout for the card to disappear (5 minutes)
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
