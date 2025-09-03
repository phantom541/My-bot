module.exports = {
  name: 'autoread',
  description: 'Enables or disables auto read.',
  async execute(context) {
    const { hasRole, reply, args, botSettings } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const option = args[0]?.toLowerCase();
    if (option === 'on') {
        botSettings.autoRead = true;
        await reply('Auto read enabled.');
    } else if (option === 'off') {
        botSettings.autoRead = false;
        await reply('Auto read disabled.');
    } else {
        await reply('Usage: %autoread <on/off>');
    }
  },
};
