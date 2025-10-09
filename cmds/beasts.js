module.exports = {
  name: 'beasts',
  description: 'List the Colossal Beasts.',
  async execute(context) {
    const { reply } = context;
    // This is a placeholder for the beasts list logic.
    await reply('Here are the Colossal Beasts.');
  },
};
