module.exports = {
  name: 'cards',
  description: 'View your card collection (deck and holder).',
  async execute(context) {
    const { reply, player } = context;
    let response = `*Your Deck (${player.deck.length}/12):*\n`;
    if (player.deck.length === 0) {
        response += 'Your deck is empty.\n';
    } else {
        player.deck.forEach((card, i) => {
            response += `${i + 1}. ${card.name} (Tier: ${card.tier})\n`;
        });
    }

    response += `\n*Your Card Holder (${player.holder.length}):*\n`;
    if (player.holder.length === 0) {
        response += 'Your card holder is empty.\n';
    } else {
        player.holder.forEach((card, i) => {
            response += `${i + 1}. ${card.name} (Tier: ${card.tier})\n`;
        });
    }

    await reply(response);
  },
};
