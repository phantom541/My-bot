module.exports = {
  name: 'party',
  description: 'View your active dragons (max 6).',
  async execute(context) {
    const { reply, player } = context;
    if (player.party.length === 0) return reply('Your party is empty.');
    let partyList = '*Your Party:*\n\n';
    player.party.forEach((d, i) => {
      partyList += `${i + 1}. *${d.name}* (Type: ${d.type}, Lvl: ${d.level})\n`;
      partyList += `  - Bonus Atk: ${d.bonus_attack || 0}\n`;
      partyList += `  - Bonus Def: ${d.bonus_defense || 0}\n`;
      partyList += '  - Moves:\n';
      d.moves.forEach(move => {
        partyList += `    • ${move.name} (Dmg: ${move.damage})\n`;
      });
      partyList += '\n';
    });
    await reply(partyList);
  },
};
