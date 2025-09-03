module.exports = {
  name: 're-roll',
  description: 'Re-rolls a dragon\'s moves (owner/mod only).',
  async execute(context) {
    const { hasRole, reply, args, player, savePlayer, dragons } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');

    const dragonIndex = parseInt(args[0]) - 1;
    if (isNaN(dragonIndex) || dragonIndex < 0 || dragonIndex >= player.party.length) {
        return reply('Invalid dragon index.');
    }

    const dragon = player.party[dragonIndex];
    const fullDragonData = dragons.find(d => d.id === dragon.id);

    if (!fullDragonData) {
        return reply('Could not find the full data for this dragon.');
    }

    const getRandomMoves = (moveset, count) => {
        const shuffled = moveset.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const allMoves = fullDragonData.moveset || fullDragonData.moves;
    dragon.moves = getRandomMoves(allMoves, 4);
    savePlayer();

    await reply(`You have re-rolled the moves for your ${dragon.name}.`);
  },
};
