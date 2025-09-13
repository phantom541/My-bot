const axios = require('axios');

module.exports = {
  name: 'dragon',
  description: 'View dragon summary.',
  async execute(context) {
    const { args, reply, player, dragons, sock, from, msg } = context;
    const query = args.join(' ').toLowerCase();
    if (!query) return reply('Please specify a dragon name or ID.');

    let dragon;
    if (!isNaN(query)) {
        dragon = dragons.find(d => d.id === parseInt(query));
    } else {
        dragon = dragons.find(d => d.name.toLowerCase() === query);
    }

    if (!dragon) return reply('Dragon not found.');

    let caption = `*${dragon.name}*\n`;
    caption += `ID: ${dragon.id}\n`;
    caption += `Type: ${dragon.type}\n`;
    caption += '*Moves:*\n';
    dragon.moves.forEach(move => {
        caption += `- ${move.name} (Damage: ${move.damage}, Type: ${move.type})\n`;
    });

    const partyIndex = player.party.findIndex(d => d.id === dragon.id);
    const denIndex = player.den.findIndex(d => d.id === dragon.id);

    if (partyIndex !== -1) {
        caption += `\n*Location:* Party (Position ${partyIndex + 1})`;
    } else if (denIndex !== -1) {
        caption += `\n*Location:* Den (Position ${denIndex + 1})`;
    }

    try {
        const imageUrl = dragon.imageUrl;
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });
    } catch (error) {
        console.error('Error sending dragon image:', error);
        await reply('Sorry, I couldn\'t fetch the image for that dragon. Here are the details:\n\n' + caption);
    }
  },
};
