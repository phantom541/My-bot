module.exports = {
  name: 'huntdragon',
  description: 'Spawn a specific high-level dragon.',
  async execute(context) {
    const { sock, from, args, reply, hasRole, activeWildEncounters, dragons } = context;

    if (!hasRole('mod')) {
      return reply('You do not have permission to use this command.');
    }

    const dragonName = args[0];
    const level = parseInt(args[1]);

    if (!dragonName || isNaN(level)) {
      return reply('Invalid usage. Use `%huntdragon <DragonName> <Level>`');
    }

    const dragonTemplate = dragons.find(d => d.name.toLowerCase() === dragonName.toLowerCase());

    if (!dragonTemplate) {
      return reply(`Dragon "${dragonName}" not found.`);
    }

    if (activeWildEncounters[from]) {
      return reply('There is already an active wild encounter in this chat.');
    }

    const dragonToSpawn = {
      ...dragonTemplate,
      level: level,
      hp: (dragonTemplate.moves.reduce((sum, move) => sum + move.damage, 0) * 5) * (1 + level / 10),
    };

    activeWildEncounters[from] = { dragon: dragonToSpawn, captured: false, spawnTime: Date.now() };

    await sock.sendMessage(from, { text: `A special level ${level} ${dragonToSpawn.name} (HP: ${dragonToSpawn.hp}) has appeared! Use %attack to battle it.` });
  },
};
