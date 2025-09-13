module.exports = {
  name: 'flirt',
  description: 'Sends a flirtatious pickup line.',
  async execute(context) {
    const { reply, FLIRT_LINES } = context;
    const flirt = FLIRT_LINES[Math.floor(Math.random() * FLIRT_LINES.length)];
    await reply(flirt);
  },
};
