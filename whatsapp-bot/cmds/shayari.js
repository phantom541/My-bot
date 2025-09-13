module.exports = {
  name: 'shayari',
  description: 'Sends a line of shayari.',
  async execute(context) {
    const { reply, SHAYARI } = context;
    const line = SHAYARI[Math.floor(Math.random() * SHAYARI.length)];
    await reply(line);
  },
};
