const explorationEvents = require('../explorationData');

const EXPLORE_COOLDOWN = 5 * 60 * 1000; // 5 minutes

module.exports = {
  name: 'explore',
  description: 'Explore a location for a chance to find items or gold.',
  async execute(context) {
    const { sock, from, msg, player, args, savePlayer } = context;

    const location = args[0]?.toLowerCase();
    if (!location || !explorationEvents[location]) {
      return sock.sendMessage(from, { text: `You must specify a valid location to explore. Try: ${Object.keys(explorationEvents).join(', ')}` }, { quoted: msg });
    }

    const now = Date.now();
    if (player.cooldowns.explore && now < player.cooldowns.explore) {
      const remaining = new Date(player.cooldowns.explore - now).toISOString().substr(14, 5);
      return sock.sendMessage(from, { text: `You are too tired to explore. You can explore again in ${remaining}.` }, { quoted: msg });
    }

    player.cooldowns.explore = now + EXPLORE_COOLDOWN;

    const events = explorationEvents[location];
    const random = Math.random();
    let cumulativeChance = 0;
    let eventTriggered = false;
    let outcomeMessage = '';

    for (const event of events) {
      cumulativeChance += event.chance;
      if (random < cumulativeChance) {
        eventTriggered = true;
        outcomeMessage = event.text;
        switch(event.type) {
          case 'gold':
            player.gold += event.amount;
            break;
          case 'lose_gold':
            player.gold = Math.max(0, player.gold - event.amount);
            break;
          case 'item':
            player.inventory[event.id] = (player.inventory[event.id] || 0) + event.amount;
            break;
        }
        break;
      }
    }

    if (!eventTriggered) {
        outcomeMessage = "You explore the area but find nothing of interest.";
    }

    savePlayer();
    await sock.sendMessage(from, { text: outcomeMessage }, { quoted: msg });
  },
};
