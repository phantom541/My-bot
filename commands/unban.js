module.exports = {
  name: 'unban',
  description: 'Unban a user from the bot.',
  async execute(context) {
    const { msg, reply, hasRole, getPlayer, updatePlayer } = context;

    if (!hasRole('mod')) {
        return reply("You do not have permission to use this command.");
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to unban.');
    }

    const playerToUnban = getPlayer(mentionedJid);
    playerToUnban.banned = false;
    updatePlayer(playerToUnban);

    await reply(`User ${mentionedJid.split('@')[0]} has been unbanned.`);
  },
};
