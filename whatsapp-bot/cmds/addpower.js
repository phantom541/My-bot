module.exports = {
  name: 'addpower',
  description: 'Add a power user.',
  async execute(context) {
    const { msg, reply, hasRole, getPlayer, updatePlayer } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to add as a power user.');
    }

    const playerToPromote = getPlayer(mentionedJid);
    if (!playerToPromote.roles) {
      playerToPromote.roles = [];
    }

    if (playerToPromote.roles.includes('power')) {
      return reply('This user is already a power user.');
    }

    playerToPromote.roles.push('power');
    updatePlayer(playerToPromote);

    const targetName = playerToPromote.name || mentionedJid.split('@')[0];
    await reply(`${targetName} has been added as a power user.`);
  },
};
