const axios = require('axios');

module.exports = {
  name: 'spawn-dungeon',
  description: 'Spawns a dungeon (Admin only).',
  async execute(context) {
    const { hasRole, reply, args, activeDungeons, from, dungeonTiers, generateDungeon, monsters, sock, msg } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');
    if (activeDungeons[from]) return reply('A dungeon is already active in this group.');

    const difficulty = args.join('');
    const difficulties = Object.keys(dungeonTiers);
    const requestedDifficulty = difficulties.find(d => d.toLowerCase() === difficulty.toLowerCase());

    if (!difficulty || !requestedDifficulty) {
        return reply(`Invalid difficulty. Use one of: ${difficulties.join(', ')}`);
    }

    const newDungeon = generateDungeon(requestedDifficulty, monsters);
    if (!newDungeon) {
        return reply('There was an error generating the dungeon. Please check the logs.');
    }

    activeDungeons[from] = {
        ...newDungeon,
        party: [],
        floor: 1,
        monstersDefeated: 0,
        status: 'forming',
        startTime: Date.now()
    };

    const dungeonInfo = activeDungeons[from];
    const imageUrl = dungeonInfo.environment.bgUrl;

    try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        let caption = `A dungeon has appeared!\n\n*${dungeonInfo.name}* (Difficulty: ${dungeonInfo.difficulty})\n\nGuild members can use \`%enter-dungeon\` to join the party! It will disappear in 5 minutes.`;
        await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });
    } catch (error) {
        console.error("Error sending dungeon image:", error);
        await reply(`A dungeon has appeared! *${dungeonInfo.name}* (Image failed to load)`);
    }

    setTimeout(() => {
        if (activeDungeons[from] && activeDungeons[from].status === 'forming') {
            delete activeDungeons[from];
            sock.sendMessage(from, { text: `The dungeon "${dungeonInfo.name}" was not started in time and has vanished.` });
        }
    }, 5 * 60 * 1000);
  },
};
