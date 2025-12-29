// cmds/withdraw.js
const { getPlayer, updatePlayer } = require('../playerData');

module.exports = {
  name: 'withdraw',
  description: 'Withdraw money from your bank.',
  aliases: ['wd'],
  async execute(context) {
    const { args, reply, sender } = context;
    const player = getPlayer(sender);

    if (args.length === 0) {
      return reply('Please specify the amount you want to withdraw.');
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return reply('Invalid amount.');
    }

    if (player.bank < amount) {
      return reply("You don't have enough money in your bank.");
    }

    player.bank -= amount;
    player.wallet += amount;
    updatePlayer(player);

    await reply(`You have withdrawn $${amount.toLocaleString()} from your bank.`);
  },
};
