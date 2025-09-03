module.exports = {
  name: 'tournament',
  description: 'Manage and participate in tournaments.',
  async execute(context) {
    const { args, from, sender, player, hasRole, activeTournaments, reply } = context;
    const subCommand = args[0]?.toLowerCase();
    const tournament = activeTournaments[from];

    switch (subCommand) {
        case 'create': {
            if (!hasRole('mod')) return reply('You do not have permission to create a tournament.');
            if (tournament) return reply(`A tournament named "${tournament.name}" is already active in this group.`);

            const name = args.slice(1).join(' ');
            if (!name) return reply('Please provide a name for the tournament. Usage: `%tournament create <name>`');

            activeTournaments[from] = {
                id: from,
                name: name,
                status: 'registering',
                organizer: { id: sender, name: player.name },
                participants: [],
                bracket: []
            };

            await reply(`A new tournament, "${name}", has been created by ${player.name}!\n\nType \`%tournament join\` to enter. Registration is now open!`);
            break;
        }
        case 'join': {
            if (!tournament) return reply('There is no active tournament to join.');
            if (tournament.status !== 'registering') return reply('Tournament registration is currently closed.');

            const alreadyJoined = tournament.participants.find(p => p.id === sender);
            if (alreadyJoined) return reply('You have already joined this tournament.');

            tournament.participants.push({ id: sender, name: player.name });
            await reply(`${player.name} has joined the "${tournament.name}" tournament!`);
            break;
        }
        case 'start': {
            if (!tournament) return reply('There is no active tournament.');
            if (tournament.organizer.id !== sender) return reply('Only the tournament organizer can start the tournament.');
            if (tournament.status !== 'registering') return reply('The tournament has already started or is finished.');
            if (tournament.participants.length < 2) return reply('Not enough players have joined to start the tournament.');

            tournament.status = 'running';

            const shuffled = tournament.participants.sort(() => 0.5 - Math.random());

            const round1 = [];
            for (let i = 0; i < shuffled.length; i += 2) {
                if (shuffled[i+1]) {
                    round1.push({ player1: shuffled[i], player2: shuffled[i+1], winner: null });
                } else {
                    round1.push({ player1: shuffled[i], player2: { name: 'BYE' }, winner: shuffled[i].id });
                }
            }
            tournament.bracket.push(round1);

            let announcement = `*The "${tournament.name}" tournament has begun!* \n\n*Round 1 Matchups:*\n`;
            round1.forEach((match, i) => {
                announcement += `\nMatch ${i+1}: ${match.player1.name} vs ${match.player2.name}`;
                if (match.player2.name === 'BYE') announcement += ` (BYE)`;
            });
            announcement += `\n\nWinners should report their victory using \`%tournament reportwin\`. Good luck!`;

            await reply(announcement);
            break;
        }
        case 'reportwin': {
            if (!tournament || tournament.status !== 'running') return reply('There is no tournament currently running.');

            const currentRound = tournament.bracket[tournament.bracket.length - 1];
            const playerMatch = currentRound.find(m => (m.player1.id === sender || m.player2.id === sender) && !m.winner);

            if (!playerMatch) return reply('You are not in an active tournament match or your match result has already been recorded.');

            playerMatch.winner = sender;
            await reply(`${player.name} has reported their win! The result has been recorded.`);

            const allMatchesFinished = currentRound.every(m => m.winner);
            if (allMatchesFinished) {
                const winners = currentRound.map(m => {
                    const winnerId = m.winner;
                    return tournament.participants.find(p => p.id === winnerId);
                }).filter(Boolean);

                if (winners.length === 1) {
                    tournament.status = 'finished';
                    await reply(`*The tournament "${tournament.name}" has concluded!* \n\nCongratulations to the champion, *${winners[0].name}*!`);
                    delete activeTournaments[from];
                } else {
                    const nextRound = [];
                    for (let i = 0; i < winners.length; i += 2) {
                        if (winners[i+1]) {
                            nextRound.push({ player1: winners[i], player2: winners[i+1], winner: null });
                        } else {
                            nextRound.push({ player1: winners[i], player2: { name: 'BYE' }, winner: winners[i].id });
                        }
                    }
                    tournament.bracket.push(nextRound);

                    let announcement = `*All matches for Round ${tournament.bracket.length - 1} are complete!* \n\n*Round ${tournament.bracket.length} Matchups:*\n`;
                    nextRound.forEach((match, i) => {
                        announcement += `\nMatch ${i+1}: ${match.player1.name} vs ${match.player2.name}`;
                         if (match.player2.name === 'BYE') announcement += ` (BYE)`;
                    });
                    await reply(announcement);
                }
            }
            break;
        }
        default:
            await reply('Invalid tournament command. Use `%tournament <create|join|start|reportwin>`');
    }
  },
};
