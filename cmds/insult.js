module.exports = {
  name: 'insult',
  description: 'Insults a user.',
  async execute(context) {
    const { msg, reply, getPlayer, INSULTS } = context;
    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to insult.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);
    const insult = INSULTS[Math.floor(Math.random() * INSULTS.length)];
    await reply(`@${targetContact.id.user}, ${insult}`, { mentions: [targetContact] });
  },
};
