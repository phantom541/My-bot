module.exports = {
  name: 'stupid',
  description: 'Calculates how stupid a user is.',
  async execute(context) {
    const { msg, reply, getPlayer } = context;
    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);
    const stupidRate = Math.floor(Math.random() * 101);
    await reply(`@${targetContact.id.user} is ${stupidRate}% stupid.`, { mentions: [targetContact] });
  },
};
