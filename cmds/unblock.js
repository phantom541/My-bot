module.exports = {
  name: 'unblock',
  description: 'Unblock a user from the bot.',
  async execute(context) {
    const { sock, msg, reply, hasRole } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to unblock.');
    }
    await sock.updateBlockStatus(mentionedJid, 'unblock');
    await reply(`User ${mentionedJid.split('@')[0]} has been unblocked.`);
  },
};
