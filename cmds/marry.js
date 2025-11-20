const { jidNormalizedUser } = require('baileys');
const { getPlayer } = require('../playerData');
const proposals = require('../proposals');

module.exports = {
    name: 'marry',
    description: 'Propose to another user.',
    async execute(context) {
        const { sock, from, msg, player, sender } = context;

        if (player.partnerId) {
            const partner = getPlayer(player.partnerId);
            return sock.sendMessage(from, { text: `You are already married to ${partner.name}!` }, { quoted: msg });
        }

        const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedJid) {
            return sock.sendMessage(from, { text: 'You must mention a user to propose to.' }, { quoted: msg });
        }
        const targetJid = jidNormalizedUser(mentionedJid);

        if (sender === targetJid) {
            return sock.sendMessage(from, { text: 'You cannot marry yourself.' }, { quoted: msg });
        }

        const targetPlayer = getPlayer(targetJid);
        if (!targetPlayer) {
            return sock.sendMessage(from, { text: 'That person has not started their adventure yet.' }, { quoted: msg });
        }
        if (targetPlayer.partnerId) {
            return sock.sendMessage(from, { text: `${targetPlayer.name} is already married.` }, { quoted: msg });
        }

        // Create a proposal
        const proposalId = `${sender}-${targetJid}`;
        proposals.set(proposalId, { from: sender, to: targetJid, timestamp: Date.now() });

        const proposalMessage = `A new marriage proposal!\n\n${player.name} has proposed to ${targetPlayer.name}!\n\n${targetPlayer.name}, you have 5 minutes to accept by replying with \`%accept-marriage @${sender.split('@')[0]}\`.`;

        await sock.sendMessage(from, {
            text: proposalMessage,
            mentions: [sender, targetJid]
        }, { quoted: msg });
    },
};
