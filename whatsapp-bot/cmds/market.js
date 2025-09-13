module.exports = {
  name: 'market',
  description: 'Access the player market.',
  async execute(context) {
    const { reply } = context;
    await reply('Welcome to the player market!');
  },
};
