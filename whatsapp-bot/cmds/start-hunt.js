module.exports = {
  name: 'start-hunt',
  description: 'Start your adventure and choose a dragon.',
  async execute(context) {
    const { reply } = context;
    await reply(`Welcome, adventurer! Your journey begins now. Please choose your starter dragon.`);
  },
};
