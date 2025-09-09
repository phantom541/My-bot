module.exports = {
  name: 'autoreact',
  description: 'Enable or disable auto-react.',
  async execute(context) {
    const { args, reply, hasRole, botSettings } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const option = args[0]?.toLowerCase();
    if (option !== 'on' && option !== 'off') {
      return reply('Invalid option. Use `%autoreact on` or `%autoreact off`.');
    }

    botSettings.autoreactEnabled = (option === 'on');

    await reply(`Auto-react feature has been turned ${option}.`);
  },
};
