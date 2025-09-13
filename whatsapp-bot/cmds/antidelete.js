module.exports = {
  name: 'antidelete',
  description: 'Enable or disable anti-delete.',
  async execute(context) {
    const { args, reply, hasRole, botSettings } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const option = args[0]?.toLowerCase();
    if (option !== 'on' && option !== 'off') {
      return reply('Invalid option. Use `%antidelete on` or `%antidelete off`.');
    }

    botSettings.antideleteEnabled = (option === 'on');

    await reply(`Anti-delete feature has been turned ${option}.`);
  },
};
