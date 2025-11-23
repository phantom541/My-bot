const { addPlayerXp } = require('../leveling.js');

module.exports = {
  name: 'train',
  description: 'Train your dragons and gain XP.',
  async execute(context) {
    const { player, cooldowns, reply, savePlayer, sock, from, PLAYER_XP_GAIN } = context;
    const now = Date.now();
    const lastTrain = player.cooldowns.train || 0;
    if (now - lastTrain < cooldowns.train) {
        const remaining = cooldowns.train - (now - lastTrain);
        return reply(`Your dragons are tired. You can train them again in ${Math.ceil(remaining / 60000)} minutes.`);
    }

    player.cooldowns.train = now;

    // Add player XP using the centralized function
    await addPlayerXp(sock, from, player, PLAYER_XP_GAIN, context);

    savePlayer(); // The leveling function already saves, but this is a good safety measure.
    await reply(`You have trained your dragons and gained ${PLAYER_XP_GAIN} player XP!`);
  },
};
