const dragonToClassMap = require('../dragonToClassMap');

module.exports = {
    name: 'dragon',
    description: 'View a detailed summary of a specific dragon.',
    aliases: ['d'],
    async execute(context) {
        const { args, reply, player, dragons, sock, from, msg } = context;
        const query = args.join(' ').toLowerCase();
        if (!query) return reply('Please specify a dragon name or ID.');

        let dragonData;
        if (!isNaN(query)) {
            dragonData = dragons.find(d => d.id === parseInt(query));
        } else {
            dragonData = dragons.find(d => d.name.toLowerCase() === query);
        }

        if (!dragonData) return reply('Dragon not found in the DragonDex.');

        const dragonClass = dragonToClassMap[dragonData.id] || 'Unknown';

        const partyIndex = player.party.findIndex(d => d.id === dragonData.id);
        const denIndex = player.den.findIndex(d => d.id === dragonData.id);

        let caption = `*Dragon Name:* ${dragonData.name}\n`;
        caption += `*Type:* ${dragonData.type}\n`;
        caption += `*Class:* ${dragonClass}\n`;

        if (partyIndex !== -1) {
            caption += `*Party:* Position ${partyIndex + 1}\n`;
            caption += `*Den:* 0\n`;
        } else if (denIndex !== -1) {
            caption += `*Party:* 0\n`;
            caption += `*Den:* Position ${denIndex + 1}\n`;
        } else {
            caption += `*Party:* Not in party\n`;
            caption += `*Den:* Not in den\n`;
        }

        try {
            await sock.sendMessage(from, { image: { url: dragonData.imageUrl }, caption: caption }, { quoted: msg });
        } catch (error) {
            console.error('Error sending dragon image:', error);
            await reply('Sorry, I couldn\'t fetch the image for that dragon. Here are the details:\n\n' + caption);
        }
    },
};
