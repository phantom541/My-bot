module.exports = {
  name: 'ship',
  description: 'Calculates the compatibility between you and another user.',
  async execute(context) {
    const { msg, reply, getPlayer, getShipComment } = context;
    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user to ship with.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);
    const compatibility = Math.floor(Math.random() * 101);
    const comment = getShipComment(compatibility);
    await reply(`Your compatibility with @${targetContact.id.user} is ${compatibility}%.\n${comment}`, { mentions: [targetContact] });
  },
};
