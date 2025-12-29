// cmds/daily.js
const { getPlayer, updatePlayer } = require('../playerData');

const DAILY_REWARD = 500;
const COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

module.exports = {
  name: 'daily',
  description: 'Claim your daily reward.',
  async execute(context) {
    const { reply, sender } = context;
    const player = getPlayer(sender);

    const now = Date.now();
    if (player.cooldowns.daily && now < player.cooldowns.daily) {
      const remaining = new Date(player.cooldowns.daily - now).toISOString().substr(11, 8);
      return reply(`You have already claimed your daily reward. Please wait ${remaining}.`);
    }

    player.wallet += DAILY_REWARD;
    player.cooldowns.daily = now + COOLDOWN;
    updatePlayer(player);

    await reply(`You have claimed your daily reward of $${DAILY_REWARD}!`);
  },
};
