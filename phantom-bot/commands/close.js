module.exports = {
  name: 'close',
  description: 'Close the group for only admins to send messages.',
  async execute(context) {
    const { from, isGroupAdmin, sender, reply, sock } = context;
    if (!from.endsWith('@g.us')) {
        return reply('This command can only be used in groups.');
    }
    if (!await isGroupAdmin(from, sender)) {
        return reply('Only group admins can use this command.');
    }
    try {
        await sock.groupSettingUpdate(from, 'announcement');
        await reply('Group closed.');
    } catch (error) {
        console.error('Error closing group:', error);
        await reply('I could not close the group. Am I an admin?');
    }
  },
};
