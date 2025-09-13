module.exports = {
  name: 'addsudo',
  description: 'Promote a user to mod.',
  async execute(context) {
    const { msg, reply, hasRole, getPlayer, updatePlayer } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to promote.');
    }

    const playerToPromote = getPlayer(mentionedJid);
    if (!playerToPromote.roles) {
      playerToPromote.roles = [];
    }

    if (playerToPromote.roles.includes('mod')) {
      return reply('This user is already a mod.');
    }

    playerToPromote.roles.push('mod');
    updatePlayer(playerToPromote);

    const targetName = playerToPromote.name || mentionedJid.split('@')[0];
    await reply(`${targetName} has been promoted to a bot moderator.`);
  },
};
