module.exports = {
  name: 'cards',
  description: "View your card collection.",
  async execute(context) {
    const { player, reply } = context;

    const collection = player.pc || [];
    const deck = player.deck || [];
    const holder = player.holder || [];

    if (collection.length === 0 && deck.length === 0 && holder.length === 0) {
      return reply("Your card collection is empty. Use %spawncard (mod command) to find new cards or %buypack to get some!");
    }

    let message = "🃏 *Your Card Collection* 🃏\n\n";
    let cardCount = 0;

    if (deck.length > 0) {
        message += "Deck:\n";
        deck.forEach((card, index) => {
            message += ` ${index + 1}. *${card.name}* (Tier: ${card.tier})\n`;
            cardCount++;
        });
        message += "\n";
    }

    if (holder.length > 0) {
        message += "Holder:\n";
        holder.forEach((card, index) => {
            message += ` ${index + 1}. *${card.name}* (Tier: ${card.tier})\n`;
            cardCount++;
        });
        message += "\n";
    }

    if (collection.length > 0) {
        message += "Unsorted:\n";
        collection.forEach((card, index) => {
            message += ` ${index + 1}. *${card.name}* (Tier: ${card.tier}, Source: ${card.source})\n`;
            cardCount++;
        });
        message += "\n";
    }

    if (cardCount === 0) {
         return reply("Your card collection is empty. Use %spawncard (mod command) to find new cards or %buypack to get some!");
    }

    await reply(message.trim());
  },
};
