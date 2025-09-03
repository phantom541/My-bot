module.exports = {
  name: 'dungeon',
  description: 'Interact with the active dungeon.',
  async execute(context) {
    const { args, activeDungeons, from, reply, sender, activeBattles } = context;
    const subCommand = args[0]?.toLowerCase();
    const dungeon = activeDungeons[from];

    if (!dungeon) return reply('There is no active dungeon.');

    switch (subCommand) {
        case 'start':
            if (dungeon.party.length === 0) return reply('The dungeon party is empty.');
            if (dungeon.party[0].id !== sender) return reply('Only the party leader (the first to enter) can start the dungeon.');
            if (dungeon.status === 'running') return reply('The dungeon has already been started.');

            dungeon.status = 'running';

            const dungeonId = from;
            setTimeout(() => {
                if (activeDungeons[dungeonId] && activeDungeons[dungeonId].status === 'running') {
                    delete activeDungeons[dungeonId];
                    context.sock.sendMessage(dungeonId, { text: `The party took too long to clear the "${dungeon.name}" dungeon, and it has collapsed!` });
                }
            }, 30 * 60 * 1000);

            const firstMonster = dungeon.monster_layout.floor1[0];
            const playerToFight = dungeon.party[0];

            activeBattles[from] = {
                player: playerToFight,
                playerDragon: { level: 5, xp: 0, ...playerToFight.party[0] },
                opponentDragon: firstMonster,
                turn: 'player',
                environment: dungeon.environment,
                isDungeonBattle: true
            };

            await reply(`The dungeon crawl has begun! ${playerToFight.name} steps forward to face a ${firstMonster.name} on Floor 1!`);
            break;

        default:
            await reply('Invalid dungeon command. Use `%dungeon start`.');
    }
  },
};
