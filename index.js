const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore
} = require("@adiwajshing/baileys");

const P = require('pino');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { getPlayer, updatePlayer, getAllPlayers } = require('./playerData');
const dragons = require('./dragonData');
const ytdlp = require('ytdlp-nodejs');
const shop = require('./shop.js');
const cards = require('./cardData.js');
const { getGroupSettings, updateGroupSettings } = require('./groupSettings.js');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dgg6fak2e',
  api_key: '472624818289699',
  api_secret: 'trlLYWt16aTFgzc0cU1afuscQuM'
});

const OWNER_NAME = 'ⱠΔ₩–ⱠΞƧƧ ⱣⱧΔ₥ŦØ₥';
const OWNER_JID = '26775949123@s.whatsapp.net';
const GIPHY_API_KEY = 'Pkfeqgcgi4LsgiR677BoTBWKN2utJrAl';
const CARD_CLAIM_COST = 100;
const CARD_PACK_COST = 300;
const CARD_PACK_SIZE = 3;
const PREFIX = '%';
const STARTER_DRAGON_IDS = [3, 4, 5, 6, 7, 9];
const rolesHierarchy = ['user', 'mod', 'owner'];
const cooldowns = {
  spawn: 5 * 60 * 1000,
  train: 15 * 60 * 1000,
};
const MAX_LEVEL = 100;
const XP_PER_LEVEL = 100;
const XP_GAIN_MULTIPLIER = 10;
const PLAYER_XP_GAIN = 50;
const RANKS = [
    'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master',
    'Grandmaster', 'Elder', 'Legendary', 'Mythic', 'Titan', 'Dragon Master'
];

const typeEffectiveness = {
    'Fire': { strongAgainst: ['Metal', 'Ice'], weakAgainst: ['Water'] },
    'Water': { strongAgainst: ['Fire', 'Earth'], weakAgainst: ['Lightning'] },
    'Earth': { strongAgainst: ['Lightning', 'Metal'], weakAgainst: ['Water', 'Wind'] },
    'Wind': { strongAgainst: ['Earth'], weakAgainst: ['Ice'] },
    'Ice': { strongAgainst: ['Wind', 'Shadow'], weakAgainst: ['Fire', 'Metal'] },
    'Lightning': { strongAgainst: ['Water'], weakAgainst: ['Earth', 'Shadow'] },
    'Metal': { strongAgainst: ['Ice'], weakAgainst: ['Fire', 'Earth'] },
    'Shadow': { strongAgainst: ['Lightning'], weakAgainst: ['Ice'] }
};

function getEffectiveness(moveType, targetDragonType) {
    const effectivenessInfo = typeEffectiveness[moveType];
    if (effectivenessInfo) {
        if (effectivenessInfo.strongAgainst.includes(targetDragonType)) {
            return 1.5; // Super effective
        }
        if (effectivenessInfo.weakAgainst.includes(targetDragonType)) {
            return 0.5; // Not very effective
        }
    }
    return 1; // Normal effectiveness
}

function getRank(level) {
    const rankIndex = Math.floor((level - 1) / 10);
    return RANKS[rankIndex] || RANKS[RANKS.length - 1];
}

async function generateBattleImage(playerDragon, opponentDragon, environment) {
    try {
        const backgroundUrl = environment.bgUrl;

        const playerDragonImg = { public_id: playerDragon.imageUrl, type: 'fetch' };
        const opponentDragonImg = { public_id: opponentDragon.imageUrl, type: 'fetch' };

        // Calculate HP percentages
        const playerHpPercent = Math.floor((playerDragon.hp / (playerDragon.moves.reduce((s, m) => s + m.damage, 0) * 5 * (1 + playerDragon.level/10))) * 100);
        const opponentHpPercent = Math.floor((opponentDragon.hp / (opponentDragon.moves.reduce((s, m) => s + m.damage, 0) * 5 * (1 + opponentDragon.level/10))) * 100);

        const battleImageUrl = cloudinary.url(backgroundUrl, {
            transformation: [
                { width: 1280, height: 720, crop: 'fill' },
                // Opponent Dragon
                { overlay: opponentDragonImg, height: 300, gravity: 'east', x: -100, y: -50, effect: 'fliph' },
                // Player Dragon
                { overlay: playerDragonImg, height: 280, gravity: 'west', x: 100, y: 100 },

                // --- UI Elements ---
                // Player Info Box
                { overlay: { resource_type: 'image', public_id: 'solid_black' }, width: 350, height: 100, gravity: 'south_west', x: 20, y: 20, opacity: 60 },
                { overlay: { font_family: 'Arial', font_size: 24, text: `${playerDragon.name} (Lvl ${playerDragon.level})` }, gravity: 'south_west', x: 30, y: 90, color: 'white' },
                { overlay: { resource_type: 'image', public_id: 'solid_gray' }, width: 300, height: 20, gravity: 'south_west', x: 30, y: 60 },
                { overlay: { resource_type: 'image', public_id: 'solid_green' }, width: 3 * playerHpPercent, height: 20, gravity: 'south_west', x: 30, y: 60, crop: 'scale' },
                { overlay: { font_family: 'Arial', font_size: 18, text: `HP: ${playerDragon.hp}` }, gravity: 'south_west', x: 150, y: 35, color: 'white' },

                // Opponent Info Box
                { overlay: { resource_type: 'image', public_id: 'solid_black' }, width: 350, height: 100, gravity: 'north_east', x: 20, y: 20, opacity: 60 },
                { overlay: { font_family: 'Arial', font_size: 24, text: `${opponentDragon.name} (Lvl ${opponentDragon.level})` }, gravity: 'north_east', x: 30, y: 30, color: 'white' },
                { overlay: { resource_type: 'image', public_id: 'solid_gray' }, width: 300, height: 20, gravity: 'north_east', x: 30, y: 60 },
                { overlay: { resource_type: 'image', public_id: 'solid_green' }, width: 3 * opponentHpPercent, height: 20, gravity: 'north_east', x: 30, y: 60, crop: 'scale' },
                { overlay: { font_family: 'Arial', font_size: 18, text: `HP: ${opponentDragon.hp}` }, gravity: 'north_east', x: 150, y: 85, color: 'white' },
            ]
        });

        return battleImageUrl;
    } catch (error) {
        console.error("Error generating battle image:", error);
        return null;
    }
}

