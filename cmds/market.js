// cmds/market.js
module.exports = {
  name: 'market',
  description: 'Access the player market.',
  async execute(context) {
    const { reply } = context;
    // This command is temporarily disabled for maintenance.
    await reply('This command is currently under maintenance.');
  },
};
