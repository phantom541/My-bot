module.exports = {
  name: 'deposit',
  description: 'Deposits gold into your bank.',
  async execute(context) {
    const { args, player, savePlayer, reply } = context;
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return reply('Invalid amount.');

    if (player.gold < amount) return reply('Not enough gold.');
    player.gold -= amount;
    player.bank += amount;
    savePlayer();
    await reply(`Deposited ${amount} gold. Bank balance: ${player.bank}`);
  },
};
