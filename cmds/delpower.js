module.exports = {
  name: 'delpower',
  description: 'Revokes power user role from a user.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');

    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to remove from power users.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);

    if (!targetPlayer.roles.includes('power')) return reply(`@${targetContact.id.user} is not a power user.`, { mentions: [targetContact] });

    targetPlayer.roles = targetPlayer.roles.filter(r => r !== 'power');
    updatePlayer(targetPlayer);
    await reply(`@${targetContact.id.user} has been removed from power users.`, { mentions: [targetContact] });
  },
};
