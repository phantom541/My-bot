// cmds/claim.js
module.exports = {
  name: 'claim',
  description: 'Claim a spawned card.',
  async execute(context) {
    const { reply, sender, activeCardSpawns, from, player, savePlayer } = context;

    const card = activeCardSpawns[from];
    if (!card) {
      return reply('There is no card to claim in this chat.');
    }

    if (player.wallet < card.price) {
      return reply(`You need $${card.price} to claim this card.`);
    }

    player.wallet -= card.price;
    if (!player.deck) player.deck = [];
    player.deck.push(card);
    savePlayer();

    delete activeCardSpawns[from];

    await reply(`You have successfully claimed the ${card.name} card!`);
  },
};
