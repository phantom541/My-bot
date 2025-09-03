module.exports = {
  name: 'givegold',
  description: 'Gives gold to a user (owner only).',
  async execute(context) {
    const { hasRole, reply, msg, args, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const amount = parseInt(args[1]);
    if (!targetId || isNaN(amount) || amount <= 0) {
        return reply('Usage: %givegold @user <amount>');
    }
    const targetPlayer = getPlayer(targetId);
    targetPlayer.gold += amount;
    updatePlayer(targetPlayer);
    await reply(`Gave ${amount} gold to ${targetPlayer.name}.`);
  },
};
