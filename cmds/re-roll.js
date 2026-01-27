function getRandomMoves(dragon, allDragonsData) {
  const dragonType = dragon.type;
  // Get all moves from all dragons of the same type
  const allMovesOfType = allDragonsData
    .filter(d => d.type === dragonType)
    .flatMap(d => d.moves);

  // Get unique moves by name
  const uniqueMoves = [...new Map(allMovesOfType.map(m => [m.name, m])).values()];

  const newMoves = [];
  const numMovesToSelect = Math.min(4, uniqueMoves.length);

  // Shuffle and pick the first 4
  const shuffledMoves = uniqueMoves.sort(() => 0.5 - Math.random());
  return shuffledMoves.slice(0, numMovesToSelect);
}

module.exports = {
  name: 're-roll',
  description: "Re-roll a dragon's moves (owner/mod only).",
  async execute(context) {
    const { args, player, savePlayer, reply, hasRole, dragons } = context;

    if (!hasRole('mod')) {
      return reply('You do not have permission to use this command.');
    }

    const dragonIndex = parseInt(args[0]) - 1;

    if (isNaN(dragonIndex) || !player.party || dragonIndex < 0 || dragonIndex >= player.party.length) {
      return reply('Invalid dragon number. Check your party with %party.');
    }

    const dragonToReRoll = player.party[dragonIndex];
    const oldMoves = dragonToReRoll.moves.map(m => m.name).join(', ');

    dragonToReRoll.moves = getRandomMoves(dragonToReRoll, dragons);
    savePlayer();

    const newMoves = dragonToReRoll.moves.map(m => m.name).join(', ');

    await reply(`${dragonToReRoll.name}'s moves have been re-rolled!\n\nOld: ${oldMoves}\nNew: ${newMoves}`);
  },
};
