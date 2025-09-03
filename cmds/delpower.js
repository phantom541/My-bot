module.exports = {
  name: 'delpower',
  description: 'Revokes power user role from a user.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to remove from power users.');
    const targetPlayer = getPlayer(targetId);
    if (!targetPlayer.roles.includes('power')) return reply(`${targetPlayer.name} is not a power user.`);
    targetPlayer.roles = targetPlayer.roles.filter(r => r !== 'power');
    updatePlayer(targetPlayer);
    await reply(`${targetPlayer.name} has been removed from power users.`);
  },
};
