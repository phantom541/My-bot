module.exports = {
  name: 'movetoholder',
  description: 'Move a card from your deck to your holder.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const deckIndex = parseInt(args[0]) - 1;
    if (isNaN(deckIndex) || deckIndex < 0 || deckIndex >= player.deck.length) {
        return reply('Invalid deck index.');
    }

    const [cardToMove] = player.deck.splice(deckIndex, 1);
    player.holder.push(cardToMove);
    savePlayer();

    await reply(`${cardToMove.name} has been moved to your card holder.`);
  },
};
