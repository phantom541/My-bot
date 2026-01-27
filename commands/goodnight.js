module.exports = {
  name: 'goodnight',
  description: 'Says goodnight.',
  async execute(context) {
    const { reply } = context;
    await reply('Goodnight! Sleep well.');
  },
};
