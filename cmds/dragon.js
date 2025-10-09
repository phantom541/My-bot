const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = {
  name: 'dragon',
  description: 'View a detailed summary of a specific dragon.',
  async execute(context) {
    const { args, reply, player, dragons, sock, from, msg } = context;
    const query = args.join(' ').toLowerCase();
    if (!query) {
      return reply('Please specify a dragon name or ID to view its details.');
    }

    let dragon;
    if (!isNaN(query)) {
        // Find by ID
        dragon = dragons.find(d => d.id === parseInt(query));
    } else {
        // Find by partial name match, making it easier for users
        dragon = dragons.find(d => d.name.toLowerCase().includes(query));
    }

    if (!dragon) {
      return reply(`I couldn't find a dragon matching "${query}". Please check the name or ID.`);
    }

    let caption = `*${dragon.name}* (ID: ${dragon.id})\n`;
    caption += `Type: ${dragon.type}\n\n`;
    caption += '*Moves:*\n';
    dragon.moves.forEach(move => {
        caption += ` • ${move.name} (Damage: ${move.damage}, Type: ${move.type})\n`;
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

        const ravenLogoPath = path.join(__dirname, '..', 'assets', 'ravenlogo.png');
        let thumbnail;
        try {
            const thumbRaw = fs.readFileSync(ravenLogoPath);
            if (thumbRaw.length > 0) {
                 thumbnail = await sharp(thumbRaw).resize(100, 100).png().toBuffer();
            } else {
                thumbnail = null;
            }
        } catch(e) {
            console.error("Could not read or process logo for dragon command, skipping thumbnail.", e);
            thumbnail = null;
        }

        await sock.sendMessage(from, {
            image: imageBuffer,
            caption: caption,
            contextInfo: thumbnail ? {
                externalAdReply: {
                    title: `🐉 ${dragon.name} 🐉`,
                    body: `A powerful ${dragon.type}-type dragon.`,
                    thumbnail,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            } : undefined
        }, { quoted: msg });

    } catch (error) {
        console.error(`Error sending image for dragon "${dragon.name}":`, error.message);
        // If image sending fails, send the text details as a fallback
        await reply('Sorry, I couldn\'t fetch the image for that dragon. Here are the details:\n\n' + caption);
    }
  },
};