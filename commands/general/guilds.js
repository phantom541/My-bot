module.exports = {
  name: 'guilds',
  description: 'List all guilds.',
  async execute(context) {
    const { reply } = context;
    await reply('Here is a list of all guilds.');
  },
};
