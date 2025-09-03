const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  downloadContentFromMessage
} = require("baileys");

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
const { createGuild, getGuild, getAllGuilds, updateGuild } = require('./guildData.js');
const { DUNGEON_TIERS: dungeonTiers, generateDungeon } = require('./dungeonData.js');
const { MONSTERS: monsters } = require('./monsters.js');
const beasts = require('./beastData.js');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dgg6fak2e',
  api_key: '472624818289699',
  api_secret: 'trlLYWt16aTFgzc0cU1afuscQuM'
});

const OWNER_NAME = 'ⱠΔ₩–ⱠΞƧƧ ⱣⱧΔ₥ŦØ₥';
const OWNER_NUMBER = '26775949123';
const GIPHY_API_KEY = 'Pkfeqgcgi4LsgiR677BoTBWKN2utJrAl';
const CARD_CLAIM_COST = 100;
const CARD_PACK_COST = 300;
const CARD_PACK_SIZE = 3;
const GUILD_CREATE_COST = 10000;
const UNSPLASH_ACCESS_KEY = 'YRq1pHreWswtEjw1_iMs0XjuRfJzM1dSj4Kk6FOSmPk';
const GUILD_TIERS = {
    1: { name: "Bronze", xp_boost: 0.05, loot_bonus: 0.05 },
    10: { name: "Silver", xp_boost: 0.10, loot_bonus: 0.10 },
    25: { name: "Gold", xp_boost: 0.15, loot_bonus: 0.15 },
    50: { name: "Platinum", xp_boost: 0.20, loot_bonus: 0.20 },
    100: { name: "Mythic", xp_boost: 0.25, loot_bonus: 0.25 },
};
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

async function findDragonImage(query) {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: `${query} dragon fantasy art`, per_page: 1 },
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        });
        if (response.data.results.length > 0) {
            return response.data.results[0].urls.regular;
        }
        return null;
    } catch (error) {
        console.error("Error fetching from Unsplash:", error.response?.data || error.message);
        return null;
    }
}

