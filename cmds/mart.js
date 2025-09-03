module.exports = {
  name: 'mart',
  aliases: ['shop'], // 'shop' is a good alias
  description: 'Displays items available for purchase.',
  async execute(context) {
    const { reply, shop } = context;
    let shopText = '*Shop Items:*\n\n';
    for (const key in shop) {
      shopText += `*${shop[key].name}* - ${shop[key].price} gold\n`;
      shopText += `> ${shop[key].description}\n\n`;
    }
    await reply(shopText);
  },
};
