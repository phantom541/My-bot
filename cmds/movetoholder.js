module.exports = {
  name: 'movetoholder',
  description: 'Moves a card from your deck to your holder.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const deckIndex = parseInt(args[0]) - 1;

    if (isNaN(deckIndex)) {
      return reply('Invalid usage. Use: `%movetoholder <deck_card_number>`');
    }

    const deck = player.deck || [];

    if (deckIndex < 0 || deckIndex >= deck.length) {
      return reply('Invalid card number in your deck.');
    }

    const cardToMove = deck.splice(deckIndex, 1)[0];

    if (!player.holder) {
      player.holder = [];
    }
    player.holder.push(cardToMove);
    savePlayer();

    await reply(`Moved "${cardToMove.name}" from your deck to your holder.`);
  },
};
