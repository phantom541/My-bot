module.exports = {
  name: 'simp',
  description: 'Calculates how much of a simp a user is.',
  async execute(context) {
    const { msg, reply, getPlayer } = context;
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user.');
    const targetPlayer = getPlayer(targetId);
    const simpRate = Math.floor(Math.random() * 101);
    await reply(`${targetPlayer.name} is ${simpRate}% a simp.`);
  },
};
