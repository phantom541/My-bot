const fs = require('fs');
const path = require('path');
const config = require('../config');
const { getAuthContext, isGroupAdmin } = require('./auth');
const { ensureUserExists } = require('../utils/rpg_user_manager');
const gameData = require('../services/gameData');
const { getPlayer, updatePlayer, getAllPlayers } = require('../playerData');

const commands = new Map();
const cooldowns = new Map();

/**
 * Recursively loads commands from a directory.
 */
function loadCommands(dir = path.join(__dirname, '../commands')) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.lstatSync(fullPath);

        if (stat.isDirectory()) {
            loadCommands(fullPath);
        } else if (file.endsWith('.js')) {
            try {
                const cmd = require(fullPath);
                if (cmd.name) {
                    commands.set(cmd.name, cmd);
                    if (cmd.aliases && Array.isArray(cmd.aliases)) {
                        cmd.aliases.forEach(alias => commands.set(alias, cmd));
                    }
                    console.log(`[CMD] Loaded: ${cmd.name}`);
                }
            } catch (err) {
                console.error(`[CMD] Failed to load ${file}:`, err);
            }
        }
    }
}

/**
 * Dispatches a message to the appropriate command.
 */
async function handleMessage(sock, m) {
    if (!m.messages || m.messages.length === 0) return;
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const body = msg.message.conversation ||
                 msg.message.extendedTextMessage?.text ||
                 msg.message.imageMessage?.caption || '';

    if (!body.startsWith(config.prefix)) return;

    const args = body.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = commands.get(commandName);

    if (!command) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || from;
    const auth = getAuthContext(sock, msg);
    const player = ensureUserExists(auth.senderJid, msg.pushName);

    // Permission check
    if (command.ownerOnly && !auth.isOwner) {
        return sock.sendMessage(from, { text: '❌ This command is for the owner only.' }, { quoted: msg });
    }

    if (command.adminOnly && !auth.isAdmin && !auth.isOwner) {
        // Group admin check
        const isGroupAdm = from.endsWith('@g.us') ? await isGroupAdmin(sock, from, auth.senderJid) : false;
        if (!isGroupAdm) {
            return sock.sendMessage(from, { text: '❌ This command is for admins only.' }, { quoted: msg });
        }
    }

    // Cooldown check (Owner bypass)
    if (!auth.isOwner && command.cooldown) {
        const cooldownKey = `${auth.senderJid}-${command.name}`;
        if (cooldowns.has(cooldownKey)) {
            const expirationTime = cooldowns.get(cooldownKey);
            const now = Date.now();
            if (now < expirationTime) {
                const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                return sock.sendMessage(from, { text: `⏳ Please wait ${timeLeft}s before using this command again.` }, { quoted: msg });
            }
        }
        cooldowns.set(cooldownKey, Date.now() + (command.cooldown * 1000));
    }

    // Command Execution
    try {
        const reply = async (text) => {
            return sock.sendMessage(from, { text }, { quoted: msg });
        };
        const rolesHierarchy = ['user', 'mod', 'owner'];
        const hasRole = (role) => {
            if (auth.isOwner) return true;
            const userRoles = player.roles || [];
            const roleIndex = rolesHierarchy.indexOf(role);
            return userRoles.some(userRole => rolesHierarchy.indexOf(userRole) >= roleIndex);
        };

        const context = {
            sock, msg, args, from, sender, auth, player, config, commands, reply,
            getPlayer, updatePlayer, getAllPlayers,
            hasRole,
            ...gameData
        };
        await command.execute(context);
        // Auto-save after command execution
        require('../database/index').saveDb();
    } catch (err) {
        console.error(`[CMD] Error executing ${commandName}:`, err);
        await sock.sendMessage(from, { text: `⚠️ An error occurred: ${err.message}` }, { quoted: msg });
    }
}

module.exports = {
    loadCommands,
    handleMessage,
    commands
};
