module.exports = {
  name: 'givegold',
  description: 'Give gold to a user (owner only).',
  async execute(context) {
    const { msg, args, reply, hasRole, getPlayer, updatePlayer } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    // The amount should be the argument after the mention. In many cases, the mention is not in args.
    // A robust way is to find the numerical argument.
    const amount = parseInt(args.find(arg => !isNaN(parseInt(arg))));


    if (!mentionedJid || isNaN(amount) || amount <= 0) {
      return reply('Invalid usage. Use `%givegold @user <amount>`');
    }

    const recipient = getPlayer(mentionedJid);
    recipient.gold += amount;
    updatePlayer(recipient);

    const recipientName = recipient.name || mentionedJid.split('@')[0];
    await reply(`Gave ${amount} gold to ${recipientName}.`);
  },
};
