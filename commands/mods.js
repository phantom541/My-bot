module.exports = {
  name: 'mods',
  description: 'View the list of bot moderators.',
  async execute(context) {
    const { reply } = context;
    await reply('Here is the list of moderators.');
  },
};
