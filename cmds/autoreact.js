module.exports = {
  name: 'autoreact',
  description: 'Enables or disables auto-react.',
  async execute(context) {
    const { hasRole, reply, args, botSettings } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const option = args[0]?.toLowerCase();
    if (option === 'on') {
        botSettings.autoreactEnabled = true;
        await reply('Auto-react enabled.');
    } else if (option === 'off') {
        botSettings.autoreactEnabled = false;
        await reply('Auto-react disabled.');
    } else {
        await reply('Usage: %autoreact <on/off>');
    }
  },
};
