module.exports = {
  name: 'trade',
  description: 'Trade dragons with other players.',
  async execute(context) {
    const { args, msg, reply } = context;
    const subCommand = args[0];
    if (subCommand === 'accept' || subCommand === 'decline') {
      await reply(`Trade ${subCommand}ed.`);
      return;
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return reply('Please mention a user to trade with.');
    }
    await reply(`Trade initiated with ${mentionedJid.split('@')[0]}.`);
  },
};
