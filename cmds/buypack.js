// cmds/buypack.js
const { getPlayer, updatePlayer } = require('../playerData');

module.exports = {
  name: 'buypack',
  description: 'Buy a card pack.',
  async execute(context) {
    const { reply, sender, CARD_PACK_COST, CARD_PACK_SIZE } = context;
    const player = getPlayer(sender);

    if (player.wallet < CARD_PACK_COST) {
      return reply(`You don't have enough money. A card pack costs $${CARD_PACK_COST}.`);
    }

    player.wallet -= CARD_PACK_COST;
    // Assuming card packs are stored in inventory
    player.inventory['Card Pack'] = (player.inventory['Card Pack'] || 0) + 1;
    updatePlayer(player);

    await reply(`You have purchased a card pack for $${CARD_PACK_COST}. Use %claimpack to open it.`);
  },
};
