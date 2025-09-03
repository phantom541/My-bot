module.exports = {
  name: 'modes',
  description: 'Enable or disable features for this group.',
  async execute(context) {
    const { from, isGroupAdmin, sender, reply, args, getGroupSettings, updateGroupSettings } = context;
    if (!from.endsWith('@g.us')) {
        return reply('This command can only be used in groups.');
    }
    if (!await isGroupAdmin(from, sender)) {
        return reply('Only group admins can use this command.');
    }

    const feature = args[0]?.toLowerCase();
    const option = args[1]?.toLowerCase();

    if (!feature || !option || (option !== 'on' && option !== 'off')) {
        return reply('Usage: %modes <feature> <on|off>\nAvailable features: antilink, slot, wild, wildcard');
    }

    const groupSettings = getGroupSettings(from);
    if (groupSettings[feature] === undefined) {
        return reply(`Invalid feature: ${feature}. Available features: antilink, slot, wild, wildcard`);
    }

    groupSettings[feature] = option === 'on';
    updateGroupSettings(groupSettings);

    await reply(`${feature} has been turned ${option} for this group.`);
  },
};
