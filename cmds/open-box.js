const allItems = require('../items');

module.exports = {
  name: 'open-box',
  description: 'Open a lootbox from your inventory.',
  async execute(context) {
    const { sock, from, msg, player, args, savePlayer } = context;

    const lootboxId = args[0];
    if (!lootboxId) {
      return sock.sendMessage(from, { text: 'You must specify which lootbox to open. Example: `%open-box common_lootbox`' }, { quoted: msg });
    }

    const lootbox = allItems[lootboxId];
    if (!lootbox || lootbox.type !== 'lootbox') {
      return sock.sendMessage(from, { text: 'That is not a valid lootbox.' }, { quoted: msg });
    }

    if (!player.inventory[lootboxId] || player.inventory[lootboxId] < 1) {
      return sock.sendMessage(from, { text: `You do not have a ${lootbox.name}.` }, { quoted: msg });
    }

    // Consume the lootbox
    player.inventory[lootboxId] -= 1;
    if (player.inventory[lootboxId] <= 0) {
      delete player.inventory[lootboxId];
    }

    let rewardMessage = `*You open the ${lootbox.name}...*\n\n`;

    // Determine the reward
    const random = Math.random();
    let cumulativeChance = 0;
    let rewardGiven = false;

    for (const reward of lootbox.rewards) {
      cumulativeChance += reward.chance;
      if (random < cumulativeChance) {
        rewardGiven = true;
        switch(reward.type) {
          case 'gold':
            const goldAmount = Math.floor(Math.random() * (reward.amount[1] - reward.amount[0] + 1)) + reward.amount[0];
            player.gold += goldAmount;
            rewardMessage += `You found ${goldAmount} gold!`;
            break;
          case 'item':
            const itemAmount = Math.floor(Math.random() * (reward.amount[1] - reward.amount[0] + 1)) + reward.amount[0];
            player.inventory[reward.id] = (player.inventory[reward.id] || 0) + itemAmount;
            rewardMessage += `You found ${itemAmount}x ${allItems[reward.id].name}!`;
            break;
        }
        break; // Stop after giving one reward
      }
    }

    if (!rewardGiven) {
      // Fallback in case of rounding errors in chances
      rewardMessage += 'It was empty... how unlucky!';
    }

    savePlayer();
    await sock.sendMessage(from, { text: rewardMessage }, { quoted: msg });
  },
};
