module.exports = {
  name: 'mode',
  description: 'Set the bot mode.',
  async execute(context) {
    const { args, reply, hasRole, botSettings } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const newMode = args[0]?.toLowerCase();
    if (newMode !== 'public' && newMode !== 'private') {
      return reply('Invalid mode. Use `%mode public` or `%mode private`.');
    }

    botSettings.mode = newMode;

    await reply(`Bot mode has been set to ${newMode}.`);
  },
};
