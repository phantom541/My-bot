module.exports = {
  name: 'beasts',
  description: 'List the Colossal Beasts.',
  async execute(context) {
    const { reply, beasts } = context;
    let response = '*The Seven Colossal Beasts of Ruin:*\n\n';
    beasts.forEach(b => {
        response += `- *${b.name}*\n`;
    });
    await reply(response);
  },
};
