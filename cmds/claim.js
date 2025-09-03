module.exports = {
  name: 'claim',
  description: 'Claims a spawned card.',
  async execute(context) {
    const { activeCardSpawns, from, reply, player, CARD_CLAIM_COST, savePlayer } = context;
    const card = activeCardSpawns[from];
    if (!card) {
        return reply('There is no card to claim.');
    }

    if (player.gold < CARD_CLAIM_COST) {
        return reply(`You need ${CARD_CLAIM_COST} gold to claim this card. You only have ${player.gold}.`);
    }

    player.gold -= CARD_CLAIM_COST;

    if (player.deck.length < 12) {
        player.deck.push(card);
        await reply(`You spent ${CARD_CLAIM_COST} gold and claimed the ${card.name} card! It has been added to your deck.`);
    } else {
        player.holder.push(card);
        await reply(`You spent ${CARD_CLAIM_COST} gold and claimed the ${card.name} card! Your deck is full, so it has been sent to your card holder.`);
    }

    savePlayer();
    delete activeCardSpawns[from];
  },
};
