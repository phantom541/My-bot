// cmds/balance.js
const { getPlayer } = require('../playerData');

module.exports = {
  name: 'balance',
  description: 'Check your wallet and bank balance.',
  aliases: ['bal'],
  async execute(context) {
    const { reply, sender } = context;
    const player = getPlayer(sender);

    const balanceMessage = `*--- Your Balance ---*\n\n` +
                         `*Wallet:* $${player.wallet.toLocaleString()}\n` +
                         `*Bank:* $${player.bank.toLocaleString()} / $${player.bankMax.toLocaleString()}`;

    await reply(balanceMessage);
  },
};
