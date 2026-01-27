module.exports = {
  name: 'wasted',
  description: 'Wasted.',
  async execute(context) {
    const { reply } = context;
    await reply('Wasted!');
  },
};
