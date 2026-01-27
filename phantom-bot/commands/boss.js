module.exports = {
  name: 'boss',
  description: 'Fight the global boss.',
  async execute(context) {
    const { reply } = context;
    // This is a placeholder for the boss logic, which would
    // handle the global boss fight.
    await reply('You are now fighting the global boss!');
  },
};
