module.exports = {
  name: 'roseday',
  description: 'Wishes a happy rose day.',
  async execute(context) {
    const { reply } = context;
    await reply('Happy Rose Day! 🌹');
  },
};
