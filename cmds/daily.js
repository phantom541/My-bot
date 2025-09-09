module.exports = {
  name: 'daily',
  description: 'Get a daily reward.',
  async execute(context) {
    const { reply } = context;
    // This is a placeholder for the daily reward logic, which would
    // check the last time the user claimed a reward and give them one if eligible.
    await reply('You have claimed your daily reward!');
  },
};
