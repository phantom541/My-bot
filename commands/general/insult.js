module.exports = {
  name: 'insult',
  description: 'Insults a user.',
  async execute(context) {
    const { msg, reply, getPlayer, INSULTS } = context;
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to insult.');
    const targetPlayer = getPlayer(targetId);
    const insult = INSULTS[Math.floor(Math.random() * INSULTS.length)];
    await reply(`${targetPlayer.name}, ${insult}`);
  },
};
