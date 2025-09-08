module.exports = {
  name: 'promote',
  aliases: ['addsudo'],
  description: 'Promotes a user to a bot moderator.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');

    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to promote.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);

    if (targetPlayer.roles.includes('mod')) return reply(`@${targetContact.id.user} is already a mod.`, { mentions: [targetContact] });

    targetPlayer.roles.push('mod');
    updatePlayer(targetPlayer);
    await reply(`@${targetContact.id.user} has been promoted to mod.`, { mentions: [targetContact] });
  },
};
