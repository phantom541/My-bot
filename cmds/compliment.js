module.exports = {
  name: 'compliment',
  description: 'Gives a compliment to a user.',
  async execute(context) {
    const { msg, reply, getPlayer, COMPLIMENTS } = context;
    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to compliment.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);
    const compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    await reply(`@${targetContact.id.user}, ${compliment}`, { mentions: [targetContact] });
  },
};
