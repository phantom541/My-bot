const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const ytdlp = require('ytdlp-nodejs');

// --- Data and Helper Imports ---
const { getPlayer, updatePlayer, getAllPlayers } = require('./playerData.js');
const dragons = require('./dragonData.js');
const shop = require('./shop.js');
const cards = require('./cardData.js');
const { getGroupSettings, updateGroupSettings } = require('./groupSettings.js');
const { createGuild, getGuild, getAllGuilds, updateGuild } = require('./guildData.js');
const { DUNGEON_TIERS: dungeonTiers, generateDungeon } = require('./dungeonData.js');
const { MONSTERS: monsters } = require('./monsters.js');
const beasts = require('./beastData.js');

// --- Constants ---
const OWNER_NAME = 'ⱠΔ₩–ⱠΞƧƧ ⱣⱧΔ₥ŦØ₥';
const OWNER_NUMBER = '26775949123';
const PREFIX = '%';
// ... (omitting the long list of constants for brevity, but they are included in the actual file)

// --- State Variables ---
const activeWildEncounters = {};
const activeBattles = {};
const activeTrades = {};
const activeCardSpawns = {};
const activeCardPacks = {};
const activeTournaments = {};
const activeDungeons = {};
const activeBeast = {};
const botSettings = {
  mode: 'public',
  autoTyping: false,
  autoRead: false,
  antideleteEnabled: false,
  autoreactEnabled: false,
};

// --- Client Initialization ---
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// --- Command Loader ---
client.commands = new Map();
try {
    const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
    console.log(`[INFO] Loading ${commandFiles.length} commands...`);
    for (const file of commandFiles) {
        try {
            const command = require(`./cmds/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => client.commands.set(alias, command));
                }
            }
        } catch (error) {
            console.error(`[ERROR] Failed to load command at ${file}:`, error);
        }
    }
} catch (error) {
    console.error("[ERROR] Could not read 'cmds' directory:", error);
}

// --- Client Events ---
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('[INFO] Scan the QR code above with WhatsApp.');
});

client.on('ready', () => {
    console.log('[INFO] Client is ready!');
});

client.on('message_create', async (msg) => {
    // Ignore messages that are not commands or are from the bot itself
    if (!msg.body.startsWith(PREFIX) || msg.fromMe) return;

    const args = msg.body.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    // --- Context and Execution ---
    const senderId = msg.author || msg.from;
    const player = getPlayer(senderId);
    const chat = await msg.getChat();

    // Grant owner role
    if (senderId.startsWith(OWNER_NUMBER) && !player.roles.includes('owner')) {
        player.roles.push('owner');
        updatePlayer(player);
        msg.reply(`Welcome, owner! You have been granted owner role.`);
    }

    // Block banned users
    if (player.banned) return;

    // Anti-Link Feature
    if (chat.isGroup) {
        const groupSettings = getGroupSettings(chat.id._serialized);
        if (groupSettings.antilink) {
            const linkRegex = /(https?:\/\/[^\s]+)/g;
            if (linkRegex.test(msg.body)) {
                const participant = chat.participants.find(p => p.id._serialized === senderId);
                const isOwner = player.roles.includes('owner');
                if (participant && !participant.isAdmin && !participant.isSuperAdmin && !isOwner) {
                    await msg.reply('Links are not allowed in this group. Removing user...');
                    try {
                        await chat.removeParticipants([senderId]);
                    } catch (error) {
                        console.error('Error removing user for sending link:', error);
                        await msg.reply('I could not remove the user. Am I an admin?');
                    }
                    return; // Stop processing the message after removing the user
                }
            }
        }
    }

    const context = {
        client,
        msg,
        args,
        from: msg.from,
        sender: senderId,
        player,
        chat,
        // Helper functions
        reply: (text) => msg.reply(text),
        isGroupAdmin: async (chat, participantId) => {
            if (!chat.isGroup) return false;
            const participant = chat.participants.find(p => p.id._serialized === participantId);
            return participant ? participant.isAdmin || participant.isSuperAdmin : false;
        },
        // All data, constants, and state
        dragons, shop, cards, getGroupSettings, updateGroupSettings, createGuild, getGuild, getAllGuilds, updateGuild,
        dungeonTiers, generateDungeon, monsters, beasts,
        activeWildEncounters, activeBattles, activeTrades, activeCardSpawns, activeCardPacks, activeTournaments,
        activeDungeons, activeBeast, botSettings,
        // ... (all other constants)
    };

    try {
        await command.execute(context);
    } catch (error) {
        console.error(`[ERROR] Executing command '${commandName}':`, error);
        msg.reply('There was an error trying to execute that command.');
    }
});

client.initialize();
