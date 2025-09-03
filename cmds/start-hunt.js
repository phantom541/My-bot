const axios = require('axios');

module.exports = {
  name: 'start-hunt',
  description: 'Start your adventure and choose a dragon.',
  async execute(context) {
    const { player, reply, dragons, STARTER_DRAGON_IDS, args, savePlayer, sock, from, msg } = context;
    if (player.party.length > 0 || player.den.length > 0) {
        return reply('You have already started your hunt! You can only choose one starter dragon.');
    }

    const starterDragons = dragons.filter(d => STARTER_DRAGON_IDS.includes(d.id));

    if (args.length === 0) {
        let huntList = '*Welcome to the Dragon Hunt!* Choose your starter dragon:\n\n';
        starterDragons.forEach(d => {
            huntList += `*${d.name}* (Type: ${d.type})\n`;
        });
        huntList += `\nTo see more details about a dragon, use \`%start-hunt --<dragon_name>\`.`;
        huntList += `\nTo choose your starter, use \`%start-hunt --<dragon_name> --choose\`.`;
        return reply(huntList);
    }

    const dragonNameArg = args.find(a => a.startsWith('--') && a !== '--choose');
    if (dragonNameArg) {
        const dragonName = dragonNameArg.slice(2).replace(/_/g, ' ');
        const selectedDragon = starterDragons.find(d => d.name.toLowerCase() === dragonName.toLowerCase());

        if (!selectedDragon) {
            return reply('Invalid starter dragon name.');
        }

        if (args.includes('--choose')) {
            const newDragon = { ...selectedDragon, level: 5, xp: 0 };
            player.party.push(newDragon);
            savePlayer();
            return reply(`Congratulations! You have chosen ${selectedDragon.name} as your starter dragon!`);
        } else {
            try {
                const imageUrl = selectedDragon.imageUrl;
                const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(response.data, 'binary');

                let caption = `*${selectedDragon.name}*\n`;
                caption += `Type: ${selectedDragon.type}\n`;
                caption += '*Moves:*\n';
                selectedDragon.moves.forEach(move => {
                    caption += `- ${move.name} (Damage: ${move.damage}, Type: ${move.type})\n`;
                });
                caption += `\nTo choose this dragon, use \`%start-hunt --${dragonNameArg.slice(2)} --choose\`.`;

                await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });
            } catch (error) {
                console.error('Error sending dragon image:', error);
                await reply('Sorry, I couldn\'t fetch the image for that dragon. Please try again.');
            }
            return;
        }
    }
  },
};
