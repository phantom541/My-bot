// placeholder for guildwar.js
module.exports = {
  name: 'guildwar',
  description: 'Declare war on another guild (Feature in development).',
  async execute(context) {
    const { sock, from, msg } = context;
    await sock.sendMessage(from, { text: 'The Guild War system is currently in development and will be available in a future update!' }, { quoted: msg });
  },
};
