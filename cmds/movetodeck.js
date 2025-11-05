module.exports = {
  name: 'movetodeck',
  description: 'Moves a card from your holder to your deck.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const holderIndex = parseInt(args[0]) - 1;

    if (isNaN(holderIndex)) {
      return reply('Invalid usage. Use: `%movetodeck <holder_card_number>`');
    }

    const holder = player.holder || [];

    if (holderIndex < 0 || holderIndex >= holder.length) {
      return reply('Invalid card number in your holder.');
    }

    const cardToMove = holder.splice(holderIndex, 1)[0];

    if (!player.deck) {
      player.deck = [];
    }
    player.deck.push(cardToMove);
    savePlayer();

    await reply(`Moved "${cardToMove.name}" from your holder to your deck.`);
  },
};
