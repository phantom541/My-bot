module.exports = {
  name: 'dungeon',
  description: 'Enter a dungeon.',
  async execute(context) {
    const { reply } = context;
    // This is a placeholder for the dungeon logic
    await reply('You have entered the dungeon!');
  },
};
