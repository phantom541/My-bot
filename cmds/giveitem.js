const { jidNormalizedUser } = require('baileys');
const allItems = require('../items');
const { getPlayer } = require('../playerData');

module.exports = {
    name: 'giveitem',
    description: 'Gives an item to a player (Creator only).',
    async execute(context) {
        const { sock, msg, args, from, sender, isOwner, updatePlayer } = context;

        // Command usage: %giveitem <@user> <item_id> [amount]
        if (!isOwner) { // Simple check, for a real bot you'd want more robust role checks
            return;
        }

        const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedJid) {
            return sock.sendMessage(from, { text: 'You must mention a user.' }, { quoted: msg });
        }
        const targetJid = jidNormalizedUser(mentionedJid);

        const itemId = args[1];
        if (!itemId || !allItems[itemId]) {
            return sock.sendMessage(from, { text: `Invalid item ID. Valid IDs are: ${Object.keys(allItems).join(', ')}` }, { quoted: msg });
        }

        let amount = parseInt(args[2]);
        if (isNaN(amount) || amount <= 0) {
            amount = 1; // Default to 1 if amount is invalid or not provided
        }

        const targetPlayer = getPlayer(targetJid);
        if (!targetPlayer) {
            return sock.sendMessage(from, { text: 'That player does not have a profile yet.' }, { quoted: msg });
        }

        // Add item to inventory
        targetPlayer.inventory[itemId] = (targetPlayer.inventory[itemId] || 0) + amount;
        updatePlayer(targetPlayer);

        const item = allItems[itemId];
        await sock.sendMessage(from, { text: `Successfully gave ${amount}x ${item.name} to ${targetPlayer.name}.` }, { quoted: msg });
    },
};
