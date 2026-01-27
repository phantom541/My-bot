module.exports = {
  name: 'cards',
  description: "View your card collection.",
  async execute(context) {
    const { sock, from, msg, player } = context;

    const allCards = [...(player.pc || []), ...(player.deck || []), ...(player.holder || [])];

    if (allCards.length === 0) {
      await sock.sendMessage(from, { text: "Your card collection is empty. Use %claim to find new cards or %buypack to get some!" }, { quoted: msg });
      return;
    }

    let message = "🃏 *Your Card Collection* 🃏\n\n";
    if (player.deck && player.deck.length > 0) {
        message += "*Deck:*\n";
        player.deck.forEach((card, i) => {
            message += `${i + 1}. ${card.name} (Tier ${card.tier})\n`;
        });
        message += "\n";
    }
    if (player.holder && player.holder.length > 0) {
        message += "*Holder:*\n";
        player.holder.forEach((card, i) => {
            message += `${i + 1}. ${card.name} (Tier ${card.tier})\n`;
        });
        message += "\n";
    }
    if (player.pc && player.pc.length > 0) {
        message += "*Unsorted:*\n";
        player.pc.forEach((card, i) => {
            message += `${i + 1}. ${card.name} (Tier ${card.tier})\n`;
        });
    }

    const displayCard = allCards.find(c => c.imageUrl) || { imageUrl: 'https://i.imgur.com/76pA8gq.jpeg' };

    try {
        await sock.sendMessage(from, {
            image: { url: displayCard.imageUrl },
            caption: message
        }, { quoted: msg });
    } catch (error) {
        console.error("Error sending card collection:", error);
        await sock.sendMessage(from, { text: message }, { quoted: msg });
    }
  },
};
