module.exports = {
  name: 'choose',
  description: 'Choose your starter dragon.',
  async execute(context) {
    const { sock, from, msg, player, savePlayer, args, dragons, STARTER_DRAGON_IDS } = context;

    if (!player.adventureStarted) {
      return sock.sendMessage(from, { text: 'You need to start your adventure first! Use `%start-hunt`.' }, { quoted: msg });
    }

    if (player.party && player.party.length > 0) {
      return sock.sendMessage(from, { text: 'You have already chosen your first dragon!' }, { quoted: msg });
    }

    const chosenId = parseInt(args[0]);
    if (isNaN(chosenId) || !STARTER_DRAGON_IDS.includes(chosenId)) {
      return sock.sendMessage(from, { text: 'That is not a valid starter dragon ID. Please choose from the list provided.' }, { quoted: msg });
    }

    const chosenDragon = dragons.find(d => d.id === chosenId);
    if (!chosenDragon) {
        return sock.sendMessage(from, { text: 'An error occurred. That dragon could not be found.'}, { quoted: msg });
    }

    player.party.push({ ...chosenDragon, level: 1, xp: 0 });
    savePlayer();

    await sock.sendMessage(from, { text: `Congratulations! You have chosen *${chosenDragon.name}* as your first companion. Your adventure awaits!` }, { quoted: msg });
  },
};
