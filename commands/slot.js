const { saveDb } = require('../database/index');

module.exports = {
    name: 'slot',
    description: 'Gamble your wallet money in the slot machine.',
    cooldown: 5,
    async execute({ sock, from, player, args, msg, config }) {
        const maxBet = config.economy.maxBet;
        let amount;

        if (args[0]?.toLowerCase() === 'all') {
            amount = Math.min(player.progression.wallet, maxBet);
        } else {
            amount = parseInt(args[0]);
        }

        if (isNaN(amount) || amount <= 0) {
            return sock.sendMessage(from, { text: '❌ Enter a valid amount to gamble.' }, { quoted: msg });
        }

        if (amount > maxBet) {
            return sock.sendMessage(from, { text: `❌ The maximum bet is ${maxBet.toLocaleString()}!` }, { quoted: msg });
        }

        if (player.progression.wallet < amount) {
            return sock.sendMessage(from, { text: '❌ You don\'t have enough money in your wallet!' }, { quoted: msg });
        }

        player.progression.wallet -= amount;
        saveDb();

        const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
        const roll = () => symbols[Math.floor(Math.random() * symbols.length)];
        const [s1, s2, s3] = [roll(), roll(), roll()];

        let win = 0;
        let resultMsg = '';

        if (s1 === s2 && s2 === s3) {
            if (s1 === '💎') win = amount * 10;
            else if (s1 === '🔔') win = amount * 5;
            else win = amount * 3;
            resultMsg = `💎 *JACKPOT!* You won ${win.toLocaleString()}!`;
        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
            win = amount * 2;
            resultMsg = `✨ *Nice!* A pair! You won ${win.toLocaleString()}!`;
        } else {
            resultMsg = `😢 *Bad luck!* You lost ${amount.toLocaleString()}.`;
        }

        if (win > 0) {
            player.progression.wallet += win;
            saveDb();
        }

        let slotDisplay = `*🎰 [ SLOT MACHINE ] 🎰*\n`;
        slotDisplay += `----------------------\n`;
        slotDisplay += `      ${s1} | ${s2} | ${s3}\n`;
        slotDisplay += `----------------------\n\n`;
        slotDisplay += `${resultMsg}\n`;
        slotDisplay += `👛 Wallet: ${player.progression.wallet.toLocaleString()}`;

        await sock.sendMessage(from, { text: slotDisplay }, { quoted: msg });
    }
};
