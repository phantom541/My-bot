module.exports = {
  name: 'kick',
  description: 'Kicks a user from the group.',
  async execute(context) {
    const { hasRole, reply, msg, chat } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');
    if (!chat.isGroup) return reply('This command can only be used in a group.');

    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to kick.');
    }
    const targetContact = mentions[0];

    try {
        await chat.removeParticipants([targetContact.id._serialized]);
        await reply(`Kicked @${targetContact.id.user}.`, { mentions: [targetContact] });
    } catch (error) {
        console.error('Error kicking user:', error);
        await reply('I could not kick the user. Am I an admin in this group?');
    }
  },
};
