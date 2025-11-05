module.exports = {
  name: 'slot',
  description: 'Gamble your gold in the slot machine.',
  async execute(context) {
    const { from, getGroupSettings, args, player, savePlayer, reply } = context;
    if (from.endsWith('@g.us')) {
        const groupSettings = getGroupSettings(from);
        if (!groupSettings.slot) {
            return reply('The slot machine is disabled in this group.');
        }
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return reply('Enter a valid gold amount to gamble.');
    if (amount > 1_000_000) return reply('You can only slot up to 1,000,000 gold at once.');
    if (player.gold < amount) return reply('Not enough gold to slot.');

    const emojis = ['🍒', '🍋', '🍉', '⭐', '🔔'];
    const roll = () => emojis[Math.floor(Math.random() * emojis.length)];
    const [slot1, slot2, slot3] = [roll(), roll(), roll()];

    let result = `🎰 ${slot1} | ${slot2} | ${slot3}\n`;
    if (slot1 === slot2 && slot2 === slot3) {
      const win = amount * 3;
      player.gold += win;
      result += `🎉 Jackpot! You won ${win} gold!`;
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      const win = amount * 2;
      player.gold += win;
      result += `✨ Nice! You won ${win} gold!`;
    } else {
      player.gold -= amount;
      result += `😢 You lost ${amount} gold.`;
    }

    savePlayer();
    await reply(result);
  },
};
