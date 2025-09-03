module.exports = {
  name: 'withdraw',
  description: 'Withdraws gold from your bank.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return reply('Invalid amount.');

    if (player.bank < amount) return reply('Not enough bank balance.');
    player.bank -= amount;
    player.gold += amount;
    savePlayer();
    await reply(`Withdrew ${amount} gold. Wallet balance: ${player.gold}`);
  },
};
