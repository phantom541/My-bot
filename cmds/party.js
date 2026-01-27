module.exports = {
  name: 'party',
  description: 'View your active dragons (max 6).',
  async execute(context) {
    const { reply, player } = context;
    if (player.party.length === 0) return reply('Your party is empty.');
    let partyList = '*Your Party:*\n\n';
    player.party.forEach((d, i) => {
      partyList += `${i + 1}. *${d.name}* (Type: ${d.type})\n`;
      d.moves.forEach(move => {
        partyList += `  - ${move.name}\n`;
      });
      partyList += '\n';
    });
    await reply(partyList);
  },
};
