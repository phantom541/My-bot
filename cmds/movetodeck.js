module.exports = {
  name: 'movetodeck',
  description: 'Move a card from your holder to your deck.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const holderIndex = parseInt(args[0]) - 1;
    if (isNaN(holderIndex) || holderIndex < 0 || holderIndex >= player.holder.length) {
        return reply('Invalid card holder index.');
    }

    if (player.deck.length >= 12) {
        return reply('Your deck is full. Move a card to your holder first.');
    }

    const [cardToMove] = player.holder.splice(holderIndex, 1);
    player.deck.push(cardToMove);
    savePlayer();

    await reply(`${cardToMove.name} has been moved to your deck.`);
  },
};
