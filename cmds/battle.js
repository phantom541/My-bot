module.exports = {
  name: 'battle',
  description: 'Engage in dragon battles.',
  async execute(context) {
    const { args, activeBattles, from, reply, sender, msg, getPlayer, BATTLE_ENVIRONMENTS, generateBattleImage, sock, getEffectiveness, dragons, PLAYER_XP_GAIN, getGuild, updateGuild, GUILD_TIERS, getRank, updatePlayer: updateContextPlayer, handleDungeonProgression, activeBeast, XP_PER_LEVEL, XP_GAIN_MULTIPLIER, activeWildEncounters } = context;
    const battle = activeBattles[from];
    const subCommand = args[0]?.toLowerCase();

    if (!battle) {
        const opponentId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!opponentId) return reply('You need to mention a user to battle, or use `%attack` for wild dragons.');
        if (opponentId === sender) return reply('You cannot battle yourself.');

        const opponent = getPlayer(opponentId);
        if (!opponent) return reply('Opponent not found.');

        const player = getPlayer(sender);
        if (player.party.length === 0) return reply('You have no dragons in your party to battle with.');
        if (opponent.party.length === 0) return reply(`${opponent.name} has no dragons in their party.`);

        const playerDragon = { level: 5, xp: 0, ...player.party[0] };
        const opponentDragon = { level: 5, xp: 0, ...opponent.party[0] };

        const totalPlayerDamage = playerDragon.moves.reduce((sum, move) => sum + move.damage, 0);
        playerDragon.hp = Math.floor((totalPlayerDamage * 5) * (1 + playerDragon.level / 10));

        const totalOpponentDamage = opponentDragon.moves.reduce((sum, move) => sum + move.damage, 0);
        opponentDragon.hp = Math.floor((totalOpponentDamage * 5) * (1 + opponentDragon.level / 10));

        const environment = BATTLE_ENVIRONMENTS[Math.floor(Math.random() * BATTLE_ENVIRONMENTS.length)];
        activeBattles[from] = {
            player1: { id: sender, player: player, dragon: playerDragon },
            player2: { id: opponentId, player: opponent, dragon: opponentDragon },
            turn: 'player1',
            environment: environment
        };

        const battleImageUrl = await generateBattleImage(playerDragon, opponentDragon, environment);
        if (battleImageUrl) {
            try {
                // Assuming axios is available on context, which it is not.
                // I will add it.
                const axios = require('axios');
                const imageResponse = await axios.get(battleImageUrl, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(imageResponse.data, 'binary');
                await sock.sendMessage(from, { image: imageBuffer, caption: `*A battle begins in the ${environment.name}!*` }, { quoted: msg });
            } catch (imgError) {
                console.error("Failed to send generated battle image:", imgError);
                await reply(`*A battle begins in the ${environment.name}!* (Image generation failed)`);
            }
        }

        let battleGuide = `*A battle has started between ${player.name} and ${opponent.name}!*\n\n`;
        battleGuide += `*${player.name}'s ${playerDragon.name}* (HP: ${playerDragon.hp})\n`;
        battleGuide += `*${opponent.name}'s ${opponentDragon.name}* (HP: ${opponentDragon.hp})\n\n`;
        battleGuide += `It's ${player.name}'s turn! Use \`%battle fight <1-4>\` to attack.\n`;
        playerDragon.moves.forEach((move, i) => {
            battleGuide += `${i + 1}. ${move.name}\n`;
        });

        await reply(battleGuide);
        return;
    }

    switch (subCommand) {
        case 'fight': {
            const currentPlayerKey = battle.turn;
            const opponentPlayerKey = currentPlayerKey === 'player1' ? 'player2' : 'player1';

            if (battle[currentPlayerKey].id !== sender) return reply('It is not your turn.');

            const moveIndex = parseInt(args[1]) - 1;
            if (isNaN(moveIndex) || moveIndex < 0 || moveIndex >= battle[currentPlayerKey].dragon.moves.length) {
                return reply('Invalid move selection. Use a number between 1 and 4.');
            }

            const move = battle[currentPlayerKey].dragon.moves[moveIndex];
            const effectiveness = getEffectiveness(move.type, battle[opponentPlayerKey].dragon.type);
            let damage = Math.floor(move.damage * effectiveness);

            let battleReport = `${battle[currentPlayerKey].player.name}'s ${battle[currentPlayerKey].dragon.name} used ${move.name}!\n`;

            if (battle.environment && battle.environment.boostedType === battle[currentPlayerKey].dragon.type) {
                damage = Math.floor(damage * (1 + battle.environment.boost));
                battleReport += `The ${battle.environment.name} strengthens the attack!\n`;
            }

            battle[opponentPlayerKey].dragon.hp -= damage;

            battleReport += `It dealt ${damage} damage!\n`;
            if (effectiveness > 1) battleReport += "It's super effective!\n";
            if (effectiveness < 1) battleReport += "It's not very effective...\n";
            battleReport += `${battle[opponentPlayerKey].player.name}'s ${battle[opponentPlayerKey].dragon.name} has ${battle[opponentPlayerKey].dragon.hp > 0 ? battle[opponentPlayerKey].dragon.hp : 0} HP remaining.\n\n`;

            if (battle[opponentPlayerKey].dragon.hp <= 0) {
                if (battle.isDungeonBattle) {
                    await reply(`You defeated the ${battle.opponentDragon.name}!`);
                    delete activeBattles[from];
                    await handleDungeonProgression(from, sock);
                    return;
                }
                if (battle.isBeastBattle) {
                    const beast = battle.opponentDragon;
                    const winner = battle.player;
                    let finalReport = "";

                    let goldGained = 1000000;
                    let playerXpGained = 5000;

                    if (winner.guildId) {
                        const guild = getGuild(winner.guildId);
                        if (guild) {
                            const goldBonus = Math.floor(goldGained * guild.perks.loot_bonus);
                            goldGained += goldBonus;
                            if (goldBonus > 0) finalReport += `\nYour guild's Treasury Boost perk earned you an extra ${goldBonus} gold!`;

                            const xpBonus = Math.floor(playerXpGained * guild.perks.xp_boost);
                            playerXpGained += xpBonus;
                            if (xpBonus > 0) finalReport += `\nYour guild's Training Boost perk earned you an extra ${xpBonus} XP!`;

                            const guildXpGained = 1000;
                            guild.xp += guildXpGained;
                            finalReport += `\nYour guild "${guild.name}" gained ${guildXpGained} XP for this legendary victory!`;

                            const requiredXp = guild.level * 1000;
                            if (guild.xp >= requiredXp) {
                                guild.level++;
                                guild.xp -= requiredXp;
                                finalReport += `\n*Incredible! Your guild has reached Level ${guild.level}!*`;
                                const newTierKey = Object.keys(GUILD_TIERS).reverse().find(level => guild.level >= parseInt(level));
                                if (newTierKey) {
                                    const newTier = GUILD_TIERS[newTierKey];
                                    if (newTier.name !== guild.tier) {
                                        guild.tier = newTier.name;
                                        guild.perks.xp_boost = newTier.xp_boost;
                                        guild.perks.loot_bonus = newTier.loot_bonus;
                                        finalReport += `\nYour guild has been promoted to ${guild.tier} Tier, unlocking new perks!`;
                                    }
                                }
                            }
                            updateGuild(guild);
                        }
                    }

                    winner.gold += goldGained;
                    winner.playerXp += playerXpGained;
                    winner.titles.push(`${beast.name} Slayer`);

                    const tamedBeast = { ...beast, id: `beast_${beast.id}` };
                    if (winner.party.length < 6) {
                        winner.party.push(tamedBeast);
                    } else {
                        winner.den.push(tamedBeast);
                    }

                    updateContextPlayer(winner);
                    delete activeBattles[from];
                    delete activeBeast[from];

                    await reply(`*Incredible! ${winner.name} has defeated and tamed ${beast.name}!* \n\nThey have been awarded ${goldGained} gold, ${playerXpGained} XP, and the title "${beast.name} Slayer"!${finalReport}`);
                    return;
                }

                battleReport += `*${battle[currentPlayerKey].player.name}'s ${battle[currentPlayerKey].dragon.name} wins!*`;

                const winner = battle[currentPlayerKey].player;
                const winnerDragon = battle[currentPlayerKey].dragon;
                const loserDragon = battle[opponentPlayerKey].dragon;

                const xpGained = loserDragon.level * XP_GAIN_MULTIPLIER;
                winnerDragon.xp += xpGained;
                battleReport += `\nYour ${winnerDragon.name} gained ${xpGained} XP!`;

                if (winnerDragon.xp >= winnerDragon.level * XP_PER_LEVEL) {
                    winnerDragon.level++;
                    winnerDragon.xp = 0;
                    battleReport += `\n*Congratulations! Your ${winnerDragon.name} grew to level ${winnerDragon.level}!*`;

                    const fullDragonData = dragons.find(d => d.id === winnerDragon.id);
                    if (fullDragonData) {
                        const allMoves = fullDragonData.moveset || fullDragonData.moves;
                        const newMove = allMoves.find(m => !winnerDragon.moves.some(wm => wm.name === m.name));
                        if (newMove) {
                            if (winnerDragon.moves.length < 4) {
                                winnerDragon.moves.push(newMove);
                                battleReport += `\nYour ${winnerDragon.name} learned ${newMove.name}!`;
                            } else {
                                battleReport += `\nYour ${winnerDragon.name} wants to learn ${newMove.name}, but it already knows 4 moves. Use \`%remove <move_name>\` to make space for a new move.`;
                            }
                        }
                    }
                }

                let playerXpGained = PLAYER_XP_GAIN;
                if (winner.guildId) {
                    const guild = getGuild(winner.guildId);
                    if (guild) {
                        const guildXpGained = 10;
                        guild.xp += guildXpGained;
                        battleReport += `\nYour guild "${guild.name}" gained ${guildXpGained} XP!`;

                        const xpBonus = Math.floor(playerXpGained * guild.perks.xp_boost);
                        if (xpBonus > 0) {
                            playerXpGained += xpBonus;
                            battleReport += ` (Guild Bonus: +${xpBonus} XP!)`;
                        }

                        const requiredXp = guild.level * 1000;
                        if (guild.xp >= requiredXp) {
                            guild.level++;
                            guild.xp -= requiredXp;
                            battleReport += `\n*Congratulations! Your guild has reached Level ${guild.level}!*`;
                            const newTierKey = Object.keys(GUILD_TIERS).reverse().find(level => guild.level >= parseInt(level));
                            if (newTierKey) {
                                const newTier = GUILD_TIERS[newTierKey];
                                if (newTier.name !== guild.tier) {
                                    guild.tier = newTier.name;
                                    guild.perks.xp_boost = newTier.xp_boost;
                                    guild.perks.loot_bonus = newTier.loot_bonus;
                                    battleReport += `\nYour guild has been promoted to ${guild.tier} Tier, unlocking new perks!`;
                                }
                            }
                        }
                        updateGuild(guild);
                    }
                }

                winner.playerXp += playerXpGained;
                battleReport += `\nYou gained ${playerXpGained} player XP!`;

                if (winner.playerXp >= winner.playerLevel * 100) {
                    winner.playerLevel++;
                    winner.playerXp = 0;
                    battleReport += `\n*Congratulations! You reached level ${winner.playerLevel} and are now a ${getRank(winner.playerLevel)}!*`;
                }

                updateContextPlayer(winner);
                delete activeBattles[from];
                return reply(battleReport);
            }

            battle.turn = opponentPlayerKey;
            battleReport += `It's ${battle[opponentPlayerKey].player.name}'s turn! Use \`%battle fight <1-4>\` to attack.`;

            if (battle.isBeastBattle && battle.opponentDragon.passive === 'Dark Aura') {
                const drain = Math.floor(battle.playerDragon.hp * 0.05);
                battle.playerDragon.hp -= drain;
                battleReport += `\n\nLycagon's Dark Aura drains ${drain} HP from your dragon! Your HP is now ${battle.playerDragon.hp}.`;
            }

            await reply(battleReport);
            break;
        }
        case 'catch': {
            if (battle.player2) {
                return reply('You cannot catch another player\'s dragon.');
            }

            const wildDragon = battle.opponentDragon;
            const tool = args[1]?.toLowerCase();
            if (!tool) return reply('Please specify a tool to use for catching.');
            const player = getPlayer(sender);
            if (!player.inventory[tool] || player.inventory[tool] <= 0) {
              return reply(`You don't have any ${tool}.`);
            }

            player.inventory[tool]--;

            const catchChance = (1 - (wildDragon.hp / (wildDragon.moves.reduce((s, m) => s + m.damage, 0) * 5))) * 0.5;
            if (Math.random() < catchChance) {
                wildDragon.captured = true;
                player.den.push(wildDragon);

                delete activeBattles[from];
                if(activeWildEncounters[from]) delete activeWildEncounters[from];
                updateContextPlayer(player);

                await reply(`Congratulations! You caught the ${wildDragon.name}! It has been sent to your den.`);
            } else {
                await reply(`Oh no! The ${wildDragon.name} broke free!`);
                const wildMove = wildDragon.moves[Math.floor(Math.random() * wildDragon.moves.length)];
                const effectiveness = getEffectiveness(wildMove.type, battle.playerDragon.type);
                const damage = Math.floor(wildMove.damage * effectiveness);
                battle.playerDragon.hp -= damage;

                let battleReport = `The wild ${wildDragon.name} used ${wildMove.name} and dealt ${damage} damage!\n`;
                if (effectiveness > 1) battleReport += "It's super effective!\n";
                if (effectiveness < 1) battleReport += "It's not very effective...\n";
                battleReport += `Your ${battle.playerDragon.name} has ${battle.playerDragon.hp > 0 ? battle.playerDragon.hp : 0} HP remaining.\n\n`;

                if (battle.playerDragon.hp <= 0) {
                    battleReport += `*Your ${battle.playerDragon.name} has fainted! You lose.*`;
                    delete activeBattles[from];
                    return reply(battleReport);
                }

                battleReport += `It's your turn!`;
                await reply(battleReport);
            }
            break;
        }
        case 'run': {
            if (battle.player2) {
                return reply('You cannot run from a player battle. Use `%battle forfeit` instead.');
            }
            delete activeBattles[from];
            await reply('You ran away from the battle.');
            break;
        }
        case 'forfeit': {
            if (!battle.player2) {
                return reply('You can only forfeit in a player battle. Use `%battle run` to escape from a wild dragon.');
            }
            const winner = battle.player1.id === sender ? battle.player2.player : battle.player1.player;
            const loser = battle.player1.id === sender ? battle.player1.player : battle.player2.player;
            delete activeBattles[from];
            await reply(`${loser.name} has forfeited the battle. ${winner.name} wins!`);
            break;
        }
        default:
            await reply('Invalid battle command. Use `%battle fight`, `%battle switch`, `%battle catch`, `%battle run`, or `%battle forfeit`.');
    }
  },
};
