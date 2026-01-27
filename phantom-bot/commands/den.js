module.exports = {
  name: 'den',
  description: 'View your dragon den (storage).',
  async execute(context) {
    const { reply, player } = context;
    if (player.den.length === 0) return reply('Your den is empty.');
    let denList = '*Your Den:*\n\n';
    player.den.forEach((d, i) => {
      denList += `${i + 1}. *${d.name}* (Type: ${d.type})\n`;
    });
    await reply(denList);
  },
};
