module.exports = {
  name: 'nickname',
  description: 'Give your dragon a nickname.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const dragonIndex = parseInt(args[0]) - 1;
    const newName = args.slice(1).join(' ');

    if (isNaN(dragonIndex) || dragonIndex < 0 || dragonIndex >= player.party.length) {
        return reply('Invalid dragon index.');
    }
    if (!newName) return reply('Please provide a new name.');

    const dragon = player.party[dragonIndex];
    const oldName = dragon.name;
    dragon.name = newName;
    savePlayer();

    await reply(`You have renamed your ${oldName} to ${newName}.`);
  },
};
