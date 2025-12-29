// cmds/deposit.js
const { getPlayer, updatePlayer } = require('../playerData');

module.exports = {
  name: 'deposit',
  description: 'Deposit money into your bank.',
  aliases: ['dep'],
  async execute(context) {
    const { args, reply, sender } = context;
    const player = getPlayer(sender);

    if (args.length === 0) {
      return reply('Please specify the amount you want to deposit.');
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return reply('Invalid amount.');
    }

    if (player.wallet < amount) {
      return reply("You don't have enough money in your wallet.");
    }

    if (player.bank + amount > player.bankMax) {
      return reply('Your bank is full.');
    }

    player.wallet -= amount;
    player.bank += amount;
    updatePlayer(player);

    await reply(`You have deposited $${amount.toLocaleString()} into your bank.`);
  },
};
