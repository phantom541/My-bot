module.exports = {
  name: 'train',
  description: 'Train your dragons.',
  async execute(context) {
    const { player, cooldowns, reply, savePlayer } = context;
    const now = Date.now();
    const lastTrain = player.cooldowns.train || 0;
    if (now - lastTrain < cooldowns.train) {
        const remaining = cooldowns.train - (now - lastTrain);
        return reply(`Your dragons are tired. You can train them again in ${Math.ceil(remaining / 60000)} minutes.`);
    }
    player.cooldowns.train = now;
    savePlayer();
    await reply('You have trained your dragons! They are stronger now.');
  },
};
