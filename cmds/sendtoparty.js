module.exports = {
  name: 'sendtoparty',
  description: 'Move a den dragon to party (max 6).',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    if (player.party.length >= 6) return reply('Your party is full (max 6 dragons).');
    const index = parseInt(args[0]) - 1;
    if (isNaN(index) || index < 0 || index >= player.den.length) {
      return reply('Invalid den dragon index.');
    }
    const [dragonToMove] = player.den.splice(index, 1);
    player.party.push(dragonToMove);
    savePlayer();
    await reply(`${dragonToMove.name} has been moved to your party.`);
  },
};
