module.exports = {
  name: 'unban',
  description: 'Unbans a user from using the bot.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to unban.');
    const targetPlayer = getPlayer(targetId);
    targetPlayer.banned = false;
    updatePlayer(targetPlayer);
    await reply(`${targetPlayer.name} has been unbanned.`);
  },
};