async function handleDungeonProgression(from, sock) {
    const dungeon = activeDungeons[from];
    if (!dungeon) return;

    // A monster was just defeated. Let's see what's next.
    dungeon.monstersDefeated = (dungeon.monstersDefeated || 0) + 1;
    const currentFloor = `floor${dungeon.floor}`;
    const monstersOnFloor = dungeon.monster_layout[currentFloor].length;

    if (dungeon.monstersDefeated < monstersOnFloor) {
        // More monsters on this floor
        const monster = dungeon.monster_layout[currentFloor][dungeon.monstersDefeated];

        // Cycle through the party
        const nextPlayerIndex = dungeon.monstersDefeated % dungeon.party.length;
        const playerToFight = dungeon.party[nextPlayerIndex];

        activeBattles[from] = {
            player: playerToFight,
            playerDragon: { level: 5, xp: 0, ...playerToFight.party[0] },
            opponentDragon: monster,
            turn: 'player',
            environment: dungeon.environment,
            isDungeonBattle: true
        };

        await sock.sendMessage(from, { text: `${playerToFight.name} steps up to face the next challenge: a ${monster.name}!` });

    } else {
        // Floor cleared!
        if (dungeon.floor < dungeon.floors) {
            dungeon.floor++;
            dungeon.monstersDefeated = 0;
            const nextFloor = `floor${dungeon.floor}`;
            const monster = dungeon.monster_layout[nextFloor][0];
            const playerToFight = dungeon.party[0]; // First player starts the new floor

            activeBattles[from] = {
                player: playerToFight,
                playerDragon: { level: 5, xp: 0, ...playerToFight.party[0] },
                opponentDragon: monster,
                turn: 'player',
                environment: dungeon.environment,
                isDungeonBattle: true
            };

            await sock.sendMessage(from, { text: `Floor ${dungeon.floor - 1} cleared! The party descends to Floor ${dungeon.floor}.\n\n${playerToFight.name} encounters a ${monster.name}!` });

        } else {
            // Dungeon complete!
            await sock.sendMessage(from, { text: `Congratulations! Your party has cleared the ${dungeon.name}!` });

            const guildXpGained = 100; // Base XP for dungeon clear
            const notifiedGuilds = new Set(); // To prevent spamming guild level up messages

            dungeon.party.forEach(p => {
                const player = getPlayer(p.id);
                let goldGained = dungeon.rewards.gold;
                let xpGained = dungeon.rewards.xp;
                let rewardMessage = "";

                if (player.guildId) {
                    const guild = getGuild(player.guildId);
                    if (guild) {
                        // Apply Perks
                        const goldBonus = Math.floor(goldGained * guild.perks.loot_bonus);
                        const xpBonus = Math.floor(xpGained * guild.perks.xp_boost);
                        goldGained += goldBonus;
                        xpGained += xpBonus;
                        if (goldBonus > 0 || xpBonus > 0) {
                            rewardMessage += ` (Guild Bonus: +${goldBonus} Gold, +${xpBonus} XP)`;
                        }

                        // Grant Guild XP, but only announce level-up once per guild
                        if (!notifiedGuilds.has(guild.id)) {
                            guild.xp += guildXpGained;
                            sock.sendMessage(from, { text: `Your guild "${guild.name}" gained ${guildXpGained} XP for clearing the dungeon!` });

                            const requiredXp = guild.level * 1000;
                            if (guild.xp >= requiredXp) {
                                guild.level++;
                                guild.xp -= requiredXp;
                                sock.sendMessage(from, { text: `*Congratulations! Your guild has reached Level ${guild.level}!*` });

                                const newTierKey = Object.keys(GUILD_TIERS).reverse().find(level => guild.level >= parseInt(level));
                                if (newTierKey) {
                                    const newTier = GUILD_TIERS[newTierKey];
                                    if (newTier.name !== guild.tier) {
                                        guild.tier = newTier.name;
                                        guild.perks.xp_boost = newTier.xp_boost;
                                        guild.perks.loot_bonus = newTier.loot_bonus;
                                        sock.sendMessage(from, { text: `Your guild has been promoted to ${guild.tier} Tier, unlocking new perks!` });
                                    }
                                }
                            }
                            notifiedGuilds.add(guild.id);
                        }
                        updateGuild(guild);
                    }
                }

                player.gold += goldGained;
                player.playerXp += xpGained;
                updatePlayer(player);
                sock.sendMessage(from, { text: `${player.name} receives ${goldGained} gold and ${xpGained} XP!${rewardMessage}` });
            });

            // Distribute special rewards
            let specialRewardsMessage = "\n*Special Rewards Found!*";
            if (dungeon.rewards.special && dungeon.rewards.special.length > 0) {
                dungeon.party.forEach(p => {
                    const player = getPlayer(p.id);
                    dungeon.rewards.special.forEach(reward => {
                        player.inventory[reward] = (player.inventory[reward] || 0) + 1;
                        specialRewardsMessage += `\n- ${player.name} received a ${reward}!`;
                    });
                    updatePlayer(player);
                });
                await sock.sendMessage(from, { text: specialRewardsMessage });
            }

            delete activeDungeons[from];
        }
    }
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
const botSettings = {
  mode: 'public',
  autoTyping: false,
  autoRead: false,
  antideleteEnabled: false,
  autoreactEnabled: false,
};
const activeCardSpawns = {};
const activeCardPacks = {};
const activeTournaments = {};
const activeDungeons = {};
const activeBeast = {};

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

  // Load Command Files
  sock.commands = new Map();
  try {
    const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
    console.log(`Loading ${commandFiles.length} commands...`);

    for (const file of commandFiles) {
        try {
            const command = require(`./cmds/${file}`);
            if (command.name) {
                sock.commands.set(command.name, command);
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => sock.commands.set(alias, command));
                }
            } else {
                console.log(`[WARNING] The command at ${file} is missing a "name" property.`);
            }
        } catch (error) {
            console.error(`[ERROR] Failed to load command at ${file}:`, error);
        }
    }
  } catch (error) {
    console.error("Could not read cmds directory:", error);
  }


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
    if (botSettings.antideleteEnabled) {
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

    const reply = async (text) => {
      await sock.sendMessage(from, { text }, { quoted: msg });
    };

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
    const commandName = args.shift().toLowerCase();

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

    if (player.banned) return;

    if (sender.startsWith(OWNER_NUMBER) && !player.roles.includes('owner')) {
        player.roles.push('owner');
        savePlayer();
        await reply(`Welcome, owner! You have been granted owner role.`);
    }

    const command = sock.commands.get(commandName);

    if (!command) {
        await reply('Unknown command. Type %help for the command list.');
        return;
    }

    const context = {
        sock,
        msg,
        args,
        from,
        sender,
        player,
        savePlayer,
        reply,
        isGroupAdmin,
        hasRole,
        commandName,
        // State and Data
        activeWildEncounters, activeBattles, activeTrades, quests, dungeons, market, achievements,
        botSettings, activeCardSpawns,
        activeCardPacks, activeTournaments, activeDungeons, activeBeast,
        dragons, cards, shop, beasts, monsters, dungeonTiers,
        // Constants
        OWNER_NAME, OWNER_NUMBER, GIPHY_API_KEY, CARD_CLAIM_COST, CARD_PACK_COST, CARD_PACK_SIZE,
        GUILD_CREATE_COST, UNSPLASH_ACCESS_KEY, GUILD_TIERS, PREFIX, STARTER_DRAGON_IDS,
        rolesHierarchy, cooldowns, MAX_LEVEL, XP_PER_LEVEL, XP_GAIN_MULTIPLIER, PLAYER_XP_GAIN,
        RANKS, typeEffectiveness, COMPLIMENTS, INSULTS, FLIRT_LINES, SHAYARI, wildSpawnsEnabled,
        BATTLE_ENVIRONMENTS,
        // Functions
        getPlayer, updatePlayer, getAllPlayers, getGroupSettings, updateGroupSettings,
        createGuild, getGuild, getAllGuilds, updateGuild, generateDungeon,
        handleDungeonProgression, generateBattleImage, findDragonImage,
        getEffectiveness, getRank, getShipComment, downloadContentFromMessage,
    };

    try {
        await command.execute(context);
    } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        await reply('There was an error trying to execute that command.');
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
