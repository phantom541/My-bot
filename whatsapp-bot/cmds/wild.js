module.exports = {
  name: 'wild',
  description: 'Enable/disable wild spawns (mods only).',
  async execute(context) {
    const { from, args, reply, hasRole, getGroupSettings, updateGroupSettings } = context;

    if (!from.endsWith('@g.us')) {
      return reply('This command can only be used in groups.');
    }

    if (!hasRole('mod')) {
      return reply('You do not have permission to use this command.');
    }

    const option = args[0]?.toLowerCase();
    if (option !== 'on' && option !== 'off') {
      return reply('Invalid option. Use `%wild on` or `%wild off`.');
    }

    const groupSettings = getGroupSettings(from);
    groupSettings.wild = (option === 'on');
    updateGroupSettings(from, groupSettings);

    await reply(`Wild dragon spawns have been turned ${option}.`);
  },
};
