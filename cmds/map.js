module.exports = {
  name: 'map',
  description: 'View the world map.',
  async execute(context) {
    const { reply } = context;
    await reply('Here is the world map.');
  },
};
