module.exports = {
  name: 'breed',
  description: 'Breed two dragons from your party to create an egg.',
  async execute(context) {
    const { sock, from, msg, player, args, savePlayer } = context;

    if (args.length < 2) {
      return sock.sendMessage(from, { text: 'You must specify the party IDs of two dragons to breed. Example: `%breed 1 2`' }, { quoted: msg });
    }

    const index1 = parseInt(args[0]) - 1;
    const index2 = parseInt(args[1]) - 1;

    if (isNaN(index1) || isNaN(index2) || index1 === index2 || !player.party[index1] || !player.party[index2]) {
      return sock.sendMessage(from, { text: 'Please provide two valid and different party IDs.' }, { quoted: msg });
    }

    const parent1 = player.party[index1];
    const parent2 = player.party[index2];

    if (!player.eggs) {
      player.eggs = [];
    }

    if (player.eggs.length >= 5) { // Limit to 5 eggs at a time
      return sock.sendMessage(from, { text: 'You have too many eggs. You must hatch one before breeding again.' }, { quoted: msg });
    }

    const HATCH_TIME = 24 * 60 * 60 * 1000; // 24 hours

    const newEgg = {
      parent1_id: parent1.id,
      parent2_id: parent2.id,
      parent1_image: parent1.imageUrl,
      parent2_image: parent2.imageUrl,
      hatchTime: Date.now() + HATCH_TIME,
    };

    player.eggs.push(newEgg);
    savePlayer();

    await sock.sendMessage(from, { text: `Success! You have bred ${parent1.name} and ${parent2.name}. An egg has been created! It will be ready to hatch in 24 hours. Use \`%hatch\` to check on it.` }, { quoted: msg });
  },
};
