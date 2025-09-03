module.exports = {
  name: 'guild',
  description: 'Manage and interact with guilds.',
  async execute(context) {
    const { args, player, reply, GUILD_CREATE_COST, savePlayer, createGuild, getGuild, getAllGuilds, updateGuild, msg, getPlayer, GUILD_TIERS, updatePlayer: updateTargetPlayer } = context;
    const subCommand = args[0]?.toLowerCase();

    switch (subCommand) {
        case 'create': {
            if (player.guildId) return reply('You are already in a guild.');
            if (player.gold < GUILD_CREATE_COST) return reply(`You need ${GUILD_CREATE_COST} gold to create a guild. You only have ${player.gold}.`);

            const name = args.slice(1).join(' ');
            if (!name) return reply('Please provide a name for your guild. Usage: `%guild create <name>`');

            const newGuild = createGuild(name, player);
            if (!newGuild) {
                return reply(`A guild with the name "${name}" already exists.`);
            }

            player.gold -= GUILD_CREATE_COST;
            player.guildId = newGuild.id;
            savePlayer();

            await reply(`Congratulations! You have founded the guild "${name}"!`);
            break;
        }
        case 'join': {
            if (player.guildId) return reply('You are already in a guild. Use `%guild leave` first.');

            const guildName = args.slice(1).join(' ');
            if (!guildName) return reply('Please specify the name of the guild you want to join.');

            const allGuilds = getAllGuilds();
            const targetGuild = Object.values(allGuilds).find(g => g.name.toLowerCase() === guildName.toLowerCase());

            if (!targetGuild) return reply(`The guild "${guildName}" does not exist.`);

            if (targetGuild.joinRequests.some(req => req.id === player.id)) {
                return reply('You have already sent a join request to this guild.');
            }

            targetGuild.joinRequests.push({ id: player.id, name: player.name });
            updateGuild(targetGuild);

            await reply(`Your request to join "${targetGuild.name}" has been sent.`);
            const guildMaster = getPlayer(targetGuild.master);
            if (guildMaster) {
                await reply(`@${targetGuild.master.split('@')[0]}, ${player.name} has requested to join your guild. Use \`%guild accept @${player.id.split('@')[0]}\` to accept.`);
            }
            break;
        }
        case 'accept': {
            if (!player.guildId) return reply('You are not in a guild.');

            const myGuild = getGuild(player.guildId);
            if (!myGuild || myGuild.master !== player.id) return reply('Only the Guild Master can accept new members.');

            const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!targetId) return reply('You need to mention a user to accept.');

            const requestIndex = myGuild.joinRequests.findIndex(req => req.id === targetId);
            if (requestIndex === -1) return reply('This user has not requested to join your guild.');

            const [acceptedPlayerInfo] = myGuild.joinRequests.splice(requestIndex, 1);
            myGuild.members.push(acceptedPlayerInfo.id);
            updateGuild(myGuild);

            const targetPlayer = getPlayer(targetId);
            targetPlayer.guildId = myGuild.id;
            updateTargetPlayer(targetPlayer);

            await reply(`${acceptedPlayerInfo.name} has been accepted into "${myGuild.name}"!`);
            break;
        }
        case 'slogan': {
            if (!player.guildId) return reply('You are not in a guild.');
            const myGuild = getGuild(player.guildId);
            if (myGuild.master !== player.id) return reply('Only the Guild Master can change the slogan.');
            const newSlogan = args.slice(1).join(' ');
            if (!newSlogan) return reply('Please provide a new slogan. Usage: `%guild slogan <new slogan>`');
            myGuild.slogan = newSlogan;
            updateGuild(myGuild);
            await reply(`Your guild's slogan has been updated to: "${newSlogan}"`);
            break;
        }
        case 'deposit': {
            if (!player.guildId) return reply('You are not in a guild.');
            const myGuild = getGuild(player.guildId);
            const amount = parseInt(args[1]);
            if (isNaN(amount) || amount <= 0) return reply('Invalid amount.');
            if (player.gold < amount) return reply('You do not have enough gold.');
            player.gold -= amount;
            myGuild.treasury += amount;
            updateGuild(myGuild);
            savePlayer();
            await reply(`You have deposited ${amount} gold into the guild treasury. The treasury now has ${myGuild.treasury} gold.`);
            break;
        }
        case 'withdraw': {
            if (!player.guildId) return reply('You are not in a guild.');
            const myGuild = getGuild(player.guildId);
            if (myGuild.master !== player.id) return reply('Only the Guild Master can withdraw from the treasury.');
            const amount = parseInt(args[1]);
            if (isNaN(amount) || amount <= 0) return reply('Invalid amount.');
            if (myGuild.treasury < amount) return reply('The guild treasury does not have enough gold.');
            myGuild.treasury -= amount;
            player.gold += amount;
            updateGuild(myGuild);
            savePlayer();
            await reply(`You have withdrawn ${amount} gold from the guild treasury.`);
            break;
        }
        case 'manage': {
            if (!player.guildId) return reply('You are not in a guild.');

            const myGuild = getGuild(player.guildId);
            const action = args[1]?.toLowerCase();
            const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

            if (!action || !targetId) {
                return reply('Usage: `%guild manage <promote|demote|kick> @user`');
            }

            switch (action) {
                case 'promote': {
                    if (myGuild.master !== player.id) return reply('Only the Guild Master can promote members.');
                    if (!myGuild.members.includes(targetId)) return reply('That player is not in your guild.');

                    if (myGuild.officers.includes(targetId)) {
                        if (myGuild.vice_leader) return reply('There is already a Vice Leader. Demote them first.');
                        myGuild.vice_leader = targetId;
                        myGuild.officers = myGuild.officers.filter(id => id !== targetId);
                        await reply(`Promoted @${targetId.split('@')[0]} to Vice Leader.`);
                    } else {
                        if (myGuild.officers.includes(targetId)) return reply('That player is already an officer.');
                        myGuild.officers.push(targetId);
                        await reply(`Promoted @${targetId.split('@')[0]} to Officer.`);
                    }
                    updateGuild(myGuild);
                    break;
                }
                case 'demote': {
                    if (myGuild.master !== player.id) return reply('Only the Guild Master can demote members.');
                    if (!myGuild.members.includes(targetId)) return reply('That player is not in your guild.');

                    if (myGuild.vice_leader === targetId) {
                        myGuild.vice_leader = null;
                        myGuild.officers.push(targetId);
                        await reply(`Demoted @${targetId.split('@')[0]} to Officer.`);
                    } else if (myGuild.officers.includes(targetId)) {
                        myGuild.officers = myGuild.officers.filter(id => id !== targetId);
                        await reply(`Demoted @${targetId.split('@')[0]} to Member.`);
                    } else {
                        await reply('That player does not hold a promotable rank.');
                    }
                    updateGuild(myGuild);
                    break;
                }
                case 'kick': {
                    const isMaster = myGuild.master === player.id;
                    const isOfficer = myGuild.officers.includes(player.id) || myGuild.vice_leader === player.id;
                    if (!isMaster && !isOfficer) return reply('Only the Guild Master, Vice Leader, or Officers can kick members.');

                    if (!myGuild.members.includes(targetId)) return reply('That player is not in your guild.');
                    if (targetId === myGuild.master) return reply('You cannot kick the Guild Master.');
                    if ((myGuild.officers.includes(targetId) || myGuild.vice_leader === targetId) && !isMaster) return reply('Only the Guild Master can kick other leaders.');

                    myGuild.members = myGuild.members.filter(id => id !== targetId);
                    myGuild.officers = myGuild.officers.filter(id => id !== targetId);
                    if (myGuild.vice_leader === targetId) myGuild.vice_leader = null;

                    const kickedPlayer = getPlayer(targetId);
                    kickedPlayer.guildId = null;
                    updateTargetPlayer(kickedPlayer);
                    updateGuild(myGuild);

                    await reply(`Kicked @${targetId.split('@')[0]} from the guild.`);
                    break;
                }
                default:
                    await reply('Invalid management command. Use `promote`, `demote`, or `kick`.');
            }
            break;
        }
        case 'info': {
            let targetGuild;
            const guildName = args.slice(1).join(' ');

            if (guildName) {
                const allGuilds = getAllGuilds();
                targetGuild = Object.values(allGuilds).find(g => g.name.toLowerCase() === guildName.toLowerCase());
                if (!targetGuild) return reply(`The guild "${guildName}" does not exist.`);
            } else {
                if (!player.guildId) return reply('You are not in a guild. Specify a guild name to view its info.');
                targetGuild = getGuild(player.guildId);
            }

            if (!targetGuild) return reply('Could not find the specified guild.');

            const requiredXp = targetGuild.level * 1000;
            const masterName = getPlayer(targetGuild.master)?.name || 'Unknown';
            const memberNames = targetGuild.members.map(id => getPlayer(id)?.name || 'Unknown');

            let response = `*Guild Info: ${targetGuild.name}*\n`;
            response += `"${targetGuild.slogan}"\n\n`;
            response += `*Tier:* ${targetGuild.tier}\n`;
            response += `*Level:* ${targetGuild.level} (${targetGuild.xp} / ${requiredXp} XP)\n\n`;
            response += `*Perks:*\n`;
            response += `- XP Boost: +${targetGuild.perks.xp_boost * 100}%\n`;
            response += `- Loot Bonus: +${targetGuild.perks.loot_bonus * 100}%\n\n`;
            response += `*Treasury:* ${targetGuild.treasury} Gold\n\n`;
            response += `*Master:* ${masterName}\n`;
            response += `*Officers:* ${targetGuild.officers.length}\n`;
            response += `*Total Members:* ${targetGuild.members.length}\n\n`;
            response += `*Members:*\n- ${memberNames.join('\n- ')}`;

            await reply(response);
            break;
        }
        default:
            await reply('Invalid guild command. Use `%guild <create|join|accept|manage|info|...>`');
    }
  },
};
