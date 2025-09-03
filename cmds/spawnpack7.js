module.exports = {
  name: 'spawnpack7',
  description: 'Spawns a 7-card pack with one card from each tier.',
  async execute(context) {
    const { activeCardPacks, from, reply, cards } = context;
    if (activeCardPacks[from]) {
        return reply('A card pack has already been spawned. Use %claimpack to get it.');
    }

    const tiers = ['1', '2', '3', '4', '5', '6', 'S'];
    const pack = [];

    for (const tier of tiers) {
        const cardsInTier = cards.filter(c => c.tier === tier);
        if (cardsInTier.length === 0) {
            return reply(`Not enough cards in tier ${tier} to create this pack.`);
        }
        pack.push(cardsInTier[Math.floor(Math.random() * cardsInTier.length)]);
    }

    activeCardPacks[from] = pack;

    let response = 'A 7-card pack has been spawned! It contains:\n\n';
    pack.forEach(card => {
        response += `- ${card.name} (Tier: ${card.tier})\n`;
    });
    response += '\nUse \`%claimpack\` to claim the entire pack.';

    await reply(response);
  },
};
