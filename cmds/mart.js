// cmds/mart.js
const shop = require('../shop');

module.exports = {
  name: 'mart',
  description: 'Display the item shop.',
  aliases: ['shop'],
  async execute(context) {
    const { reply } = context;
    let shopMessage = '*--- Item Shop ---*\n\n';
    shop.forEach(item => {
      shopMessage += `*ID:* ${item.id}\n`;
      shopMessage += `*Name:* ${item.name}\n`;
      shopMessage += `*Price:* $${item.price.toLocaleString()}\n`;
      shopMessage += `*Description:* ${item.description}\n\n`;
    });
    shopMessage += 'Use `%buy <ID>` to purchase an item.';
    await reply(shopMessage);
  },
};
