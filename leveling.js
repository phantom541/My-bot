// leveling.js
const { updatePlayer } = require('./playerData');
const dragons = require('./dragonData');
const beasts = require('./beastData');

async function addPlayerXp(sock, from, player, amount, context) {
  player.playerXp += amount;

  let levelUp = false;
  while (player.playerXp >= (player.playerLevel * 100)) {
    player.playerXp -= (player.playerLevel * 100);
    player.playerLevel++;
    levelUp = true;
  }

  if (levelUp) {
    await sock.sendMessage(from, { text: `Congratulations, ${player.name}! You've reached Level ${player.playerLevel}!` });

    // Check for max rank reward
    const currentRank = context.getRank(player.playerLevel);
    if (currentRank === 'Dragon God' && !player.maxRankRewardClaimed) {
      giveMaxRankReward(sock, from, player);
      player.maxRankRewardClaimed = true;
    }
  }

  updatePlayer(player);
}

async function giveMaxRankReward(sock, from, player) {
  // Grant rewards
  player.gold += 2000000000;
  if (!player.roles.includes('owner')) {
    player.roles.push('owner');
  }

  // Add 3 most powerful dragons
  const powerfulDragons = dragons.slice(-3);
  powerfulDragons.forEach(dragon => {
    player.den.push({ ...dragon, level: 1, xp: 0 });
  });

  // Add 2 Colossal Beasts
  if (!player.beasts) player.beasts = [];
  player.beasts.push(beasts[0], beasts[1]);

  updatePlayer(player);

  // Announce the reward
  let rewardMessage = `*🏆 A CHAMPION ASCENDS! 🏆*\n\n`;
  rewardMessage += `${player.name} has reached the maximum rank of Dragon God and has claimed the ultimate reward!\n\n`;
  rewardMessage += `- Granted the **Owner** role!\n`;
  rewardMessage += `- Received **2,000,000,000 Gold**!\n`;
  rewardMessage += `- Tamed **3 Legendary Dragons**!\n`;
  rewardMessage += `- Mastered **2 Colossal Beasts**!`;

  await sock.sendMessage(from, { text: rewardMessage, mentions: [player.id] });
}

module.exports = { addPlayerXp };
