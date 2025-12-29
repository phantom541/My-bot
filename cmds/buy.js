// cmds/buy.js
const { getPlayer, updatePlayer } = require('../playerData');
const shop = require('../shop');

module.exports = {
  name: 'buy',
  description: 'Buy an item from the shop.',
  async execute(context) {
    const { args, reply, sender } = context;
    const player = getPlayer(sender);

    if (args.length === 0) {
      return reply('Please specify the ID of the item you want to buy.');
    }

    const itemId = parseInt(args[0]);
    const item = shop.find(i => i.id === itemId);

    if (!item) {
      return reply('Item not found.');
    }

    if (player.wallet < item.price) {
      return reply("You don't have enough money in your wallet to buy this item.");
    }

    player.wallet -= item.price;
    player.inventory[item.name] = (player.inventory[item.name] || 0) + 1;
    updatePlayer(player);

    await reply(`You have successfully purchased a ${item.name} for $${item.price}.`);
  },
};
