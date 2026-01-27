module.exports = {
  name: 'ship',
  description: 'Calculates the compatibility between you and another user.',
  async execute(context) {
    const { msg, reply, getPlayer, getShipComment } = context;
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user to ship with.');
    const targetPlayer = getPlayer(targetId);
    const compatibility = Math.floor(Math.random() * 101);
    const comment = getShipComment(compatibility);
    await reply(`Your compatibility with ${targetPlayer.name} is ${compatibility}%.\n${comment}`);
  },
};
