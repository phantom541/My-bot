const axios = require('axios');

module.exports = {
  name: 'activate-scenario',
  description: 'Spawns a Colossal Beast (Admin only).',
  async execute(context) {
    const { hasRole, reply, activeBeast, from, args, beasts, sock, msg } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    if (activeBeast[from]) return reply('A Colossal Beast is already active.');

    const beastName = args.join(' ');
    const beast = beasts.find(b => b.name.toLowerCase() === beastName.toLowerCase());

    if (!beast) return reply('That Colossal Beast does not exist. Use `%beasts` to see the list.');

    activeBeast[from] = { ...beast };

    try {
        const imageResponse = await axios.get(beast.imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        let caption = `A legendary terror appears!\n\n*${beast.name}*\n\nIt can be challenged with \`%challenge-beast\`. It will vanish in 15 minutes.`;
        await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });
    } catch (error) {
        console.error("Error sending beast image:", error);
        await reply(`A legendary terror appears! *${beast.name}* (Image failed to load)`);
    }

    setTimeout(() => {
        if (activeBeast[from] && activeBeast[from].name === beast.name) {
            delete activeBeast[from];
            sock.sendMessage(from, { text: `The Colossal Beast, ${beast.name}, has vanished.` });
        }
    }, 15 * 60 * 1000);
  },
};
