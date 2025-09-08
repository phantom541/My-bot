module.exports = {
  name: 'ban',
  description: 'Bans a user from using the bot.',
  async execute(context) {
    const { hasRole, reply, msg, getPlayer, updatePlayer } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');

    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to ban.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);

    targetPlayer.banned = true;
    updatePlayer(targetPlayer);
    await reply(`@${targetContact.id.user} has been banned.`, { mentions: [targetContact] });
  },
};
