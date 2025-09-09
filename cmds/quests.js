module.exports = {
  name: 'quests',
  description: 'View and complete quests.',
  async execute(context) {
    const { reply } = context;
    await reply('Here are your available quests.');
  },
};
