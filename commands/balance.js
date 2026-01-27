module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description: 'Check your wallet and bank.',
    async execute({ sock, from, player, msg }) {
        const { progression } = player;
        const bank = player.bank || 0;
        await sock.sendMessage(from, {
            text: `💰 *Balance Summary*\n\n👛 Wallet: ${progression.wallet.toLocaleString()}\n🏦 Bank: ${bank.toLocaleString()}`
        }, { quoted: msg });
    }
};
