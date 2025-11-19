module.exports = {
  name: 'leaderboard',
  description: 'View the richest players.',
  aliases: ['lb'],
  async execute(context) {
    const { sock, from, msg, getAllPlayers } = context;

    const allPlayers = getAllPlayers();

    // Filter out players with no gold and calculate net worth
    const playersWithGold = Object.values(allPlayers).filter(p => (p.gold || 0) + (p.bank || 0) > 0);

    if (playersWithGold.length === 0) {
      return sock.sendMessage(from, { text: 'There are no players with gold to rank yet.' }, { quoted: msg });
    }

    // Sort players by their net worth (gold + bank)
    playersWithGold.sort((a, b) => {
        const netWorthA = (a.gold || 0) + (a.bank || 0);
        const netWorthB = (b.gold || 0) + (b.bank || 0);
        return netWorthB - netWorthA;
    });

    const topPlayers = playersWithGold.slice(0, 10);

    let leaderboardMessage = `🏆 *Global Wealth Leaderboard* 🏆\n\n`;
    leaderboardMessage += 'Here are the top 10 richest players:\n\n';

    topPlayers.forEach((player, index) => {
        const netWorth = (player.gold || 0) + (player.bank || 0);
        leaderboardMessage += `${index + 1}. *${player.name}* - ${netWorth.toLocaleString()} Gold\n`;
    });

    await sock.sendMessage(from, { text: leaderboardMessage }, { quoted: msg });
  },
};
