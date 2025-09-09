module.exports = {
  name: 'delsudo',
  description: 'Demote a mod.',
  async execute(context) {
    const { msg, reply, hasRole, getPlayer, updatePlayer } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to demote.');
    }

    const playerToDemote = getPlayer(mentionedJid);
    if (!playerToDemote.roles || !playerToDemote.roles.includes('mod')) {
      return reply('This user is not a mod.');
    }

    playerToDemote.roles = playerToDemote.roles.filter(role => role !== 'mod');
    updatePlayer(playerToDemote);

    const targetName = playerToDemote.name || mentionedJid.split('@')[0];
    await reply(`${targetName} has been demoted and is no longer a bot moderator.`);
  },
};
