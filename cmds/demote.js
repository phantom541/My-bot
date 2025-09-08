module.exports = {
  name: 'demote',
  aliases: ['delsudo'],
  description: 'Demotes a bot moderator.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');

    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to demote.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);

    if (!targetPlayer.roles.includes('mod')) return reply(`@${targetContact.id.user} is not a mod.`, { mentions: [targetContact] });

    targetPlayer.roles = targetPlayer.roles.filter(r => r !== 'mod');
    updatePlayer(targetPlayer);
    await reply(`@${targetContact.id.user} has been demoted.`, { mentions: [targetContact] });
  },
};
