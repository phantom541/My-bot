const axios = require('axios');

module.exports = {
  name: 'attack',
  description: 'Attack a spawned wild dragon.',
  async execute(context) {
    const { activeBattles, from, reply, activeWildEncounters, sender, player, BATTLE_ENVIRONMENTS, generateBattleImage, sock, msg } = context;
    if (activeBattles[from]) return reply('You are already in a battle.');
    const wildEncounter = activeWildEncounters[from];
    if (!wildEncounter) return reply('There is no wild dragon to attack.');

    if (wildEncounter.isExclusive && wildEncounter.spawnerId !== sender) {
        return reply('This dragon was spawned by another player. You must wait until their exclusive time is up.');
    }

    const wildDragon = wildEncounter.dragon;
    if (player.party.length === 0) return reply('You have no dragons in your party to battle with.');

    const playerDragon = { level: 5, xp: 0, ...player.party[0] };
    const totalPlayerDamage = playerDragon.moves.reduce((sum, move) => sum + move.damage, 0);
    playerDragon.hp = Math.floor((totalPlayerDamage * 5) * (1 + playerDragon.level / 10));

    const environment = BATTLE_ENVIRONMENTS[Math.floor(Math.random() * BATTLE_ENVIRONMENTS.length)];
    activeBattles[from] = {
        player,
        playerDragon,
        opponentDragon: wildDragon,
        turn: 'player',
        environment: environment
    };

    const battleImageUrl = await generateBattleImage(playerDragon, wildDragon, environment);
    if (battleImageUrl) {
        try {
            const imageResponse = await axios.get(battleImageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imageResponse.data, 'binary');
            await sock.sendMessage(from, { image: imageBuffer, caption: `*A battle begins in the ${environment.name}!*` }, { quoted: msg });
        } catch (imgError) {
            console.error("Failed to send generated battle image:", imgError);
            await reply(`*A battle begins in the ${environment.name}!* (Image generation failed)`);
        }
    }

    let battleGuide = `*You have engaged the wild ${wildDragon.name}!*\n\n`;
    battleGuide += `*Your ${playerDragon.name}* (HP: ${playerDragon.hp})\n`;
    battleGuide += `*Wild ${wildDragon.name}* (HP: ${wildDragon.hp})\n\n`;
    battleGuide += `It's your turn! Use \`%battle fight <1-4>\` to attack.\n`;
    playerDragon.moves.forEach((move, i) => {
        battleGuide += `${i + 1}. ${move.name}\n`;
    });

    await reply(battleGuide);
  },
};
