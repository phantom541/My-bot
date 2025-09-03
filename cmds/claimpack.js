module.exports = {
  name: 'claimpack',
  description: 'Claims a spawned card pack.',
  async execute(context) {
    const { activeCardPacks, from, reply, player, savePlayer } = context;
    const pack = activeCardPacks[from];
    if (!pack) {
        return reply('There is no card pack to claim.');
    }

    pack.forEach(card => {
        if (player.deck.length < 12) {
            player.deck.push(card);
        } else {
            player.holder.push(card);
        }
    });

    savePlayer();
    delete activeCardPacks[from];

    await reply('You have claimed the card pack! The cards have been added to your collection.');
  },
};
