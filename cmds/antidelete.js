module.exports = {
  name: 'antidelete',
  description: 'Enables or disables anti-delete.',
  async execute(context) {
    const { hasRole, reply, args, botSettings } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const option = args[0]?.toLowerCase();
    if (option === 'on') {
        botSettings.antideleteEnabled = true;
        await reply('Anti-delete enabled.');
    } else if (option === 'off') {
        botSettings.antideleteEnabled = false;
        await reply('Anti-delete disabled.');
    } else {
        await reply('Usage: %antidelete <on/off>');
    }
  },
};
