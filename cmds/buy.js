module.exports = {
  name: 'buy',
  description: 'Buys an item from the shop.',
  async execute(context) {
    const { args, player, savePlayer, reply, shop } = context;
    const itemKey = args[0]?.toLowerCase();
    if (!itemKey || !shop[itemKey]) return reply('Invalid item.');
    const item = shop[itemKey];
    if (player.gold < item.price) return reply('Not enough gold.');
    player.gold -= item.price;
    player.inventory[itemKey] = (player.inventory[itemKey] || 0) + 1;
    savePlayer();
    await reply(`Bought 1x ${item.name}. You now have ${player.inventory[itemKey]}.`);
  },
};
