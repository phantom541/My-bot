module.exports = {
  name: 'remove',
  description: 'Remove a move from your dragon.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const moveName = args.join(' ').toLowerCase();
    if (!moveName) return reply('Please specify the name of the move to remove.');

    if (player.party.length === 0) return reply('You have no dragons in your party.');

    const dragon = player.party[0];
    const moveIndex = dragon.moves.findIndex(m => m.name.toLowerCase() === moveName);

    if (moveIndex === -1) {
        return reply(`${dragon.name} does not know the move ${moveName}.`);
    }

    const [removedMove] = dragon.moves.splice(moveIndex, 1);
    savePlayer();

    await reply(`You have removed the move ${removedMove.name} from your ${dragon.name}.`);
  },
};
