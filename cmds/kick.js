module.exports = {
  name: 'kick',
  description: 'Kicks a user from the group.',
  async execute(context) {
    const { sock, from, msg, reply, hasRole } = context;

    if (!from.endsWith('@g.us')) {
      return reply('This command can only be used in groups.');
    }

    if (!hasRole('mod')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to kick.');
    }

    // A more robust implementation would check if the bot and user are admins
    // but for this refactoring, a direct call is sufficient.
    try {
      await sock.groupParticipantsUpdate(from, [mentionedJid], 'remove');
      // No need to reply, the action is visible in the group.
    } catch (error) {
      console.error('Error kicking user:', error);
      await reply("I couldn't kick the user. Am I an admin in this group?");
    }
  },
};
