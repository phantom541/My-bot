const evolutionPaths = require('../evolutionData');
const allDragons = require('../dragonData');
const dragonToClassMap = require('../dragonToClassMap');

module.exports = {
  name: 'evolve',
  description: 'Evolve one of your dragons if it meets the requirements.',
  async execute(context) {
    const { sock, from, msg, player, args, savePlayer } = context;

    if (args.length === 0) {
      return sock.sendMessage(from, { text: 'You must specify the ID of the dragon in your party you wish to evolve. Example: `%evolve 1`' }, { quoted: msg });
    }

    const partyIndex = parseInt(args[0]) - 1;
    if (isNaN(partyIndex) || partyIndex < 0 || partyIndex >= player.party.length) {
      return sock.sendMessage(from, { text: 'Invalid party ID. Use `%party` to see your dragons.' }, { quoted: msg });
    }

    const dragonToEvolve = player.party[partyIndex];
    const evolutionPath = evolutionPaths[dragonToEvolve.id];

    if (!evolutionPath) {
      return sock.sendMessage(from, { text: `Your ${dragonToEvolve.name} has no known evolution.` }, { quoted: msg });
    }

    // Check requirements
    const reqs = evolutionPath.requirements;
    if (dragonToEvolve.level < reqs.level) {
      return sock.sendMessage(from, { text: `Your ${dragonToEvolve.name} must be at least Level ${reqs.level} to evolve.` }, { quoted: msg });
    }

    for (const itemId in reqs.items) {
      const requiredAmount = reqs.items[itemId];
      if (!player.inventory[itemId] || player.inventory[itemId] < requiredAmount) {
        return sock.sendMessage(from, { text: `You are missing required items. You need ${requiredAmount}x ${itemId}.` }, { quoted: msg });
      }
    }

    // Consume items
    for (const itemId in reqs.items) {
      player.inventory[itemId] -= reqs.items[itemId];
    }

    const evolvedDragonData = allDragons.find(d => d.id === evolutionPath.evolvesTo);

    // Create the new dragon object, keeping relevant stats
    const evolvedDragon = {
      ...evolvedDragonData,
      level: dragonToEvolve.level,
      xp: dragonToEvolve.xp,
      gender: dragonToEvolve.gender,
      bonus_attack: dragonToEvolve.bonus_attack || 0,
      bonus_defense: dragonToEvolve.bonus_defense || 0,
    };

    // Apply enhancements
    let enhancementMessage = '';
    if (evolutionPath.enhancements) {
      const enhancements = evolutionPath.enhancements;
      if (enhancements.classChange) {
        dragonToClassMap[evolvedDragon.id] = enhancements.classChange;
        enhancementMessage += `\nIts class has ascended to *${enhancements.classChange}*!`;
      }
      if (enhancements.moveDamageMultiplier) {
        evolvedDragon.moves.forEach(move => {
          move.damage = Math.floor(move.damage * enhancements.moveDamageMultiplier);
        });
        enhancementMessage += `\nIts moves are now more powerful!`;
      }
      if (enhancements.damageReduction) {
        // We'll store this as a new property on the dragon
        evolvedDragon.damageReduction = enhancements.damageReduction;
        enhancementMessage += `\nIt now takes less damage in battles!`;
      }
    }

    player.party[partyIndex] = evolvedDragon;
    savePlayer();

    let evolutionMessage = `*Congratulations! Your ${dragonToEvolve.name} has evolved into a ${evolvedDragonData.name}!* 🎉${enhancementMessage}`;

    await sock.sendMessage(from, {
        image: { url: evolvedDragonData.imageUrl },
        caption: evolutionMessage
    }, { quoted: msg });
  },
};
