module.exports = {
  name: 'addpower',
  description: 'Grants power user role to a user.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to add as power user.');
    const targetPlayer = getPlayer(targetId);
    if (targetPlayer.roles.includes('power')) return reply(`${targetPlayer.name} is already a power user.`);
    targetPlayer.roles.push('power');
    updatePlayer(targetPlayer);
    await reply(`${targetPlayer.name} has been added as a power user.`);
  },
};
