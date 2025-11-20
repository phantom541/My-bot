const allItems = require('../items');

module.exports = {
  name: 'inventory',
  aliases: ['inv'],
  description: 'Displays your item inventory.',
  async execute(context) {
    const { sock, from, msg, player } = context;

    let inventoryMessage = `*🎒 ${player.name}'s Inventory*\n\n`;

    if (!player.inventory || Object.keys(player.inventory).length === 0) {
      inventoryMessage += 'Your inventory is empty.';
    } else {
      for (const itemId in player.inventory) {
        const item = allItems[itemId];
        const quantity = player.inventory[itemId];
        if (item && quantity > 0) {
          inventoryMessage += `*${item.name}* (x${quantity})\n`;
          inventoryMessage += `  - _${item.description}_\n\n`;
        }
      }
    }

    await sock.sendMessage(from, { text: inventoryMessage }, { quoted: msg });
  },
};
