module.exports = {
  name: 'start-hunt',
  description: 'Start your adventure and choose a dragon.',
  async execute(context) {
    const { sock, from, msg, player, dragons, config } = context;
    const starterDragonIds = config.gameplay.starterDragonIds;

    if (player.party && player.party.length > 0) {
      return sock.sendMessage(from, { text: 'You have already begun your adventure! Use `%party` to see your dragons.' }, { quoted: msg });
    }

    const starterDragons = starterDragonIds.map(id => dragons.find(d => d.id === id));

    let message = `*Welcome, Dragonbound! Your saga begins now.*\n\n`;
    message += `A path unfolds before you, and with it, a choice. Six young dragons await a partner to raise them. Choose wisely, as this creature will be your first companion in a world of myth and magic.\n\n`;

    starterDragons.forEach(dragon => {
        if (dragon) {
            message += `*${dragon.id}: ${dragon.name}* - [ Type: ${dragon.type} ]\n`;
        }
    });

    message += `\nTo choose your companion, reply with \`%choose <id>\`. For example, \`%choose 3\`.`;

    player.adventureStarted = true;
    require('../database/index').saveDb();

    await sock.sendMessage(from, {
        image: { url: 'https://i.imgur.com/8a6a2e8.jpeg' },
        caption: message
    }, { quoted: msg });
  },
};
