// cmds/gacha.js
const { getPlayer, updatePlayer } = require('../playerData');
const gachaData = require('../database/data/gachaData');
const cardData = require('../database/data/cardData');
const dragonData = require('../database/data/dragonData');

// --- Helper function for weighted random selection ---
function getWeightedRandom(items, probabilities) {
  const weightedItems = [];
  items.forEach(item => {
    const weight = probabilities[item.rarity] || 0;
    for (let i = 0; i < weight; i++) {
      weightedItems.push(item);
    }
  });

  if (weightedItems.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * weightedItems.length);
  return weightedItems[randomIndex];
}

module.exports = {
  name: 'gacha',
  description: 'Open a gacha case to get a random reward.',
  aliases: ['g'],
  async execute(sock, m, args) {
    const senderId = m.key.remoteJid;
    const player = getPlayer(senderId);

    if (args.length === 0) {
      let helpText = 'Available gacha cases:\n';
      for (const caseName in gachaData) {
        helpText += `- *${caseName}*: ${gachaData[caseName].cost} gold\n`;
      }
      return sock.sendMessage(m.chat, { text: helpText });
    }

    const caseName = args[0].toLowerCase();
    const gachaCase = gachaData[caseName];

    if (!gachaCase) {
      return sock.sendMessage(m.chat, { text: `Gacha case "${caseName}" not found.` });
    }

    if (player.gold < gachaCase.cost) {
      return sock.sendMessage(m.chat, { text: `You don't have enough gold! You need ${gachaCase.cost} gold.` });
    }

    // --- Deduct cost ---
    player.gold -= gachaCase.cost;

    // --- Get reward ---
    const reward = getWeightedRandom(gachaCase.rewards, gachaCase.probabilities);
    if (!reward) {
        player.gold += gachaCase.cost; // Refund
        updatePlayer(player);
        return sock.sendMessage(m.chat, { text: 'Sorry, an error occurred with the gacha. Your gold has been refunded.' });
    }

    let rewardMessage = '';
    let imageUrl = null;
    let rewardDetails = null;
    let success = false;

    if (reward.type === 'gold') {
      player.gold += reward.amount;
      rewardMessage = `You won ${reward.amount} gold!`;
      success = true;
    } else if (reward.type === 'card') {
      rewardDetails = cardData.find(c => c.id === reward.id);
      if (rewardDetails) {
        if (!player.cards) player.cards = [];
        player.cards.push(reward.id); // Store only the ID
        rewardMessage = `You got a [${rewardDetails.tier}] ${rewardDetails.name} card!`;
        imageUrl = rewardDetails.imageUrl;
        success = true;
      }
    } else if (reward.type === 'dragon') {
      rewardDetails = dragonData.find(d => d.id === reward.id);
      if (rewardDetails) {
        if (!player.den) player.den = [];
        player.den.push({ id: reward.id, uniqueId: Date.now() });
        rewardMessage = `You received a [${reward.rarity}] ${rewardDetails.name}!`;
        imageUrl = rewardDetails.imageUrl;
        success = true;
      }
    }

    if (!success) {
        player.gold += gachaCase.cost; // Refund on failure
        updatePlayer(player);
        console.error(`Gacha Error: Item with ID ${reward.id} of type ${reward.type} not found in data files.`);
        return sock.sendMessage(m.chat, { text: 'An error occurred while granting your reward. Your gold has been refunded.' });
    }

    updatePlayer(player);

    const messageOptions = {
      text: `🎉 *Gacha Result* 🎉\n\n${rewardMessage}`,
    };

    if (imageUrl) {
      messageOptions.image = { url: imageUrl };
      messageOptions.caption = messageOptions.text;
      delete messageOptions.text;
    }

    await sock.sendMessage(m.chat, messageOptions);
  },
};
