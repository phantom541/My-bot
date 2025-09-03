module.exports = {
  name: 'mode',
  description: 'Sets the bot mode to public or private.',
  async execute(context) {
    const { hasRole, reply, args, botSettings } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const mode = args[0]?.toLowerCase();
    if (mode === 'public' || mode === 'private') {
        botSettings.mode = mode;
        await reply(`Bot mode set to ${mode}.`);
    } else {
        await reply('Usage: %mode <public/private>');
    }
  },
};
