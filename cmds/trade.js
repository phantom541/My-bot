// cmds/trade.js
module.exports = {
  name: 'trade',
  description: 'Trade with another user.',
  async execute(context) {
    const { reply } = context;
    // This command is temporarily disabled for maintenance.
    await reply('This command is currently under maintenance.');
  },
};
