module.exports = {
  name: 'claim',
  description: 'Claims a spawned card.',
  async execute(context) {
    const { from, player, reply, activeCardSpawns } = context;

    const cardToClaim = activeCardSpawns[from];

    if (!cardToClaim) {
      return reply('There is no card to claim right now.');
    }

    const claimCost = cardToClaim.price || 100;

    if (player.gold < claimCost) {
      return reply(`You need ${claimCost} gold to claim this card, but you only have ${player.gold}.`);
    }

    player.gold -= claimCost;

    if (!player.deck) {
      player.deck = [];
    }
    player.deck.push({
      id: cardToClaim.id,
      name: cardToClaim.name,
      tier: cardToClaim.tier,
      source: cardToClaim.source,
      imageUrl: cardToClaim.imageUrl,
    });

    delete activeCardSpawns[from];

    require('../database/index').saveDb();

    await reply(`Congratulations! You have successfully claimed the "${cardToClaim.name}" card for ${claimCost} gold. It has been added to your deck.`);
  },
};
