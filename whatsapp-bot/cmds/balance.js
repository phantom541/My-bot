module.exports = {
  name: 'balance',
  aliases: ['bal'],
  description: 'Checks your gold and bank balance.',
  async execute(context) {
    const { reply, player } = context;
    await reply(`Gold: ${player.gold}\nBank: ${player.bank}`);
  },
};
