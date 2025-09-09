module.exports = {
  name: 'autoread',
  description: 'Enable or disable auto read.',
  async execute(context) {
    const { args, reply, hasRole, botSettings } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const option = args[0]?.toLowerCase();
    if (option !== 'on' && option !== 'off') {
      return reply('Invalid option. Use `%autoread on` or `%autoread off`.');
    }

    botSettings.autoRead = (option === 'on');

    await reply(`Auto read has been turned ${option}.`);
  },
};
