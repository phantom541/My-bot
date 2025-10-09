module.exports = {
  name: 'dungeons',
  description: 'View available dungeons.',
  async execute(context) {
    const { reply } = context;
    // This is a placeholder for the dungeons list logic
    await reply('Here are the available dungeons.');
  },
};
