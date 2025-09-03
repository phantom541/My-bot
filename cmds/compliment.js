module.exports = {
  name: 'compliment',
  description: 'Gives a compliment to a user.',
  async execute(context) {
    const { msg, reply, getPlayer, COMPLIMENTS } = context;
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to compliment.');
    const targetPlayer = getPlayer(targetId);
    const compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    await reply(`${targetPlayer.name}, ${compliment}`);
  },
};
