module.exports = {
  name: 'spawnpack6',
  description: 'Spawns a 6-card pack with guaranteed high-tier cards.',
  async execute(context) {
    const { activeCardPacks, from, reply, cards } = context;
    if (activeCardPacks[from]) {
        return reply('A card pack has already been spawned. Use %claimpack to get it.');
    }

    const sTierCards = cards.filter(c => c.tier === 'S');
    const tier6Cards = cards.filter(c => c.tier === '6');

    if (sTierCards.length === 0 || tier6Cards.length === 0) {
        return reply('Not enough high-tier cards available to create this pack.');
    }

    const guaranteedSTier = sTierCards[Math.floor(Math.random() * sTierCards.length)];
    const guaranteedTier6 = tier6Cards[Math.floor(Math.random() * tier6Cards.length)];

    const pack = [guaranteedSTier, guaranteedTier6];
    for (let i = 0; i < 4; i++) {
        pack.push(cards[Math.floor(Math.random() * cards.length)]);
    }

    activeCardPacks[from] = pack;

    let response = 'A 6-card pack has been spawned! It contains:\n\n';
    pack.forEach(card => {
        response += `- ${card.name} (Tier: ${card.tier})\n`;
    });
    response += '\nUse \`%claimpack\` to claim the entire pack.';

    await reply(response);
  },
};
