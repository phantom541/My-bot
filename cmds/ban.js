module.exports = {
  name: 'ban',
  description: 'Bans a user from using the bot.',
  async execute(context) {
    const { msg, reply, getPlayer, updatePlayer, hasRole } = context;

    if (!hasRole('mod')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

    if (!mentionedJid) {
      return reply('Please mention a user to ban.');
    }

    const playerToBan = getPlayer(mentionedJid);
    playerToBan.banned = true;
    updatePlayer(playerToBan);

    const targetName = playerToBan.name || mentionedJid.split('@')[0];
    await reply(`${targetName} has been banned from using the bot.`);
  },
};
