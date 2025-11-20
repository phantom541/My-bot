const starterDragonMap = require('../starterDragonMap');
const allDragons = require('../dragonData');

module.exports = {
  name: 'choose',
  description: 'Choose your starter dragon to begin your adventure.',
  async execute(context) {
    const { sock, from, msg, player, savePlayer, args, typeEffectiveness, getRank, XP_PER_LEVEL } = context;

    // Prevent players from choosing again if they already have a dragon
    if (player.party && player.party.length > 0) {
      return sock.sendMessage(from, { text: 'You have already chosen your first dragon! Use `%party` to see your companion.' }, { quoted: msg });
    }

    // Consolidate all possible starter dragon IDs from our map
    const allStarterIds = Object.values(starterDragonMap).flat();

    const chosenId = parseInt(args[0]);
    if (isNaN(chosenId) || !allStarterIds.includes(chosenId)) {
      return sock.sendMessage(from, { text: 'That is not a valid starter dragon ID. Please use `%viewclass` to see the available dragons and choose one of their IDs.' }, { quoted: msg });
    }

    const chosenDragonData = allDragons.find(d => d.id === chosenId);
    if (!chosenDragonData) {
        return sock.sendMessage(from, { text: 'An error occurred. That dragon could not be found.' }, { quoted: msg });
    }

    // Create a fresh instance of the dragon for the player
    const newDragon = {
        ...chosenDragonData,
        level: 1,
        xp: 0,
        gender: Math.random() < 0.5 ? 'Male' : 'Female' // Assign a random gender for flavor
    };

    player.party.push(newDragon);
    player.adventureStarted = true; // Unlock the bot's features for the player
    savePlayer();

    // Construct a detailed summary of the chosen dragon
    let summary = `🎉 *Congratulations! You have chosen ${newDragon.name}!* 🎉\n\n`;
    summary += `A bond has formed between you and your new companion. Take good care of it!\n\n`;
    summary += `*📜 Dragon Details:*\n`;
    summary += `*ID:* ${newDragon.id}\n`;
    summary += `*Name:* ${newDragon.name}\n`;
    summary += `*Gender:* ${newDragon.gender}\n`;
    summary += `*Level:* ${newDragon.level} (${newDragon.xp}/${XP_PER_LEVEL} XP)\n`;
    summary += `*Rank:* ${getRank(newDragon.level)}\n`;
    summary += `*Type:* ${newDragon.type}\n\n`;

    // Display strengths and weaknesses based on type
    const effectiveness = typeEffectiveness[newDragon.type];
    if (effectiveness) {
        if (effectiveness.strongAgainst && effectiveness.strongAgainst.length > 0) {
            summary += `*💪 Strong Against:* ${effectiveness.strongAgainst.join(', ')}\n`;
        }
        if (effectiveness.weakAgainst && effectiveness.weakAgainst.length > 0) {
            summary += `*💔 Weak Against:* ${effectiveness.weakAgainst.join(', ')}\n`;
        }
    }
    summary += `\n`;

    // List the dragon's abilities
    summary += `*✨ Abilities:*\n`;
    newDragon.moves.forEach(move => {
        summary += `  - ${move.name} (Damage: ${move.damage}, Type: ${move.type})\n`;
    });
    summary += `\n`;

    summary += `Your adventure can now truly begin! Use \`%profile\` to see your status and \`%party\` to view your dragon.`;

    // Send the summary along with the dragon's image
    try {
      await sock.sendMessage(from, {
          image: { url: newDragon.imageUrl },
          caption: summary
      }, { quoted: msg });
    } catch (imgError) {
      console.error(`Failed to send chosen dragon image for "${newDragon.name}":`, imgError);
      await sock.sendMessage(from, { text: summary }, { quoted: msg }); // Fallback to text-only
    }
  },
};
