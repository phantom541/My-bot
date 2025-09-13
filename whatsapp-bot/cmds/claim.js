module.exports = {
  name: 'claim',
  description: 'Claims a spawned card.',
  async execute(context) {
    const { from, player, savePlayer, reply, activeCardSpawns, CARD_CLAIM_COST } = context;

    const cardToClaim = activeCardSpawns[from];

    if (!cardToClaim) {
      return reply('There is no card to claim right now.');
    }

    if (player.gold < CARD_CLAIM_COST) {
      return reply(`You need ${CARD_CLAIM_COST} gold to claim this card, but you only have ${player.gold}.`);
    }

    // Deduct cost
    player.gold -= CARD_CLAIM_COST;

    // Add card to player's collection (pc = player collection)
    if (!player.pc) {
      player.pc = [];
    }
    player.pc.push({
      id: cardToClaim.id,
      name: cardToClaim.name,
      tier: cardToClaim.tier,
      source: cardToClaim.source,
      imageUrl: cardToClaim.imageUrl,
    });

    // Remove the active spawn so it can't be claimed again
    delete activeCardSpawns[from];

    // Save the updated player data
    savePlayer();

    await reply(`Congratulations! You have successfully claimed the "${cardToClaim.name}" card for ${CARD_CLAIM_COST} gold.`);
  },
};
