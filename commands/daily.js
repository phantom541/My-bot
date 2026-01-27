module.exports = {
    name: 'daily',
    description: 'Claim your daily infusion of gold.',
    cooldown: 86400, // 24 hours
    async execute({ sock, from, player, msg }) {
        const reward = 500;
        player.progression.wallet += reward;
        player.profile.last_daily = Date.now();
        // Database is saved by the command handler or manually?
        // Actually, my command handler doesn't auto-save. I should make it auto-save or call saveDb.
        // I'll call saveDb here.
        require('../database/index').saveDb();

        await sock.sendMessage(from, { text: `🎁 *Daily Infusion:* You received ${reward} gold! Your wallet now has ${player.progression.wallet.toLocaleString()} gold.` }, { quoted: msg });
    }
};
