// placeholder for auction.js
module.exports = {
  name: 'auction',
  description: 'Auction your items to other players (Feature in development).',
  async execute(context) {
    const { sock, from, msg } = context;
    await sock.sendMessage(from, { text: 'The Auction House is currently in development and will be available in a future update!' }, { quoted: msg });
  },
};
