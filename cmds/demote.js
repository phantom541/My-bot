module.exports = {
  name: 'demote',
  aliases: ['delsudo'],
  description: 'Demotes a bot moderator.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to demote.');
    const targetPlayer = getPlayer(targetId);
    if (!targetPlayer.roles.includes('mod')) return reply(`${targetPlayer.name} is not a mod.`);
    targetPlayer.roles = targetPlayer.roles.filter(r => r !== 'mod');
    updatePlayer(targetPlayer);
    await reply(`${targetPlayer.name} has been demoted.`);
  },
};
