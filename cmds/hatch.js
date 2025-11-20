const allDragons = require('../dragonData');

module.exports = {
  name: 'hatch',
  description: 'Hatch an egg that is ready.',
  async execute(context) {
    const { sock, from, msg, player, savePlayer, cloudinary } = context;

    if (!player.eggs || player.eggs.length === 0) {
      return sock.sendMessage(from, { text: 'You have no eggs to hatch. Use `%breed` to create one.' }, { quoted: msg });
    }

    const readyEggIndex = player.eggs.findIndex(egg => Date.now() >= egg.hatchTime);

    if (readyEggIndex === -1) {
      const firstEgg = player.eggs[0];
      const timeRemaining = new Date(firstEgg.hatchTime - Date.now()).toISOString().substr(11, 8);
      return sock.sendMessage(from, { text: `Your egg is not ready yet. Time remaining: ${timeRemaining}` }, { quoted: msg });
    }

    if (player.party.length >= 6) {
      return sock.sendMessage(from, { text: 'Your party is full. Make room for your new dragon before hatching the egg.' }, { quoted: msg });
    }

    const eggToHatch = player.eggs.splice(readyEggIndex, 1)[0];

    // Choose one of the parents' species for the baby's base stats
    const parent1 = allDragons.find(d => d.id === eggToHatch.parent1_id);
    const parent2 = allDragons.find(d => d.id === eggToHatch.parent2_id);
    const baseDragon = Math.random() < 0.5 ? parent1 : parent2;

    const name1 = parent1.name.substring(0, Math.floor(parent1.name.length / 2));
    const name2 = parent2.name.substring(Math.floor(parent2.name.length / 2));
    const hybridName = `${name1}${name2}`;

    // Create the composite image using Cloudinary
    const compositeImageUrl = cloudinary.url(eggToHatch.parent1_image, {
        transformation: [
            { width: 800, height: 600, crop: 'fill' },
            {
                overlay: {
                    url: eggToHatch.parent2_image
                },
                width: 800,
                height: 600,
                crop: 'fill',
                opacity: 50, // Make the second parent semi-transparent
                effect: 'fliph'
            }
        ]
    });

    const babyDragon = {
      ...baseDragon,
      name: hybridName,
      level: 1,
      xp: 0,
      gender: Math.random() < 0.5 ? 'Male' : 'Female',
      imageUrl: compositeImageUrl,
      moves: baseDragon.moves.slice(0, 2) // Inherit first two moves
    };

    player.party.push(babyDragon);
    savePlayer();

    const hatchMessage = `*CRACK!* Your egg has hatched into a baby ${babyDragon.name}! It has inherited traits from both parents.`;

    try {
        await sock.sendMessage(from, {
            image: { url: babyDragon.imageUrl },
            caption: hatchMessage
        }, { quoted: msg });
    } catch (e) {
        console.error("Failed to send composite hatch image:", e);
        await sock.sendMessage(from, { text: `${hatchMessage}\n(Image failed to generate)` }, { quoted: msg });
    }
  },
};
