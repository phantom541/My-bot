// cmds/slot.js
const { getPlayer, updatePlayer } = require('../playerData');

const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '⭐', '💎', '7️⃣'];
const payouts = {
  '🍒🍒🍒': 5,
  '🍋🍋🍋': 10,
  '🍊🍊🍊': 15,
  '🍇🍇🍇': 20,
  '🍉🍉🍉': 25,
  '⭐⭐⭐': 50,
  '💎💎💎': 100,
  '7️⃣7️⃣7️⃣': 500,
};

module.exports = {
  name: 'slot',
  description: 'Play the slot machine.',
  async execute(context) {
    const { args, reply, sender } = context;
    const player = getPlayer(sender);

    if (args.length === 0) {
      return reply('Please specify an amount to bet.');
    }

    const bet = parseInt(args[0]);
    if (isNaN(bet) || bet <= 0) {
      return reply('Invalid bet amount.');
    }

    if (player.wallet < bet) {
      return reply("You don't have enough money to place that bet.");
    }

    player.wallet -= bet;

    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

    const result = `${reel1}${reel2}${reel3}`;
    const win = payouts[result] ? payouts[result] * bet : 0;

    let resultMessage = `[ ${reel1} | ${reel2} | ${reel3} ]\n\n`;
    if (win > 0) {
      player.wallet += win;
      resultMessage += `Congratulations! You won $${win.toLocaleString()}!`;
    } else {
      resultMessage += 'Sorry, you lost. Better luck next time!';
    }

    updatePlayer(player);
    await reply(resultMessage);
  },
};
