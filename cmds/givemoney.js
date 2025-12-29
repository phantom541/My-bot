// cmds/givemoney.js
const { getPlayer, updatePlayer } = require('../playerData');

module.exports = {
  name: 'givemoney',
  description: 'Give money to another user (Admin only).',
  aliases: ['give'],
  async execute(context) {
    const { args, reply, sender, msg, hasRole, sock } = context;

    if (!hasRole('owner')) {
      return reply("You do not have permission to use this command.");
    }

    if (args.length < 2) {
      return reply('Usage: %givemoney <@user> <amount>');
    }

    const mentionedId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid[0] || args[0].replace('@', '') + '@s.whatsapp.net';
    const amount = parseInt(args[1]);

    if (!mentionedId) {
      return reply('Please mention a user.');
    }

    if (isNaN(amount) || amount <= 0) {
      return reply('Invalid amount.');
    }

    const targetPlayer = getPlayer(mentionedId);
    if (!targetPlayer) {
      return reply('User not found.');
    }

    targetPlayer.wallet += amount;
    updatePlayer(targetPlayer);

    await sock.sendMessage(mentionedId, { text: `You have received $${amount.toLocaleString()} from an admin.` });
    await reply(`Successfully gave $${amount.toLocaleString()} to ${targetPlayer.name}.`);
  },
};
