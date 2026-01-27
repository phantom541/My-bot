module.exports = {
  name: 'catch',
  description: 'Catch the spawned wild dragon.',
  async execute(context) {
    const { activeWildEncounters, from, sender, reply, player, args, savePlayer, activeBattles } = context;
    const wildEncounter = activeWildEncounters[from];
    if (!wildEncounter) return reply('There is no wild dragon to catch.');

    if (wildEncounter.isExclusive && wildEncounter.spawnerId !== sender) {
        return reply('This dragon was spawned by another player. You must wait until their exclusive time is up.');
    }

    const wildDragon = wildEncounter.dragon;
    if (activeBattles[from]) return reply('You cannot catch a dragon while in battle.');

    const tool = args[0]?.toLowerCase();
    if (!tool) return reply('Please specify a tool to use for catching.');
    if (!player.inventory[tool] || player.inventory[tool] <= 0) {
      return reply(`You don't have any ${tool}.`);
    }

    player.inventory[tool]--;
    wildDragon.captured = true;

    player.den.push(wildDragon);

    delete activeWildEncounters[from];
    savePlayer();

    await reply(`Congratulations! You caught the ${wildDragon.name}! It has been sent to your den.`);
  },
};
