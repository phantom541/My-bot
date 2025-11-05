module.exports = {
  name: 'spawn',
  description: 'Spawns a wild dragon.',
  async execute(context) {
    const { wildSpawnsEnabled, activeWildEncounters, from, player, cooldowns, savePlayer, reply, dragons, sender, sock } = context;
    if (!wildSpawnsEnabled.enabled) return reply('Wild spawns are currently disabled.');
    if (activeWildEncounters[from]) return reply('A wild dragon has already spawned in this chat.');

    const now = Date.now();
    const lastSpawn = player.cooldowns.spawn || 0;
    if (now - lastSpawn < cooldowns.spawn) {
      const remaining = cooldowns.spawn - (now - lastSpawn);
      return reply(`You must wait ${Math.ceil(remaining / 60000)} more minutes to spawn a dragon.`);
    }

    const randomDragon = { ...dragons[Math.floor(Math.random() * dragons.length)] };
    randomDragon.level = Math.floor(Math.random() * 16) + 5; // Level 5-20
    const totalDamage = randomDragon.moves.reduce((sum, move) => sum + move.damage, 0);
    randomDragon.hp = Math.floor((totalDamage * 5) * (1 + randomDragon.level / 10));

    activeWildEncounters[from] = {
        dragon: randomDragon,
        captured: false,
        spawnerId: sender,
        spawnTime: now,
        isExclusive: true
    };

    player.cooldowns.spawn = now;
    savePlayer();

    await reply(`A wild ${randomDragon.name} (HP: ${randomDragon.hp}) has appeared! You have 1 minute to catch it before it becomes available to everyone.`);

    setTimeout(async () => {
        if (activeWildEncounters[from] && activeWildEncounters[from].isExclusive) {
            activeWildEncounters[from].isExclusive = false;
            await sock.sendMessage(from, { text: `Your time limit is up, anyone can hunt this dragon now!` });
        }
    }, 1 * 60 * 1000);

    setTimeout(async () => {
        if (activeWildEncounters[from] && !activeWildEncounters[from].captured) {
            delete activeWildEncounters[from];
            await sock.sendMessage(from, { text: `The wild ${randomDragon.name} flew away.` });
        }
    }, 3 * 60 * 1000);
  },
};
