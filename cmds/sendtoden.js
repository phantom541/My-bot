module.exports = {
  name: 'sendtoden',
  description: 'Move a party dragon to den.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const index = parseInt(args[0]) - 1;
    if (isNaN(index) || index < 0 || index >= player.party.length) {
      return reply('Invalid party dragon index.');
    }
    const [dragonToMove] = player.party.splice(index, 1);
    player.den.push(dragonToMove);
    savePlayer();
    await reply(`${dragonToMove.name} has been moved to your den.`);
  },
};
