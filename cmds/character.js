module.exports = {
  name: 'character',
  description: 'Assigns a random character to a user.',
  async execute(context) {
    const { msg, reply, getPlayer } = context;
    const mentions = await msg.getMentions();
    if (!mentions || mentions.length === 0) {
        return reply('You need to mention a user.');
    }
    const targetContact = mentions[0];
    const targetPlayer = getPlayer(targetContact.id._serialized);
    const characters = ['a hero', 'a villain', 'a sidekick', 'a mysterious stranger'];
    const character = characters[Math.floor(Math.random() * characters.length)];
    await reply(`@${targetContact.id.user} is ${character}.`, { mentions: [targetContact] });
  },
};
