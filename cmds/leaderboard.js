module.exports = {
  name: 'leaderboard',
  description: 'View the richest players.',
  async execute(context) {
    const { args, getAllPlayers, reply, getRank } = context;
    const type = args[0]?.toLowerCase() || 'gold';
    const allPlayers = Object.values(getAllPlayers());

    let sortedPlayers;
    let leaderboard = '';

    switch (type) {
        case 'rank':
            sortedPlayers = allPlayers.sort((a, b) => b.playerLevel - a.playerLevel);
            leaderboard = '*Top 5 Players by Rank:*\n\n';
            sortedPlayers.slice(0, 5).forEach((p, i) => {
                leaderboard += `${i + 1}. ${p.name} - Level ${p.playerLevel} (${getRank(p.playerLevel)})\n`;
            });
            break;
        case 'dragon':
            const playersWithDragons = allPlayers.filter(p => p.party.length > 0);
            const sortedByDragon = playersWithDragons.sort((a, b) => {
                const aMaxLevel = Math.max(...a.party.map(d => d.level));
                const bMaxLevel = Math.max(...b.party.map(d => d.level));
                return bMaxLevel - aMaxLevel;
            });
            leaderboard = '*Top 5 Players by Dragon Level:*\n\n';
            sortedByDragon.slice(0, 5).forEach((p, i) => {
                const maxLevel = Math.max(...p.party.map(d => d.level));
                leaderboard += `${i + 1}. ${p.name} - Highest Dragon Level: ${maxLevel}\n`;
            });
            break;
        default: // gold
            sortedPlayers = allPlayers.sort((a, b) => b.gold - a.gold);
            leaderboard = '*Top 5 Richest Players:*\n\n';
            sortedPlayers.slice(0, 5).forEach((p, i) => {
                leaderboard += `${i + 1}. ${p.name} - ${p.gold} gold\n`;
            });
    }

    await reply(leaderboard);
  },
};
