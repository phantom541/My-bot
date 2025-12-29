// cmds/claimpack.js
const { getPlayer, updatePlayer } = require('../playerData');
const cards = require('../cardData');

module.exports = {
  name: 'claimpack',
  description: 'Open a card pack.',
  async execute(context) {
    const { reply, sender, CARD_PACK_SIZE } = context;
    const player = getPlayer(sender);

    if (!player.inventory['Card Pack'] || player.inventory['Card Pack'] < 1) {
      return reply('You do not have any card packs to open.');
    }

    player.inventory['Card Pack']--;

    let claimedCards = [];
    for (let i = 0; i < CARD_PACK_SIZE; i++) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      if (!player.pc) player.pc = [];
      player.pc.push(randomCard);
      claimedCards.push(randomCard.name);
    }
    updatePlayer(player);

    await reply(`You opened a card pack and received:\n- ${claimedCards.join('\n- ')}`);
  },
};
