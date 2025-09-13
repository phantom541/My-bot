module.exports = {
  name: 'delpower',
  description: 'Remove a power user.',
  async execute(context) {
    const { msg, reply, hasRole, getPlayer, updatePlayer } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to remove as a power user.');
    }

    const playerToDemote = getPlayer(mentionedJid);
    if (!playerToDemote.roles || !playerToDemote.roles.includes('power')) {
      return reply('This user is not a power user.');
    }

    playerToDemote.roles = playerToDemote.roles.filter(role => role !== 'power');
    updatePlayer(playerToDemote);

    const targetName = playerToDemote.name || mentionedJid.split('@')[0];
    await reply(`${targetName} has been removed as a power user.`);
  },
};
