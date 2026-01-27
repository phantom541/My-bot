module.exports = {
  name: 'stupid',
  description: 'Calculates how stupid a user is.',
  async execute(context) {
    const { msg, reply, getPlayer } = context;
    const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!targetId) return reply('You need to mention a user.');
    const targetPlayer = getPlayer(targetId);
    const stupidRate = Math.floor(Math.random() * 101);
    await reply(`${targetPlayer.name} is ${stupidRate}% stupid.`);
  },
};
