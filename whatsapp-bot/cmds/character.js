module.exports = {
  name: 'character',
  description: 'Assigns a random character to a user.',
  async execute(context) {
    const { msg, reply, getPlayer } = context;
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user.');
    const targetPlayer = getPlayer(targetId);
    const characters = ['a hero', 'a villain', 'a sidekick', 'a mysterious stranger'];
    const character = characters[Math.floor(Math.random() * characters.length)];
    await reply(`${targetPlayer.name} is ${character}.`);
  },
};
