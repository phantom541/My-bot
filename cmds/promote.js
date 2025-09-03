module.exports = {
  name: 'promote',
  aliases: ['addsudo'],
  description: 'Promotes a user to a bot moderator.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to promote.');
    const targetPlayer = getPlayer(targetId);
    if (targetPlayer.roles.includes('mod')) return reply(`${targetPlayer.name} is already a mod.`);
    targetPlayer.roles.push('mod');
    updatePlayer(targetPlayer);
    await reply(`${targetPlayer.name} has been promoted to mod.`);
  },
};
