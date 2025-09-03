module.exports = {
  name: 'open',
  description: 'Open the group for all members to send messages.',
  async execute(context) {
    const { from, isGroupAdmin, sender, reply, sock } = context;
    if (!from.endsWith('@g.us')) {
        return reply('This command can only be used in groups.');
    }
    if (!await isGroupAdmin(from, sender)) {
        return reply('Only group admins can use this command.');
    }
    try {
        await sock.groupSettingUpdate(from, 'not_announcement');
        await reply('Group opened.');
    } catch (error) {
        console.error('Error opening group:', error);
        await reply('I could not open the group. Am I an admin?');
    }
  },
};
