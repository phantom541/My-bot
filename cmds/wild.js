module.exports = {
  name: 'wild',
  description: 'Enables or disables wild dragon spawns globally.',
  async execute(context) {
    const { hasRole, reply, args, wildSpawnsEnabled } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');
    const option = args[0]?.toLowerCase();
    if (option === 'on') {
        wildSpawnsEnabled.enabled = true;
        await reply('Wild dragon spawns have been enabled globally.');
    } else if (option === 'off') {
        wildSpawnsEnabled.enabled = false;
        await reply('Wild dragon spawns have been disabled globally.');
    } else {
        await reply('Usage: %wild <on/off>');
    }
  },
};
