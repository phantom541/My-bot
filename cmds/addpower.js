module.exports = {
  name: 'addpower',
  description: 'Grants power user role to a user.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');

    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to add as power user.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);

    if (targetPlayer.roles.includes('power')) return reply(`@${targetContact.id.user} is already a power user.`, { mentions: [targetContact] });

    targetPlayer.roles.push('power');
    updatePlayer(targetPlayer);
    await reply(`@${targetContact.id.user} has been added as a power user.`, { mentions: [targetContact] });
  },
};