const wildSpawnsEnabled = { enabled: false };
const BATTLE_ENVIRONMENTS = [
    { name: "Fiery Volcano", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds2.jpg", boostedType: "Fire", boost: 0.15 },
    { name: "Mystical Forest", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds2.jpg", boostedType: "Wind", boost: 0.15 },
    { name: "Ancient Ruins", bgUrl: "https://img.craftpix.net/2019/01/Free-Pixel-Art-Fantasy-2D-Battlegrounds3.jpg", boostedType: "Earth", boost: 0.15 },
    { name: "Night Forest", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds3.jpg", boostedType: "Shadow", boost: 0.15 },
    { name: "Glacier Plains", bgUrl: "https://img.craftpix.net/2022/12/Free-Forest-Battle-Backgrounds5.jpg", boostedType: "Ice", boost: 0.15 }, // Using a forest image as placeholder
];
const COMPLIMENTS = [ "You're an amazing person!", "You're a true inspiration!", "You have a heart of gold.", "You're a ray of sunshine on a cloudy day.", "You're more fun than a barrel of monkeys." ];
const INSULTS = [ "You're not the sharpest tool in the shed, are you?", "I've had conversations with a wall that were more interesting.", "I've seen more charisma in a wet sock.", "I've seen more intelligent life forms in a petri dish." ];
const FLIRT_LINES = [ "Are you a magician? Because whenever I look at you, everyone else disappears!", "Do you have a map? I just got lost in your eyes.", "I'm not a photographer, but I can definitely picture us together.", "If you were a vegetable, you'd be a cute-cumber." ];
const SHAYARI = [ "Tere ishq mein, hadd se guzar jaun...", "Mohabbat ka safar, lamba hai magar...", "Dil ki baatein, lafzon mein kaise kahun...", "Tumhari yaadon mein, din raat khoya rehta hoon." ];

function getShipComment(percentage) {
    if (percentage < 20) return "Not a great match, but anything is possible!";
    if (percentage < 50) return "There's some potential here!";
    if (percentage < 80) return "This could be a great match!";
    if (percentage < 100) return "You two are a perfect match!";
    return "It's a match made in heaven! 100%!";
}

const activeWildEncounters = {};
const activeBattles = {};
const activeTrades = {};
const quests = {};
const dungeons = {};
const market = {};
const achievements = {};
let botMode = 'public';
let autoTyping = false;
let autoRead = false;
let antideleteEnabled = false;
let autoreactEnabled = false;
const activeCardSpawns = {};
const activeCardPacks = {};
const activeTournaments = {};

async function main() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info_folder');

  // ✅ FIXED this line
  const store = makeInMemoryStore({ logger: P({ level: 'silent' }) });

  store.readFromFile('./store.json');
  setInterval(() => store.writeToFile('./store.json'), 10000);

  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`Using WhatsApp version v${version.join('.')}, isLatest: ${isLatest}`);

  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    version,
  });

  store.bind(sock.ev);
  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if ((lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
        main(); // reconnect
      } else {
        console.log('Connection closed. You are logged out.');
      }
    } else if (connection === 'open') {
      console.log('Connected to WhatsApp');
    }
  });

  sock.ev.on('messages.delete', async ({ keys }) => {
    if (antideleteEnabled) {
        for (const key of keys) {
            // This is a simplified implementation. A real implementation would need to store messages to be able to retrieve them.
            // For now, it will just log the deletion.
            console.log('Message deleted:', key);
        }
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    if (!m.messages || m.type !== 'notify') return;
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.participant || msg.key.remoteJid;
    const from = msg.key.remoteJid;
    const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

    // Anti-Link Feature
    if (from.endsWith('@g.us')) {
        const groupSettings = getGroupSettings(from);
        if (groupSettings.antilink) {
            const linkRegex = /(https?:\/\/[^\s]+)/g;
            if (linkRegex.test(messageContent)) {
                const isAdmin = await isGroupAdmin(from, sender);
                if (!isAdmin && !hasRole('owner')) {
                    await reply('Links are not allowed in this group. Removing user...');
                    try {
                        await sock.groupParticipantsUpdate(from, [sender], "remove");
                        // Deleting the message is more complex and requires storing the message key.
                        // For now, we will just remove the user.
                    } catch (error) {
                        console.error('Error removing user for sending link:', error);
                        await reply('I could not remove the user. Am I an admin?');
                    }
                }
            }
        }
    }

    if (!messageContent.startsWith(PREFIX)) return;

    const args = messageContent.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const player = getPlayer(sender, `Player_${sender.substring(0, 5)}`);
    player.roles = player.roles || [];
    player.gold = player.gold || 0;
    player.bank = player.bank || 0;
    player.inventory = player.inventory || {};
    player.party = player.party || [];
    player.den = player.den || [];
    player.cooldowns = player.cooldowns || {};
    player.pc = player.pc || [];
    player.deck = player.deck || [];
    player.holder = player.holder || [];

    const savePlayer = () => updatePlayer(player);

    const isGroupAdmin = async (jid, participant) => {
        try {
            const groupMetadata = await sock.groupMetadata(jid);
            const participantInfo = groupMetadata.participants.find(p => p.id === participant);
            return participantInfo && (participantInfo.admin === 'admin' || participantInfo.admin === 'superadmin');
        } catch (error) {
            console.error('Error checking group admin status:', error);
            return false;
        }
    };

    const hasRole = (role) =>
      role === 'owner' ? player.roles.includes('owner')
        : role === 'mod' ? player.roles.includes('mod') || player.roles.includes('owner')
          : true;

    const reply = async (text) => {
      await sock.sendMessage(from, { text }, { quoted: msg });
    };

    if (player.banned) return;

    if (sender === OWNER_JID && !player.roles.includes('owner')) {
        player.roles.push('owner');
        savePlayer();
        await reply(`Welcome, owner! You have been granted owner role.`);
    }

    switch (command) {
      case 'help':
      case 'menu':
        await reply(`
*Dragon Bot Commands*

*General:*
%start-hunt - Start your adventure and choose a dragon.
%guide <command> - Get a detailed guide for a command.
%profile [@user] - View your or another user's profile.
%leaderboard - View the richest players.
%nickname <dragon_index> <new_name> - Give your dragon a nickname.
%mods - View the list of bot moderators.
%daily - Get a daily reward.
%quests - View and complete quests.
%dex <dragon_name_or_id> - View DragonDex information.
%craft <item_name> - Craft new items.
%map - View the world map.
%achievements - View your achievements.

*Economy:*
%balance - Check gold & bank
%deposit <amount> - Deposit gold
%withdraw <amount> - Withdraw gold
%mart - View items to buy
%buy <item> - Buy items from the shop.
%slot <amount> - Gamble gold (max 1,000,000 at once)
%market - Access the player market.

*Dragons:*
%spawn - Spawn a wild dragon (5m cooldown, 1m exclusive catch).
%catch <tool> - Catch the spawned wild dragon
%party - View your active dragons (max 6)
%den - View your dragon den (storage)
%sendtoden <dragon_index> - Move a party dragon to den
%sendtoparty <den_index> - Move a den dragon to party (max 6)
%dragon <name_or_id> - View dragon summary

*Training & Battles:*
%train - Train your dragons (cooldown 15m)
%attack - Attack a spawned wild dragon
%battle @user - Challenge another player
%battle fight <1-4> - Use a move in battle
%remove <move_name> - Remove a move from your dragon to learn a new one.
%dungeon - Enter a dungeon.
%boss - Fight the global boss.

*Tournaments:*
%tournament create <name> - Create a new tournament.
%tournament join - Join the active tournament.
%tournament start - Start the tournament (organizer only).
%tournament reportwin - Report your win in a tournament match.

*Gifting & Trading:*
%givedragon <dragon_index> @user - Give a dragon to another player.
%trade @user <your_dragon_index> <their_dragon_index> - Propose a trade.
%trade accept - Accept a trade proposal.
%trade decline - Decline a trade proposal.

*Fun Commands:*
%compliment @user
%insult @user
%flirt
%shayari
%goodnight
%roseday
%character @user
%wasted @user
%ship @user
%simp @user
%stupid @user [text]

*Card Collecting:*
%spawncard [--tier=<tier>] - Spawn a random card (optionally of a specific tier, mods only).
%claim - Claim a spawned card (costs 100 gold).
%buypack - Buy a pack of 3 random cards for 300 gold.
%cards - View your card collection (deck and holder).
%spawnpack6 - Spawn a 6-card pack with guaranteed high-tier cards.
%spawnpack7 - Spawn a 7-card pack with one card from each tier.
%claimpack - Claim a spawned card pack.
%movetodeck <holder_index> - Move a card from your holder to your deck.
%movetoholder <deck_index> - Move a card from your deck to your holder.
%givecard <deck|holder> <card_index> @user - Give a card to another player.

*Admin:*
%ban @user - Ban a user from using the bot.
%unban @user - Unban a user.
%kick @user - Kick a user from the group.
%wild on/off - Enable/disable wild spawns (mods only)
%huntdragon <Dragon Name> <Level> - Spawn a specific high-level dragon.
%givegold @user <amount> - Give gold to user (owner only)
%re-roll <dragon_index> - Re-roll a dragon's moves (owner/mod only).
%environments - View the list of battle environments.

*Owner:*
%addsudo @user - Promote a user to mod.
%delsudo @user - Demote a mod.
%addpower @user - Add a power user.
%delpower @user - Remove a power user.
%mode <public/private> - Set the bot mode.
%clearsession - Clear the bot's session file.
%setpp <reply to image> - Set the bot's profile picture.
%autotyping <on/off> - Enable or disable auto typing.
%autoread <on/off> - Enable or disable auto read.
%antidelete <on/off> - Enable or disable anti-delete.
%autoreact <on/off> - Enable or disable auto-react.

*Group Admin (Bot must be admin):*
%modes <feature> <on|off> - Enable or disable features for this group.
%open - Open the group for all members to send messages.
%close - Close the group for only admins to send messages.

*Downloader:*
%play <song_name> - Play a song from YouTube.
%youtube <mp3/mp4> <url> - Download from YouTube.
%instagram <url> - Download from Instagram.
%facebook <url> - Download from Facebook.
%tiktok <url> - Download from TikTok.

Owner: ${OWNER_NAME}
        `);
        break;

      case 'guide': {
        const guideName = args[0]?.toLowerCase();
        if (!guideName) {
            return reply('*Available Guides:*\n- start-hunt\n- battle\n- trade\n- remove\n- cards\n- givecard\n- modes\n- spawn\n- tournament');
        }

        switch (guideName) {
            case 'start-hunt':
                await reply(
`*Guide: %start-hunt*
This command starts your adventure as a dragon trainer.
- Use \`%start-hunt\` to see a list of available starter dragons.
- To see more details about a specific dragon, use \`%start-hunt --<dragon_name>\` (e.g., \`%start-hunt --Terrible_Terror\`).
- To choose your starter, use \`%start-hunt --<dragon_name> --choose\` (e.g., \`%start-hunt --Terrible_Terror --choose\`).`
                );
                break;
            case 'battle':
                await reply(
`*Guide: %battle*
This command is used for all battles.
- To battle a wild dragon that has spawned, use \`%attack\`.
- To challenge another player, use \`%battle @user\`.
- Once in a battle, use \`%battle fight <1-4>\` to use one of your dragon's moves.`
                );
                break;
            case 'trade':
                await reply(
`*Guide: %trade*
This command allows you to trade dragons with other players.
- To propose a trade, use \`%trade @user <your_dragon_index> <their_dragon_index>\`. The indices are from your and their party list.
- The other player must then use \`%trade accept\` or \`%trade decline\`.`
                );
                break;
            case 'remove':
                await reply(
`*Guide: %remove*
This command allows you to remove a move from your dragon's moveset to make space for a new one.
- Use \`%remove <move_name>\`. This will affect the first dragon in your party.
- Make sure to type the move name exactly as it appears in the \`%dragon\` command.`
                );
                break;
            case 'cards':
                await reply(
`*Guide: Card Collecting*
The bot features a vast collection of cards, including Dragon cards from Yu-Gi-Oh! and animated GIFs from the world of anime.

*Getting Cards:*
- *Spawning:* Use \`%spawncard\` to make a new card appear in the chat.
- *Claiming:* When a card appears (either from \`%spawncard\` or an automatic "wild card" spawn), use \`%claim\` to add it to your collection. This costs 100 gold.
- *Buying Packs:* Use \`%buypack\` to purchase a pack of 3 random cards/GIFs for 300 gold.

*Managing Your Collection:*
- Your collection is split into a \`deck\` (max 12 cards) and a \`holder\` (unlimited storage).
- Use \`%cards\` to view your deck and holder.
- Use \`%movetodeck <holder_index>\` and \`%movetoholder <deck_index>\` to organize your cards.`
                );
                break;
            case 'givecard':
                await reply(
`*Guide: %givecard*
- This command allows you to give a card to another player.
- Usage: \`%givecard <deck|holder> <card_index> @user\`
- Example: \`%givecard deck 3 @user\` to give the 3rd card from your deck.`
                );
                break;
            case 'modes':
                await reply(
`*Guide: %modes*
This command is for group admins to configure the bot's features in their group.
- Usage: \`%modes <feature> <on|off>\`
- Available features:
  - \`antilink\`: Automatically deletes messages with links and removes the sender.
  - \`slot\`: Enables or disables the \`%slot\` command in the group.
  - \`wild\`: Enables or disables automatic wild dragon spawns.
  - \`wildcard\`: Enables or disables automatic card/GIF spawns.`
                );
                break;
            case 'spawn':
                await reply(
`*Guide: %spawn*
This command spawns a wild dragon.
- There is a 5-minute cooldown for this command.
- When you spawn a dragon, you have a 1-minute exclusive window to catch it.
- After 1 minute, the dragon becomes available for anyone to catch.
- The dragon will fly away after 3 minutes if it's not caught.`
                );
                break;
            default:
                await reply('Invalid guide name. Use `%guide` to see the list of available guides.');
            case 'tournament':
                await reply(
`*Guide: Tournaments*
This guide explains how to participate in and run a tournament.

*For Players:*
- To join an open tournament, use \`%tournament join\`.
- After you play your match against an opponent, the winner must use \`%tournament reportwin\` to have the result recorded.

*For Organizers (Mods/Owners):*
1. *Create:* Use \`%tournament create <Tournament Name>\` to start a new tournament and open registration.
2. *Start:* Once you are ready to begin, use \`%tournament start\`. This closes registration, shuffles the players, and announces the first round of matches.
3. *Run:* The tournament will run automatically as winners report their victories. The bot will announce new rounds and the final champion.`
                );
                break;
        }
        break;
      }

      case 'tournament': {
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

                // Shuffle participants
                const shuffled = tournament.participants.sort(() => 0.5 - Math.random());

                const round1 = [];
                for (let i = 0; i < shuffled.length; i += 2) {
                    if (shuffled[i+1]) {
                        round1.push({ player1: shuffled[i], player2: shuffled[i+1], winner: null });
                    } else {
                        // Handle odd number of players - give a bye
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

                // Check if the round is over
                const allMatchesFinished = currentRound.every(m => m.winner);
                if (allMatchesFinished) {
                    const winners = currentRound.map(m => {
                        const winnerId = m.winner;
                        return tournament.participants.find(p => p.id === winnerId);
                    }).filter(Boolean); // Filter out any potential nulls

                    if (winners.length === 1) {
                        // We have a champion!
                        tournament.status = 'finished';
                        await reply(`*The tournament "${tournament.name}" has concluded!* \n\nCongratulations to the champion, *${winners[0].name}*!`);
                        delete activeTournaments[from]; // Clean up
                    } else {
                        // Start the next round
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
        break;
      }

      case 'wild': {
        if (!hasRole('mod')) return reply('You do not have permission to use this command.');
        const option = args[0]?.toLowerCase();
        if (option === 'on') {
            wildSpawnsEnabled.enabled = true;
            await reply('Wild dragon spawns have been enabled globally.');
        } else if (option === 'off') {
            wildSpawnsEnabled.enabled = false;
            await reply('Wild dragon spawns have been disabled globally.');
        } else {
            await reply('Usage: %wild <on/off>');
        }
        break;
      }

      case 'environments': {
        if (!hasRole('mod')) return reply('You do not have permission to use this command.');

        let response = '*Available Battle Environments:*\n\n';
        BATTLE_ENVIRONMENTS.forEach(env => {
            response += `- *${env.name}* (Boosts: ${env.boostedType})\n`;
        });

        await reply(response);
        break;
      }

      case 'huntdragon': {
        if (!hasRole('mod')) return reply('You do not have permission to use this command.');
        if (activeWildEncounters[from]) return reply('A wild dragon has already spawned in this chat. Use %catch or defeat it first.');

        // --env <name> can be anywhere
        let envName = null;
        const envIndex = args.findIndex(arg => arg.toLowerCase() === '--env');
        if (envIndex > -1) {
            envName = args.splice(envIndex, 2)[1];
        }

        const dragonName = args.slice(0, -1).join(' ');
        const level = parseInt(args[args.length - 1]);

        if (!dragonName || isNaN(level) || level <= 0) {
            return reply('Invalid usage. Use `%huntdragon <Dragon Name> <Level> [--env <Environment Name>]`.');
        }

        const dragonData = dragons.find(d => d.name.toLowerCase() === dragonName.toLowerCase());

        if (!dragonData) {
            return reply(`Dragon "${dragonName}" not found in the DragonDex.`);
        }

        const wildDragon = { ...dragonData };
        wildDragon.level = level;

        const totalDamage = wildDragon.moves.reduce((sum, move) => sum + move.damage, 0);
        wildDragon.hp = Math.floor((totalDamage * 5) * (1 + level / 10)); // HP scales with level

        let environment;
        if (envName) {
            environment = BATTLE_ENVIRONMENTS.find(e => e.name.toLowerCase() === envName.toLowerCase());
            if (!environment) {
                return reply(`Invalid environment name. Use %environments to see the list.`);
            }
        } else {
            environment = BATTLE_ENVIRONMENTS[Math.floor(Math.random() * BATTLE_ENVIRONMENTS.length)];
        }

        activeWildEncounters[from] = {
            dragon: wildDragon,
            captured: false,
            environment: environment
        };

        await reply(`A powerful wild ${wildDragon.name} (Level ${wildDragon.level}, HP: ${wildDragon.hp}) has been summoned in the ${environment.name}! Use %attack to battle it.`);
        break;
      }

      case 'youtube': {
        const format = args[0]?.toLowerCase();
        const url = args[1];

        if (!format || (format !== 'mp3' && format !== 'mp4')) {
            return reply('Please specify a format: mp3 or mp4.');
        }
        if (!url) return reply('Please provide a YouTube URL.');

        await reply(`Downloading your ${format}, please wait...`);

        try {
            const stream = ytdlp(url, {
                output: '-',
                format: format === 'mp3' ? 'bestaudio[ext=m4a]/bestaudio/best' : 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best/best',
            });

            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            if (format === 'mp3') {
                await sock.sendMessage(from, { audio: buffer });
            } else {
                await sock.sendMessage(from, { video: buffer });
            }

        } catch (error) {
            console.error('Error downloading from YouTube:', error);
            await reply('Sorry, I could not download the video/audio.');
        }
        break;
      }

      case 'instagram': {
        // To be implemented
        break;
      }

      case 'facebook': {
        // To be implemented
        break;
      }

      case 'tiktok': {
        // To be implemented
        break;
      }

      case 'play': {
        const query = args.join(' ');
        if (!query) return reply('Please provide a song name or YouTube URL.');

        await reply('Searching for your song, please wait...');

        try {
            const stream = ytdlp(query, {
                output: '-',
                format: 'bestaudio[ext=m4a]/bestaudio/best',
            });

            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            await sock.sendMessage(from, { audio: buffer });

        } catch (error) {
            console.error('Error playing song:', error);
            await reply('Sorry, I could not play the song.');
        }
        break;
      }

      case 'ban': {
        if (!hasRole('mod')) return reply('You do not have permission to use this command.');
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to ban.');
        const targetPlayer = getPlayer(targetId);
        targetPlayer.banned = true;
        updatePlayer(targetPlayer);
        await reply(`${targetPlayer.name} has been banned.`);
        break;
      }

      case 'unban': {
        if (!hasRole('mod')) return reply('You do not have permission to use this command.');
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to unban.');
        const targetPlayer = getPlayer(targetId);
        targetPlayer.banned = false;
        updatePlayer(targetPlayer);
        await reply(`${targetPlayer.name} has been unbanned.`);
        break;
      }

      case 'addsudo':
      case 'promote': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to promote.');
        const targetPlayer = getPlayer(targetId);
        if (targetPlayer.roles.includes('mod')) return reply(`${targetPlayer.name} is already a mod.`);
        targetPlayer.roles.push('mod');
        updatePlayer(targetPlayer);
        await reply(`${targetPlayer.name} has been promoted to mod.`);
        break;
      }

      case 'delsudo':
      case 'demote': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to demote.');
        const targetPlayer = getPlayer(targetId);
        if (!targetPlayer.roles.includes('mod')) return reply(`${targetPlayer.name} is not a mod.`);
        targetPlayer.roles = targetPlayer.roles.filter(r => r !== 'mod');
        updatePlayer(targetPlayer);
        await reply(`${targetPlayer.name} has been demoted.`);
        break;
      }

      case 'addpower': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to add as power user.');
        const targetPlayer = getPlayer(targetId);
        if (targetPlayer.roles.includes('power')) return reply(`${targetPlayer.name} is already a power user.`);
        targetPlayer.roles.push('power');
        updatePlayer(targetPlayer);
        await reply(`${targetPlayer.name} has been added as a power user.`);
        break;
      }

      case 'delpower': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to remove from power users.');
        const targetPlayer = getPlayer(targetId);
        if (!targetPlayer.roles.includes('power')) return reply(`${targetPlayer.name} is not a power user.`);
        targetPlayer.roles = targetPlayer.roles.filter(r => r !== 'power');
        updatePlayer(targetPlayer);
        await reply(`${targetPlayer.name} has been removed from power users.`);
        break;
      }

      case 'modes': {
        if (!from.endsWith('@g.us')) {
            return reply('This command can only be used in groups.');
        }
        if (!await isGroupAdmin(from, sender)) {
            return reply('Only group admins can use this command.');
        }

        const feature = args[0]?.toLowerCase();
        const option = args[1]?.toLowerCase();

        if (!feature || !option || (option !== 'on' && option !== 'off')) {
            return reply('Usage: %modes <feature> <on|off>\nAvailable features: antilink, slot, wild, wildcard');
        }

        const groupSettings = getGroupSettings(from);
        if (groupSettings[feature] === undefined) {
            return reply(`Invalid feature: ${feature}. Available features: antilink, slot, wild, wildcard`);
        }

        groupSettings[feature] = option === 'on';
        updateGroupSettings(groupSettings);

        await reply(`${feature} has been turned ${option} for this group.`);
        break;
      }

      case 'open': {
        if (!from.endsWith('@g.us')) {
            return reply('This command can only be used in groups.');
        }
        if (!await isGroupAdmin(from, sender)) {
            return reply('Only group admins can use this command.');
        }
        try {
            await sock.groupSettingUpdate(from, 'not_announcement');
            await reply('Group opened.');
        } catch (error) {
            console.error('Error opening group:', error);
            await reply('I could not open the group. Am I an admin?');
        }
        break;
      }

      case 'close': {
        if (!from.endsWith('@g.us')) {
            return reply('This command can only be used in groups.');
        }
        if (!await isGroupAdmin(from, sender)) {
            return reply('Only group admins can use this command.');
        }
        try {
            await sock.groupSettingUpdate(from, 'announcement');
            await reply('Group closed.');
        } catch (error) {
            console.error('Error closing group:', error);
            await reply('I could not close the group. Am I an admin?');
        }
        break;
      }

      case 'kick': {
        if (!hasRole('mod')) return reply('You do not have permission to use this command.');
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to kick.');
        try {
            await sock.groupParticipantsUpdate(from, [targetId], "remove");
        } catch (error) {
            console.error('Error kicking user:', error);
            await reply('I could not kick the user. Am I an admin in this group?');
        }
        break;
      }

      case 'balance':
        await reply(`Gold: ${player.gold}\nBank: ${player.bank}`);
        break;

      case 'deposit':
      case 'withdraw': {
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) return reply('Invalid amount.');

        if (command === 'deposit') {
          if (player.gold < amount) return reply('Not enough gold.');
          player.gold -= amount;
          player.bank += amount;
          await reply(`Deposited ${amount} gold. Bank balance: ${player.bank}`);
        } else {
          if (player.bank < amount) return reply('Not enough bank balance.');
          player.bank -= amount;
          player.gold += amount;
          await reply(`Withdrew ${amount} gold. Wallet balance: ${player.gold}`);
        }

        savePlayer();
        break;
      }

      case 'slot': {
        if (from.endsWith('@g.us')) {
            const groupSettings = getGroupSettings(from);
            if (!groupSettings.slot) {
                return reply('The slot machine is disabled in this group.');
            }
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) return reply('Enter a valid gold amount to gamble.');
        if (amount > 1_000_000) return reply('You can only slot up to 1,000,000 gold at once.');
        if (player.gold < amount) return reply('Not enough gold to slot.');

        const emojis = ['🍒', '🍋', '🍉', '⭐', '🔔'];
        const roll = () => emojis[Math.floor(Math.random() * emojis.length)];
        const [slot1, slot2, slot3] = [roll(), roll(), roll()];

        let result = `🎰 ${slot1} | ${slot2} | ${slot3}\n`;
        if (slot1 === slot2 && slot2 === slot3) {
          const win = amount * 3;
          player.gold += win;
          result += `🎉 Jackpot! You won ${win} gold!`;
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
          const win = amount * 2;
          player.gold += win;
          result += `✨ Nice! You won ${win} gold!`;
        } else {
          player.gold -= amount;
          result += `😢 You lost ${amount} gold.`;
        }

        savePlayer();
        await reply(result);
        break;
      }

      case 'mart':
      case 'buy': {
        if (command === 'mart') {
          let shopText = '*Shop Items:*\n\n';
          for (const key in shop) {
            shopText += `*${shop[key].name}* - ${shop[key].price} gold\n`;
            shopText += `> ${shop[key].description}\n\n`;
          }
          await reply(shopText);
        } else {
          const itemKey = args[0]?.toLowerCase();
          if (!itemKey || !shop[itemKey]) return reply('Invalid item.');
          const item = shop[itemKey];
          if (player.gold < item.price) return reply('Not enough gold.');
          player.gold -= item.price;
          player.inventory[itemKey] = (player.inventory[itemKey] || 0) + 1;
          await reply(`Bought 1x ${item.name}. You now have ${player.inventory[itemKey]}.`);
          savePlayer();
        }
        break;
      }

      case 'remove': {
        const moveName = args.join(' ').toLowerCase();
        if (!moveName) return reply('Please specify the name of the move to remove.');

        if (player.party.length === 0) return reply('You have no dragons in your party.');

        // For simplicity, this command will only affect the first dragon in the party.
        const dragon = player.party[0];
        const moveIndex = dragon.moves.findIndex(m => m.name.toLowerCase() === moveName);

        if (moveIndex === -1) {
            return reply(`${dragon.name} does not know the move ${moveName}.`);
        }

        const [removedMove] = dragon.moves.splice(moveIndex, 1);
        savePlayer();

        await reply(`You have removed the move ${removedMove.name} from your ${dragon.name}.`);
        break;
      }


      case 'start-hunt': {
        if (player.party.length > 0 || player.den.length > 0) {
            return reply('You have already started your hunt! You can only choose one starter dragon.');
        }

        const starterDragons = dragons.filter(d => STARTER_DRAGON_IDS.includes(d.id));

        if (args.length === 0) {
            let huntList = '*Welcome to the Dragon Hunt!* Choose your starter dragon:\n\n';
            starterDragons.forEach(d => {
                huntList += `*${d.name}* (Type: ${d.type})\n`;
            });
            huntList += `\nTo see more details about a dragon, use \`%start-hunt --<dragon_name>\`.`;
            huntList += `\nTo choose your starter, use \`%start-hunt --<dragon_name> --choose\`.`;
            return reply(huntList);
        }

        const dragonNameArg = args.find(a => a.startsWith('--') && a !== '--choose');
        if (dragonNameArg) {
            const dragonName = dragonNameArg.slice(2).replace(/_/g, ' ');
            const selectedDragon = starterDragons.find(d => d.name.toLowerCase() === dragonName.toLowerCase());

            if (!selectedDragon) {
                return reply('Invalid starter dragon name.');
            }

            if (args.includes('--choose')) {
                const newDragon = { ...selectedDragon, level: 5, xp: 0 };
                player.party.push(newDragon);
                savePlayer();
                return reply(`Congratulations! You have chosen ${selectedDragon.name} as your starter dragon!`);
            } else {
                try {
                    const imageUrl = selectedDragon.imageUrl;
                    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    const imageBuffer = Buffer.from(response.data, 'binary');

                    let caption = `*${selectedDragon.name}*\n`;
                    caption += `Type: ${selectedDragon.type}\n`;
                    caption += '*Moves:*\n';
                    selectedDragon.moves.forEach(move => {
                        caption += `- ${move.name} (Damage: ${move.damage}, Type: ${move.type})\n`;
                    });
                    caption += `\nTo choose this dragon, use \`%start-hunt --${dragonNameArg.slice(2)} --choose\`.`;

                    await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });
                } catch (error) {
                    console.error('Error sending dragon image:', error);
                    await reply('Sorry, I couldn\'t fetch the image for that dragon. Please try again.');
                }
                return;
            }
        }

        break;
      }

      case 'cards': {
        let response = `*Your Deck (${player.deck.length}/12):*\n`;
        if (player.deck.length === 0) {
            response += 'Your deck is empty.\n';
        } else {
            player.deck.forEach((card, i) => {
                response += `${i + 1}. ${card.name} (Tier: ${card.tier})\n`;
            });
        }

        response += `\n*Your Card Holder (${player.holder.length}):*\n`;
        if (player.holder.length === 0) {
            response += 'Your card holder is empty.\n';
        } else {
            player.holder.forEach((card, i) => {
                response += `${i + 1}. ${card.name} (Tier: ${card.tier})\n`;
            });
        }

        await reply(response);
        break;
      }

      case 'spawnpack6': {
        if (activeCardPacks[from]) {
            return reply('A card pack has already been spawned. Use %claimpack to get it.');
        }

        const sTierCards = cards.filter(c => c.tier === 'S');
        const tier6Cards = cards.filter(c => c.tier === '6');

        if (sTierCards.length === 0 || tier6Cards.length === 0) {
            return reply('Not enough high-tier cards available to create this pack.');
        }

        const guaranteedSTier = sTierCards[Math.floor(Math.random() * sTierCards.length)];
        const guaranteedTier6 = tier6Cards[Math.floor(Math.random() * tier6Cards.length)];

        const pack = [guaranteedSTier, guaranteedTier6];
        for (let i = 0; i < 4; i++) {
            pack.push(cards[Math.floor(Math.random() * cards.length)]);
        }

        activeCardPacks[from] = pack;

        let response = 'A 6-card pack has been spawned! It contains:\n\n';
        pack.forEach(card => {
            response += `- ${card.name} (Tier: ${card.tier})\n`;
        });
        response += '\nUse `%claimpack` to claim the entire pack.';

        await reply(response);
        break;
      }

      case 'spawnpack7': {
        if (activeCardPacks[from]) {
            return reply('A card pack has already been spawned. Use %claimpack to get it.');
        }

        const tiers = ['1', '2', '3', '4', '5', '6', 'S'];
        const pack = [];

        for (const tier of tiers) {
            const cardsInTier = cards.filter(c => c.tier === tier);
            if (cardsInTier.length === 0) {
                return reply(`Not enough cards in tier ${tier} to create this pack.`);
            }
            pack.push(cardsInTier[Math.floor(Math.random() * cardsInTier.length)]);
        }

        activeCardPacks[from] = pack;

        let response = 'A 7-card pack has been spawned! It contains:\n\n';
        pack.forEach(card => {
            response += `- ${card.name} (Tier: ${card.tier})\n`;
        });
        response += '\nUse `%claimpack` to claim the entire pack.';

        await reply(response);
        break;
      }

      case 'claimpack': {
        const pack = activeCardPacks[from];
        if (!pack) {
            return reply('There is no card pack to claim.');
        }

        pack.forEach(card => {
            if (player.deck.length < 12) {
                player.deck.push(card);
            } else {
                player.holder.push(card);
            }
        });

        savePlayer();
        delete activeCardPacks[from];

        await reply('You have claimed the card pack! The cards have been added to your collection.');
        break;
      }

      case 'movetodeck': {
        const holderIndex = parseInt(args[0]) - 1;
        if (isNaN(holderIndex) || holderIndex < 0 || holderIndex >= player.holder.length) {
            return reply('Invalid card holder index.');
        }

        if (player.deck.length >= 12) {
            return reply('Your deck is full. Move a card to your holder first.');
        }

        const [cardToMove] = player.holder.splice(holderIndex, 1);
        player.deck.push(cardToMove);
        savePlayer();

        await reply(`${cardToMove.name} has been moved to your deck.`);
        break;
      }

      case 'movetoholder': {
        const deckIndex = parseInt(args[0]) - 1;
        if (isNaN(deckIndex) || deckIndex < 0 || deckIndex >= player.deck.length) {
            return reply('Invalid deck index.');
        }

        const [cardToMove] = player.deck.splice(deckIndex, 1);
        player.holder.push(cardToMove);
        savePlayer();

        await reply(`${cardToMove.name} has been moved to your card holder.`);
        break;
      }

      case 'givecard': {
        const source = args[0]?.toLowerCase();
        const cardIndex = parseInt(args[1]) - 1;
        const recipientId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

        if (!source || (source !== 'deck' && source !== 'holder')) {
            return reply('Please specify the source: deck or holder.');
        }
        if (isNaN(cardIndex)) {
            return reply('Invalid card index.');
        }
        if (!recipientId) {
            return reply('You need to mention a user to give a card to.');
        }

        const recipient = getPlayer(recipientId);
        if (!recipient) return reply('Recipient not found.');

        let cardToGive;
        if (source === 'deck') {
            if (cardIndex < 0 || cardIndex >= player.deck.length) {
                return reply('Invalid deck index.');
            }
            [cardToGive] = player.deck.splice(cardIndex, 1);
        } else { // holder
            if (cardIndex < 0 || cardIndex >= player.holder.length) {
                return reply('Invalid holder index.');
            }
            [cardToGive] = player.holder.splice(cardIndex, 1);
        }

        if (recipient.deck.length < 12) {
            recipient.deck.push(cardToGive);
        } else {
            recipient.holder.push(cardToGive);
        }

        updatePlayer(player);
        updatePlayer(recipient);

        await reply(`You have given your ${cardToGive.name} card to ${recipient.name}.`);
        break;
      }

      case 'dragon': {
        const query = args.join(' ').toLowerCase();
        if (!query) return reply('Please specify a dragon name or ID.');

        let dragon;
        if (!isNaN(query)) {
            dragon = dragons.find(d => d.id === parseInt(query));
        } else {
            dragon = dragons.find(d => d.name.toLowerCase() === query);
        }

        if (!dragon) return reply('Dragon not found.');

        let caption = `*${dragon.name}*\n`;
        caption += `ID: ${dragon.id}\n`;
        caption += `Type: ${dragon.type}\n`;
        caption += '*Moves:*\n';
        dragon.moves.forEach(move => {
            caption += `- ${move.name} (Damage: ${move.damage}, Type: ${move.type})\n`;
        });

        const partyIndex = player.party.findIndex(d => d.id === dragon.id);
        const denIndex = player.den.findIndex(d => d.id === dragon.id);

        if (partyIndex !== -1) {
            caption += `\n*Location:* Party (Position ${partyIndex + 1})`;
        } else if (denIndex !== -1) {
            caption += `\n*Location:* Den (Position ${denIndex + 1})`;
        }

        try {
            const imageUrl = dragon.imageUrl;
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data, 'binary');

            await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });
        } catch (error) {
            console.error('Error sending dragon image:', error);
            await reply('Sorry, I couldn\'t fetch the image for that dragon. Here are the details:\n\n' + caption);
        }
        break;
      }

      case 'spawn': {
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
        break;
      }

      case 'attack': {
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
        break;
      }

      case 'catch': {
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

        // Simple catch logic for now. A real implementation would have probabilities.
        player.inventory[tool]--;
        wildDragon.captured = true;

        // Add dragon to player's collection. For now, let's put it in the den.
        player.den.push(wildDragon);

        delete activeWildEncounters[from];
        savePlayer();

        await reply(`Congratulations! You caught the ${wildDragon.name}! It has been sent to your den.`);
        break;
      }

      case 'party': {
        if (player.party.length === 0) return reply('Your party is empty.');
        let partyList = '*Your Party:*\n\n';
        player.party.forEach((d, i) => {
          partyList += `${i + 1}. *${d.name}* (Type: ${d.type})\n`;
          d.moves.forEach(move => {
            partyList += `  - ${move.name}\n`;
          });
          partyList += '\n';
        });
        await reply(partyList);
        break;
      }

      case 'den': {
        if (player.den.length === 0) return reply('Your den is empty.');
        let denList = '*Your Den:*\n\n';
        player.den.forEach((d, i) => {
          denList += `${i + 1}. *${d.name}* (Type: ${d.type})\n`;
        });
        await reply(denList);
        break;
      }

      case 'sendtoden': {
        const index = parseInt(args[0]) - 1;
        if (isNaN(index) || index < 0 || index >= player.party.length) {
          return reply('Invalid party dragon index.');
        }

        const [dragonToMove] = player.party.splice(index, 1);
        player.den.push(dragonToMove);
        savePlayer();

        await reply(`${dragonToMove.name} has been moved to your den.`);
        break;
      }

      case 'sendtoparty': {
        if (player.party.length >= 6) return reply('Your party is full (max 6 dragons).');

        const index = parseInt(args[0]) - 1;
        if (isNaN(index) || index < 0 || index >= player.den.length) {
          return reply('Invalid den dragon index.');
        }

        const [dragonToMove] = player.den.splice(index, 1);
        player.party.push(dragonToMove);
        savePlayer();

        await reply(`${dragonToMove.name} has been moved to your party.`);
        break;
      }

      case 'givedragon': {
        const recipientId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!recipientId) return reply('You need to mention a user to give a dragon to.');

        const dragonIndex = parseInt(args[0]) - 1;
        if (isNaN(dragonIndex) || dragonIndex < 0 || dragonIndex >= player.party.length) {
            return reply('Invalid dragon index.');
        }

        const recipient = getPlayer(recipientId);
        if (!recipient) return reply('Recipient not found.');

        const [dragonToGive] = player.party.splice(dragonIndex, 1);
        recipient.den.push(dragonToGive);

        updatePlayer(player);
        updatePlayer(recipient);

        await reply(`You have given your ${dragonToGive.name} to ${recipient.name}.`);
        break;
      }

      case 'trade': {
        if (args[0] === 'accept') {
            const trade = activeTrades[from];
            if (!trade || trade.player2.id !== sender) return reply('There is no trade for you to accept.');

            const player1 = getPlayer(trade.player1.id);
            const player2 = getPlayer(trade.player2.id);

            const dragon1 = player1.party[trade.player1.dragonIndex];
            const dragon2 = player2.party[trade.player2.dragonIndex];

            player1.party[trade.player1.dragonIndex] = dragon2;
            player2.party[trade.player2.dragonIndex] = dragon1;

            updatePlayer(player1);
            updatePlayer(player2);

            delete activeTrades[from];
            await reply('Trade accepted!');

        } else if (args[0] === 'decline') {
            const trade = activeTrades[from];
            if (!trade || trade.player2.id !== sender) return reply('There is no trade for you to decline.');

            delete activeTrades[from];
            await reply('Trade declined.');

        } else {
            const opponentId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!opponentId) return reply('You need to mention a user to trade with.');

            const myDragonIndex = parseInt(args[0]) - 1;
            const theirDragonIndex = parseInt(args[1]) - 1;

            if (isNaN(myDragonIndex) || myDragonIndex < 0 || myDragonIndex >= player.party.length) {
                return reply('Invalid index for your dragon.');
            }

            const opponent = getPlayer(opponentId);
            if (isNaN(theirDragonIndex) || theirDragonIndex < 0 || theirDragonIndex >= opponent.party.length) {
                return reply('Invalid index for their dragon.');
            }

            activeTrades[from] = {
                player1: { id: sender, dragonIndex: myDragonIndex },
                player2: { id: opponentId, dragonIndex: theirDragonIndex }
            };

            await reply(`${opponent.name}, ${player.name} wants to trade their ${player.party[myDragonIndex].name} for your ${opponent.party[theirDragonIndex].name}. Use \`%trade accept\` or \`%trade decline\`.`);
        }
        break;
      }

      case 'train': {
        const now = Date.now();
        const lastTrain = player.cooldowns.train || 0;
        if (now - lastTrain < cooldowns.train) {
            const remaining = cooldowns.train - (now - lastTrain);
            return reply(`Your dragons are tired. You can train them again in ${Math.ceil(remaining / 60000)} minutes.`);
        }

        // For now, training just resets the cooldown.
        // Later, this can be expanded to increase dragon stats.
        player.cooldowns.train = now;
        savePlayer();

        await reply('You have trained your dragons! They are stronger now.');
        break;
      }

      case 'leaderboard': {
        const type = args[0]?.toLowerCase() || 'gold';
        const allPlayers = Object.values(getAllPlayers());

        let sortedPlayers;
        let leaderboard = '';

        switch (type) {
            case 'rank':
                sortedPlayers = allPlayers.sort((a, b) => b.playerLevel - a.playerLevel);
                leaderboard = '*Top 5 Players by Rank:*\n\n';
                sortedPlayers.slice(0, 5).forEach((p, i) => {
                    leaderboard += `${i + 1}. ${p.name} - Level ${p.playerLevel} (${getRank(p.playerLevel)})\n`;
                });
                break;
            case 'dragon':
                const playersWithDragons = allPlayers.filter(p => p.party.length > 0);
                const sortedByDragon = playersWithDragons.sort((a, b) => {
                    const aMaxLevel = Math.max(...a.party.map(d => d.level));
                    const bMaxLevel = Math.max(...b.party.map(d => d.level));
                    return bMaxLevel - aMaxLevel;
                });
                leaderboard = '*Top 5 Players by Dragon Level:*\n\n';
                sortedByDragon.slice(0, 5).forEach((p, i) => {
                    const maxLevel = Math.max(...p.party.map(d => d.level));
                    leaderboard += `${i + 1}. ${p.name} - Highest Dragon Level: ${maxLevel}\n`;
                });
                break;
            default: // gold
                sortedPlayers = allPlayers.sort((a, b) => b.gold - a.gold);
                leaderboard = '*Top 5 Richest Players:*\n\n';
                sortedPlayers.slice(0, 5).forEach((p, i) => {
                    leaderboard += `${i + 1}. ${p.name} - ${p.gold} gold\n`;
                });
        }

        await reply(leaderboard);
        break;
      }

      case 'profile': {
        let targetId = sender;
        if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
            targetId = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }

        const targetPlayer = getPlayer(targetId);
        if (!targetPlayer) return reply('Player not found.');

        let profile = `*Profile of ${targetPlayer.name}*\n\n`;
        profile += `Level: ${targetPlayer.playerLevel}\n`;
        profile += `Rank: ${getRank(targetPlayer.playerLevel)}\n`;
        profile += `XP: ${targetPlayer.playerXp} / ${targetPlayer.playerLevel * 100}\n`;
        profile += `Gold: ${targetPlayer.gold}\n`;
        profile += `Bank: ${targetPlayer.bank}\n`;
        profile += `Dragons: ${targetPlayer.party.length + targetPlayer.den.length}\n`;

        await reply(profile);
        break;
      }

      case 'nickname': {
        const dragonIndex = parseInt(args[0]) - 1;
        const newName = args.slice(1).join(' ');

        if (isNaN(dragonIndex) || dragonIndex < 0 || dragonIndex >= player.party.length) {
            return reply('Invalid dragon index.');
        }
        if (!newName) return reply('Please provide a new name.');

        const dragon = player.party[dragonIndex];
        const oldName = dragon.name;
        dragon.name = newName;
        savePlayer();

        await reply(`You have renamed your ${oldName} to ${newName}.`);
        break;
      }

      case 'daily': {
        // To be implemented
        break;
      }
      case 'quests': {
        // To be implemented
        break;
      }
      case 'dex': {
        // To be implemented
        break;
      }
      case 'craft': {
        // To be implemented
        break;
      }
      case 'map': {
        // To be implemented
        break;
      }
      case 'achievements': {
        // To be implemented
        break;
      }
      case 'market': {
        // To be implemented
        break;
      }
      case 'dungeon': {
        // To be implemented
        break;
      }
      case 'boss': {
        // To be implemented
        break;
      }
      case 're-roll': {
        // To be implemented
        break;
      }

      case 'compliment': {
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to compliment.');
        const targetPlayer = getPlayer(targetId);
        const compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
        await reply(`${targetPlayer.name}, ${compliment}`);
        break;
      }

      case 'insult': {
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to insult.');
        const targetPlayer = getPlayer(targetId);
        const insult = INSULTS[Math.floor(Math.random() * INSULTS.length)];
        await reply(`${targetPlayer.name}, ${insult}`);
        break;
      }

      case 're-roll': {
        if (!hasRole('mod')) return reply('You do not have permission to use this command.');

        const dragonIndex = parseInt(args[0]) - 1;
        if (isNaN(dragonIndex) || dragonIndex < 0 || dragonIndex >= player.party.length) {
            return reply('Invalid dragon index.');
        }

        const dragon = player.party[dragonIndex];
        const fullDragonData = dragons.find(d => d.id === dragon.id);

        if (!fullDragonData) {
            return reply('Could not find the full data for this dragon.');
        }

        const allMoves = fullDragonData.moveset || fullDragonData.moves;
        dragon.moves = getRandomMoves(allMoves, 4);
        savePlayer();

        await reply(`You have re-rolled the moves for your ${dragon.name}.`);
        break;
      }

      case 'mode': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const mode = args[0]?.toLowerCase();
        if (mode === 'public' || mode === 'private') {
            botMode = mode;
            await reply(`Bot mode set to ${mode}.`);
        } else {
            await reply('Usage: %mode <public/private>');
        }
        break;
      }

      case 'clearsession': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        // This is a dangerous command. It will delete the auth folder and stop the bot.
        // It's better to just log out.
        await reply('Logging out...');
        await sock.logout();
        break;
      }

      case 'setpp': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        if (!msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
            return reply('Please reply to an image to set it as the profile picture.');
        }
        try {
            const stream = await downloadContentFromMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image');
            let buffer = Buffer.from([]);
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            await sock.updateProfilePicture(sock.user.id, buffer);
            await reply('Profile picture updated.');
        } catch (error) {
            console.error('Error setting profile picture:', error);
            await reply('I could not set the profile picture.');
        }
        break;
      }

      case 'autotyping': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const option = args[0]?.toLowerCase();
        if (option === 'on') {
            autoTyping = true;
            await reply('Auto typing enabled.');
        } else if (option === 'off') {
            autoTyping = false;
            await reply('Auto typing disabled.');
        } else {
            await reply('Usage: %autotyping <on/off>');
        }
        break;
      }

      case 'autoread': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const option = args[0]?.toLowerCase();
        if (option === 'on') {
            autoRead = true;
            await reply('Auto read enabled.');
        } else if (option === 'off') {
            autoRead = false;
            await reply('Auto read disabled.');
        } else {
            await reply('Usage: %autoread <on/off>');
        }
        break;
      }

      case 'antidelete': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const option = args[0]?.toLowerCase();
        if (option === 'on') {
            antideleteEnabled = true;
            await reply('Anti-delete enabled.');
        } else if (option === 'off') {
            antideleteEnabled = false;
            await reply('Anti-delete disabled.');
        } else {
            await reply('Usage: %antidelete <on/off>');
        }
        break;
      }

      case 'autoreact': {
        if (!hasRole('owner')) return reply('You do not have permission to use this command.');
        const option = args[0]?.toLowerCase();
        if (option === 'on') {
            autoreactEnabled = true;
            await reply('Auto-react enabled.');
        } else if (option === 'off') {
            autoreactEnabled = false;
            await reply('Auto-react disabled.');
        } else {
            await reply('Usage: %autoreact <on/off>');
        }
        break;
      }

      case 'flirt': {
        const flirt = FLIRT_LINES[Math.floor(Math.random() * FLIRT_LINES.length)];
        await reply(flirt);
        break;
      }

      case 'shayari': {
        const line = SHAYARI[Math.floor(Math.random() * SHAYARI.length)];
        await reply(line);
        break;
      }

      case 'goodnight': {
        await reply('Goodnight! Sleep well.');
        break;
      }

      case 'roseday': {
        await reply('Happy Rose Day! 🌹');
        break;
      }

      case 'character': {
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user.');
        const targetPlayer = getPlayer(targetId);
        const characters = ['a hero', 'a villain', 'a sidekick', 'a mysterious stranger'];
        const character = characters[Math.floor(Math.random() * characters.length)];
        await reply(`${targetPlayer.name} is ${character}.`);
        break;
      }

      case 'wasted': {
        // This command would ideally generate an image.
        // For now, it will just send a text message.
        await reply('Wasted!');
        break;
      }

      case 'ship': {
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user to ship with.');
        const targetPlayer = getPlayer(targetId);
        const compatibility = Math.floor(Math.random() * 101);
        const comment = getShipComment(compatibility);
        await reply(`Your compatibility with ${targetPlayer.name} is ${compatibility}%.\n${comment}`);
        break;
      }

      case 'simp': {
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user.');
        const targetPlayer = getPlayer(targetId);
        const simpRate = Math.floor(Math.random() * 101);
        await reply(`${targetPlayer.name} is ${simpRate}% a simp.`);
        break;
      }

      case 'stupid': {
        const targetId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!targetId) return reply('You need to mention a user.');
        const targetPlayer = getPlayer(targetId);
        const stupidRate = Math.floor(Math.random() * 101);
        await reply(`${targetPlayer.name} is ${stupidRate}% stupid.`);
        break;
      }

      case 'mods': {
        const allPlayers = Object.values(getAllPlayers());
        const mods = allPlayers.filter(p => p.roles.includes('mod') || p.roles.includes('owner'));

        if (mods.length === 0) {
            return reply('There are no mods or owners.');
        }

        let response = '*Bot Moderators & Owners:*\n\n';
        mods.forEach(mod => {
            response += `- ${mod.name}\n`;
        });

        await reply(response);
        break;
      }

      case 'spawncard': {
        if (activeCardSpawns[from]) {
            return reply('A card has already been spawned. Use %claim to get it.');
        }

        try {
            let cardToSpawn;
            const spawnType = Math.random() < 0.5 ? 'dragon_card' : 'anime_gif';

            if (spawnType === 'dragon_card') {
                const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?race=Dragon');
                const dragonCards = response.data.data;
                const randomDragonCard = dragonCards[Math.floor(Math.random() * dragonCards.length)];

                cardToSpawn = {
                    name: randomDragonCard.name,
                    tier: 'Dragon',
                    imageUrl: randomDragonCard.card_images[0].image_url,
                    type: 'dragon_card'
                };
            } else { // anime_gif
                const searchTerms = ['anime', 'anime fight', 'kawaii', 'chibi'];
                const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
                const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${randomTerm}&limit=50&rating=pg-13`);
                const gifs = response.data.data;
                const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

                cardToSpawn = {
                    name: randomGif.title || 'Anime GIF',
                    tier: 'Anime',
                    imageUrl: randomGif.images.original.url.split('?')[0], // Get clean URL
                    type: 'anime_gif'
                };
            }

            activeCardSpawns[from] = cardToSpawn;

            const imageResponse = await axios.get(cardToSpawn.imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imageResponse.data, 'binary');

            let caption = `A wild card has appeared!\n\n`;
            caption += `*${cardToSpawn.name}* (Tier: ${cardToSpawn.tier})\n\n`;
            caption += `Use \`%claim\` to add it to your collection!`;

            await sock.sendMessage(from, { image: imageBuffer, caption: caption }, { quoted: msg });

        } catch (error) {
            console.error('Error fetching or sending card:', error);
            await reply('Sorry, I could not spawn a card at this time. Please try again later.');
        }
        break;
      }

      case 'claim': {
        const card = activeCardSpawns[from];
        if (!card) {
            return reply('There is no card to claim.');
        }

        if (player.gold < CARD_CLAIM_COST) {
            return reply(`You need ${CARD_CLAIM_COST} gold to claim this card. You only have ${player.gold}.`);
        }

        player.gold -= CARD_CLAIM_COST;

        if (player.deck.length < 12) {
            player.deck.push(card);
            await reply(`You spent ${CARD_CLAIM_COST} gold and claimed the ${card.name} card! It has been added to your deck.`);
        } else {
            player.holder.push(card);
            await reply(`You spent ${CARD_CLAIM_COST} gold and claimed the ${card.name} card! Your deck is full, so it has been sent to your card holder.`);
        }

        savePlayer();
        delete activeCardSpawns[from];

        break;
      }

      case 'buypack': {
        if (player.gold < CARD_PACK_COST) {
            return reply(`You need ${CARD_PACK_COST} gold to buy a card pack. You only have ${player.gold}.`);
        }

        player.gold -= CARD_PACK_COST;
        await reply(`You spent ${CARD_PACK_COST} gold and bought a card pack! Fetching your cards...`);

        const newCards = [];
        try {
            for (let i = 0; i < CARD_PACK_SIZE; i++) {
                let cardToSpawn;
                const spawnType = Math.random() < 0.5 ? 'dragon_card' : 'anime_gif';

                if (spawnType === 'dragon_card') {
                    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?race=Dragon');
                    const dragonCards = response.data.data;
                    const randomDragonCard = dragonCards[Math.floor(Math.random() * dragonCards.length)];
                    cardToSpawn = { name: randomDragonCard.name, tier: 'Dragon', imageUrl: randomDragonCard.card_images[0].image_url, type: 'dragon_card' };
                } else {
                    const searchTerms = ['anime', 'anime fight', 'kawaii', 'chibi'];
                    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
                    const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${randomTerm}&limit=50&rating=pg-13`);
                    const gifs = response.data.data;
                    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
                    cardToSpawn = { name: randomGif.title || 'Anime GIF', tier: 'Anime', imageUrl: randomGif.images.original.url.split('?')[0], type: 'anime_gif' };
                }
                newCards.push(cardToSpawn);

                if (player.deck.length < 12) {
                    player.deck.push(cardToSpawn);
                } else {
                    player.holder.push(cardToSpawn);
                }
            }

            savePlayer();

            let packContents = 'Your new pack contains:\n\n';
            newCards.forEach(card => {
                packContents += `- ${card.name} (Tier: ${card.tier})\n`;
            });
            packContents += '\nThese have been added to your collection.';
            await reply(packContents);

        } catch (error) {
            console.error('Error fetching card pack:', error);
            player.gold += CARD_PACK_COST; // Refund on error
            savePlayer();
            await reply('Sorry, there was an error creating your card pack. Your gold has been refunded.');
        }
        break;
      }

      case 'battle': {
        const battle = activeBattles[from];
        const subCommand = args[0]?.toLowerCase();

        if (!battle) {
            // Start a new battle
            if (activeBattles[from]) return reply('A battle is already in progress in this chat.');

            const opponentId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!opponentId) return reply('You need to mention a user to battle.');
            if (opponentId === sender) return reply('You cannot battle yourself.');

            const opponent = getPlayer(opponentId);
            if (!opponent) return reply('Opponent not found.');

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

        // Handle sub-commands for an existing battle
        switch (subCommand) {
            case 'fight': {
                const battle = activeBattles[from];
                if (!battle) return reply('You are not in a battle.');

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

                // Check for environmental boost
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
                    battleReport += `*${battle[currentPlayerKey].player.name}'s ${battle[currentPlayerKey].dragon.name} wins!*`;

                    const winner = battle[currentPlayerKey].player;
                    const winnerDragon = battle[currentPlayerKey].dragon;
                    const loserDragon = battle[opponentPlayerKey].dragon;

                    // Dragon XP
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

                    // Player XP
                    winner.playerXp += PLAYER_XP_GAIN;
                    battleReport += `\nYou gained ${PLAYER_XP_GAIN} player XP!`;

                    if (winner.playerXp >= winner.playerLevel * 100) {
                        winner.playerLevel++;
                        winner.playerXp = 0;
                        battleReport += `\n*Congratulations! You reached level ${winner.playerLevel} and are now a ${getRank(winner.playerLevel)}!*`;
                    }

                    updatePlayer(winner);
                    delete activeBattles[from];
                    return reply(battleReport);
                }

                battle.turn = opponentPlayerKey;

                battleReport += `It's ${battle[opponentPlayerKey].player.name}'s turn! Use \`%battle fight <1-4>\` to attack.`;
                await reply(battleReport);
                break;
            }
            case 'switch': {
                const battle = activeBattles[from];
                if (!battle) return reply('You are not in a battle.');

                const currentPlayerKey = battle.turn;
                if (battle[currentPlayerKey].id !== sender) return reply('It is not your turn.');

                const position = parseInt(args[1]) - 1;
                if (isNaN(position) || position < 0 || position >= player.party.length) {
                    return reply('Invalid party position.');
                }

                const newDragon = player.party[position];
                if (newDragon.id === battle[currentPlayerKey].dragon.id) {
                    return reply('That dragon is already in battle.');
                }

                battle[currentPlayerKey].dragon = { ...newDragon };
                const totalPlayerDamage = newDragon.moves.reduce((sum, move) => sum + move.damage, 0);
                battle[currentPlayerKey].dragon.hp = totalPlayerDamage * 5;

                battle.turn = currentPlayerKey === 'player1' ? 'player2' : 'player1';

                await reply(`${player.name} switched to ${newDragon.name}. It's now ${battle[battle.turn].player.name}'s turn.`);
                break;
            }
            case 'catch': {
                const battle = activeBattles[from];
                if (!battle) return reply('You are not in a battle.');

                if (battle.player2) {
                    return reply('You cannot catch another player\'s dragon.');
                }

                const wildDragon = battle.opponentDragon;
                const tool = args[1]?.toLowerCase();
                if (!tool) return reply('Please specify a tool to use for catching.');
                if (!player.inventory[tool] || player.inventory[tool] <= 0) {
                  return reply(`You don't have any ${tool}.`);
                }

                player.inventory[tool]--;

                // Simple catch logic for now
                const catchChance = (1 - (wildDragon.hp / (wildDragon.moves.reduce((s, m) => s + m.damage, 0) * 5))) * 0.5;
                if (Math.random() < catchChance) {
                    wildDragon.captured = true;
                    player.den.push(wildDragon);

                    delete activeBattles[from];
                    if(activeWildEncounters[from]) delete activeWildEncounters[from];
                    savePlayer();

                    await reply(`Congratulations! You caught the ${wildDragon.name}! It has been sent to your den.`);
                } else {
                    await reply(`Oh no! The ${wildDragon.name} broke free!`);
                    // Wild dragon's turn
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
                const battle = activeBattles[from];
                if (!battle) return reply('You are not in a battle.');

                if (battle.player2) {
                    return reply('You cannot run from a player battle. Use `%battle forfeit` instead.');
                }

                delete activeBattles[from];
                await reply('You ran away from the battle.');
                break;
            }

            case 'forfeit': {
                const battle = activeBattles[from];
                if (!battle) return reply('You are not in a battle.');

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
        break;
      }

      default:
        await reply('Unknown command. Type %help for the command list.');
    }
  });
  setInterval(async () => {
    const allGroupSettings = getGroupSettings();
    for (const groupId in allGroupSettings) {
        if (allGroupSettings[groupId].wild && !activeWildEncounters[groupId]) {
            const randomDragon = { ...dragons[Math.floor(Math.random() * dragons.length)] };
            const totalDamage = randomDragon.moves.reduce((sum, move) => sum + move.damage, 0);
            randomDragon.hp = totalDamage * 5;

            activeWildEncounters[groupId] = { dragon: randomDragon, captured: false, spawnTime: Date.now() };

            await sock.sendMessage(groupId, { text: `A wild ${randomDragon.name} (HP: ${randomDragon.hp}) has appeared! Use %attack to battle it.` });

            setTimeout(async () => {
                if (activeWildEncounters[groupId] && !activeWildEncounters[groupId].captured) {
                    delete activeWildEncounters[groupId];
                    await sock.sendMessage(groupId, { text: `The wild ${randomDragon.name} flew away.` });
                }
            }, 3 * 60 * 1000);
        }
    }
  }, 5 * 60 * 1000);

  // Automatic Card Spawner
  setInterval(async () => {
    const allGroupSettings = loadGroupSettings();
    for (const groupId in allGroupSettings) {
        if (allGroupSettings[groupId].wildcard && !activeCardSpawns[groupId]) {
            try {
                let cardToSpawn;
                const spawnType = Math.random() < 0.5 ? 'dragon_card' : 'anime_gif';

                if (spawnType === 'dragon_card') {
                    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?race=Dragon');
                    const dragonCards = response.data.data;
                    const randomDragonCard = dragonCards[Math.floor(Math.random() * dragonCards.length)];
                    cardToSpawn = { name: randomDragonCard.name, tier: 'Dragon', imageUrl: randomDragonCard.card_images[0].image_url, type: 'dragon_card' };
                } else {
                    const searchTerms = ['anime', 'anime fight', 'kawaii', 'chibi'];
                    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
                    const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${randomTerm}&limit=50&rating=pg-13`);
                    const gifs = response.data.data;
                    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
                    cardToSpawn = { name: randomGif.title || 'Anime GIF', tier: 'Anime', imageUrl: randomGif.images.original.url.split('?')[0], type: 'anime_gif' };
                }

                activeCardSpawns[groupId] = cardToSpawn;

                const imageResponse = await axios.get(cardToSpawn.imageUrl, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(imageResponse.data, 'binary');

                let caption = `A wild card has appeared!\n\n`;
                caption += `*${cardToSpawn.name}* (Tier: ${cardToSpawn.tier})\n\n`;
                caption += `Use \`%claim\` to add it to your collection! It costs 100 gold.`;

                await sock.sendMessage(groupId, { image: imageBuffer, caption: caption });

                // Card disappears after 5 minutes
                setTimeout(() => {
                    if (activeCardSpawns[groupId] && activeCardSpawns[groupId].name === cardToSpawn.name) {
                        delete activeCardSpawns[groupId];
                        sock.sendMessage(groupId, { text: `The card "${cardToSpawn.name}" was not claimed and has disappeared.` });
                    }
                }, 5 * 60 * 1000);

            } catch (error) {
                console.error(`Error auto-spawning card in group ${groupId}:`, error);
            }
        }
    }
  }, 20 * 60 * 1000); // Every 20 minutes
}

main();
