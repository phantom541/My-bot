module.exports = {
  name: 'join',
  description: 'Join a group via invite link.',
  async execute(context) {
    const { sock, args, reply, hasRole } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const groupInviteLink = args[0];
    if (!groupInviteLink || !groupInviteLink.startsWith('https://chat.whatsapp.com/')) {
      return reply('Please provide a valid WhatsApp group invite link.');
    }
    try {
      const groupCode = groupInviteLink.replace('https://chat.whatsapp.com/', '');
      await sock.groupAcceptInvite(groupCode);
      await reply('Successfully joined the group!');
    } catch (error) {
      console.error('Error joining group:', error);
      await reply('Failed to join the group. The invite link might be invalid or expired.');
    }
  },
};
