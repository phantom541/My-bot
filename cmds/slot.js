module.exports = {
  name: 'slot',
  description: 'Gamble your gold in the slot machine.',
  async execute(context) {
    const { from, getGroupSettings, args, player, savePlayer, reply, sock, msg } = context;

    if (from.endsWith('@g.us')) {
        const groupSettings = getGroupSettings(from);
        if (groupSettings && !groupSettings.slot) {
            return reply('The slot machine is disabled in this group.');
        }
    }

    let amount;
    if (args[0]?.toLowerCase() === 'all') {
        amount = player.gold;
    } else {
        amount = parseInt(args[0]);
    }

    if (isNaN(amount) || amount <= 0) {
        return reply('Enter a valid gold amount to gamble, or use `all`.');
    }
    if (amount > 1000000) {
        return reply('You can only slot up to 1,000,000 gold at once.');
    }
    if (player.gold < amount) {
        return reply('Not enough gold to slot.');
    }

    await sock.sendMessage(from, { text: `*🎰 Spinning the slots for ${amount} gold...*` }, { quoted: msg });

    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
    const roll = () => symbols[Math.floor(Math.random() * symbols.length)];
    const [s1, s2, s3] = [roll(), roll(), roll()];

    let win = 0;
    let message = '';

    if (s1 === s2 && s2 === s3) {
        if (s1 === '💎') {
            win = amount * 10;
            message = `💎 JACKPOT! ABSOLUTE WIN! You won ${win} gold! 💎`;
        } else if (s1 === '🔔') {
            win = amount * 5;
            message = `🔔 BIG WIN! You won ${win} gold! 🔔`;
        } else {
            win = amount * 3;
            message = `🎉 You got three ${s1}s! You won ${win} gold! 🎉`;
        }
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        win = amount * 2;
        message = `✨ Nice! A pair! You won ${win} gold! ✨`;
    }

    setTimeout(async () => {
        let resultText = `*--- [ 🎰 SLOT RESULT ] ---*\n`;
        resultText += `        *${s1} | ${s2} | ${s3}*\n`;
        resultText += `*--------------------------*\n\n`;

        if (win > 0) {
            player.gold += (win - amount);
            resultText += message;
        } else {
            player.gold -= amount;
            resultText += `😢 Bad luck! You lost ${amount} gold.`;
        }

        resultText += `\n\n*Your new balance:* ${player.gold} gold.`;

        savePlayer();
        await sock.sendMessage(from, { text: resultText }, { quoted: msg });
    }, 2000);
  },
};
