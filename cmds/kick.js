module.exports = {
  name: 'kick',
  description: 'Kicks a user from the group.',
  async execute(context) {
    const { hasRole, reply, msg, sock, from } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to kick.');
    try {
        await sock.groupParticipantsUpdate(from, [targetId], "remove");
    } catch (error) {
        console.error('Error kicking user:', error);
        await reply('I could not kick the user. Am I an admin in this group?');
    }
  },
};
