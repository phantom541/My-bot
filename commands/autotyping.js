module.exports = {
  name: 'autotyping',
  description: 'Enable or disable auto typing.',
  async execute(context) {
    const { args, reply, hasRole, botSettings } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const option = args[0]?.toLowerCase();
    if (option !== 'on' && option !== 'off') {
      return reply('Invalid option. Use `%autotyping on` or `%autotyping off`.');
    }

    botSettings.autoTyping = (option === 'on');

    await reply(`Auto typing has been turned ${option}.`);
  },
};
