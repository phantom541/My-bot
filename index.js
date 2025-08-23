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

const OWNER_NAME = 'ⱠΔ₩–ⱠΞƧƧ ⱣⱧΔ₥ŦØ₥';
const OWNER_JID = '26775949123@s.whatsapp.net';
const PREFIX = '%';
const STARTER_DRAGON_IDS = [3, 4, 5, 6, 7, 9];
const rolesHierarchy = ['user', 'mod', 'owner'];
const cooldowns = {
  spawn: 10 * 60 * 1000,
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

function getRank(level) {
    const rankIndex = Math.floor((level - 1) / 10);
    return RANKS[rankIndex] || RANKS[RANKS.length - 1];
}

const wildSpawnsEnabled = { enabled: false };
const COMPLIMENTS = [ "You're an amazing person!", "You're a true inspiration!", "You have a heart of gold." ];
const INSULTS = [ "You're not the sharpest tool in the shed, are you?", "I've had conversations with a wall that were more interesting.", "I've seen more charisma in a wet sock." ];
const FLIRT_LINES = [ "Are you a magician? Because whenever I look at you, everyone else disappears!", "Do you have a map? I just got lost in your eyes.", "I'm not a photographer, but I can definitely picture us together." ];
const SHAYARI = [ "Tere ishq mein, hadd se guzar jaun...", "Mohabbat ka safar, lamba hai magar...", "Dil ki baatein, lafzon mein kaise kahun..." ];
const activeWildEncounters = {};
const activeBattles = {};
const activeTrades = {};
let botMode = 'public';
let autoTyping = false;
let autoRead = false;
let antideleteEnabled = false;
let autoreactEnabled = false;

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

    const savePlayer = () => updatePlayer(player);

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

*Economy:*
%balance - Check gold & bank
%deposit <amount> - Deposit gold
%withdraw <amount> - Withdraw gold
%mart - View items to buy
%buy <item> - Buy capture tools
%slot <amount> - Gamble gold (max 1,000,000 at once)

*Dragons:*
%spawn - Spawn a wild dragon (cooldown 10m)
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

*Gifting & Trading:*
%givedragon <dragon_index> @user - Give a dragon to another player.
%trade @user <your_dragon_index> <their_dragon_index> - Propose a trade.
%trade accept - Accept a trade proposal.
%trade decline - Decline a trade proposal.

*Admin:*
%ban @user - Ban a user from using the bot.
%unban @user - Unban a user.
%promote @user - Promote a user to mod.
%demote @user - Demote a mod.
%kick @user - Kick a user from the group.
%wild on/off - Enable/disable wild spawns (mods only)
%givegold @user <amount> - Give gold to user (owner only)

*Owner:*
%mode <public/private> - Set the bot mode.
%clearsession - Clear the bot's session file.
%setpp <reply to image> - Set the bot's profile picture.
%autotyping <on/off> - Enable or disable auto typing.
%autoread <on/off> - Enable or disable auto read.
%antidelete <on/off> - Enable or disable anti-delete.
%autoreact <on/off> - Enable or disable auto-react.

*Downloader:*
%play <song_name> - Play a song from YouTube.

Owner: ${OWNER_NAME}
        `);
        break;

      case 'guide': {
        const guideName = args[0]?.toLowerCase();
        if (!guideName) {
            return reply('*Available Guides:*\n- start-hunt\n- battle\n- trade\n- remove');
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
            default:
                await reply('Invalid guide name. Use `%guide` to see the list of available guides.');
        }
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
        const shop = {
          masterorb: { name: "Master Orb", price: 50000 },
          ultratrap: { name: "Ultra Trap", price: 10000 },
          greatsnare: { name: "Great Snare", price: 5000 },
          dragnet: { name: "Dragon Net", price: 1000 }
        };

        if (command === 'mart') {
          let shopText = '*Shop Items:*\n';
          for (const key in shop) {
            shopText += `- ${shop[key].name}: ${shop[key].price} gold\n`;
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

      case 'wild': {
        if (!hasRole('mod')) return reply('Only mods and owners can toggle wild spawns.');
        const option = args[0]?.toLowerCase();
        if (option === 'on') {
          wildSpawnsEnabled.enabled = true;
          await reply('Wild spawns enabled.');
        } else if (option === 'off') {
          wildSpawnsEnabled.enabled = false;
          await reply('Wild spawns disabled.');
        } else {
          await reply('Usage: %wild on/off');
        }
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
                player.party.push(selectedDragon);
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
        const totalDamage = randomDragon.moves.reduce((sum, move) => sum + move.damage, 0);
        randomDragon.hp = totalDamage * 5; // Simple HP calculation

        activeWildEncounters[from] = { ...randomDragon, captured: false };
        player.cooldowns.spawn = now;
        savePlayer();

        await reply(`A wild ${randomDragon.name} (HP: ${randomDragon.hp}) has appeared! Use %attack to battle it.`);
        break;
      }

      case 'attack': {
        if (activeBattles[from]) return reply('You are already in a battle.');
        const wildDragon = activeWildEncounters[from];
        if (!wildDragon) return reply('There is no wild dragon to attack.');
        if (player.party.length === 0) return reply('You have no dragons in your party to battle with.');

        const playerDragon = { ...player.party[0] };
        const totalPlayerDamage = playerDragon.moves.reduce((sum, move) => sum + move.damage, 0);
        playerDragon.hp = totalPlayerDamage * 5;

        activeBattles[from] = {
            player,
            playerDragon,
            opponentDragon: wildDragon,
            turn: 'player'
        };

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
        const wildDragon = activeWildEncounters[from];
        if (!wildDragon) return reply('There is no wild dragon to catch.');
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
        await reply(`Your compatibility with ${targetPlayer.name} is ${compatibility}%.`);
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

      case 'battle': {
        if (args[0] === 'fight') {
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
            battle[opponentPlayerKey].dragon.hp -= move.damage;

            let battleReport = `${battle[currentPlayerKey].player.name}'s ${battle[currentPlayerKey].dragon.name} used ${move.name} and dealt ${move.damage} damage!\n`;
            battleReport += `${battle[opponentPlayerKey].player.name}'s ${battle[opponentPlayerKey].dragon.name} has ${battle[opponentPlayerKey].dragon.hp} HP remaining.\n\n`;

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

        } else {
            if (activeBattles[from]) return reply('A battle is already in progress in this chat.');

            const opponentId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!opponentId) return reply('You need to mention a user to battle.');
            if (opponentId === sender) return reply('You cannot battle yourself.');

            const opponent = getPlayer(opponentId);
            if (!opponent) return reply('Opponent not found.');

            if (player.party.length === 0) return reply('You have no dragons in your party to battle with.');
            if (opponent.party.length === 0) return reply(`${opponent.name} has no dragons in their party.`);

            const playerDragon = { ...player.party[0] };
            const opponentDragon = { ...opponent.party[0] };

            const totalPlayerDamage = playerDragon.moves.reduce((sum, move) => sum + move.damage, 0);
            playerDragon.hp = totalPlayerDamage * 5;

            const totalOpponentDamage = opponentDragon.moves.reduce((sum, move) => sum + move.damage, 0);
            opponentDragon.hp = totalOpponentDamage * 5;

            activeBattles[from] = {
                player1: { id: sender, player: player, dragon: playerDragon },
                player2: { id: opponentId, player: opponent, dragon: opponentDragon },
                turn: 'player1'
            };

            let battleGuide = `*A battle has started between ${player.name} and ${opponent.name}!*\n\n`;
            battleGuide += `*${player.name}'s ${playerDragon.name}* (HP: ${playerDragon.hp})\n`;
            battleGuide += `*${opponent.name}'s ${opponentDragon.name}* (HP: ${opponentDragon.hp})\n\n`;
            battleGuide += `It's ${player.name}'s turn! Use \`%battle fight <1-4>\` to attack.\n`;
            playerDragon.moves.forEach((move, i) => {
                battleGuide += `${i + 1}. ${move.name}\n`;
            });

            await reply(battleGuide);
        }
        break;
      }

      default:
        await reply('Unknown command. Type %help for the command list.');
    }
  });
}

main();
