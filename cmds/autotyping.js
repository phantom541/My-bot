module.exports = {
  name: 'autotyping',
  description: 'Enables or disables auto typing.',
  async execute(context) {
    const { hasRole, reply, args, botSettings } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const option = args[0]?.toLowerCase();
    if (option === 'on') {
        botSettings.autoTyping = true;
        await reply('Auto typing enabled.');
    } else if (option === 'off') {
        botSettings.autoTyping = false;
        await reply('Auto typing disabled.');
    } else {
        await reply('Usage: %autotyping <on/off>');
    }
  },
};
