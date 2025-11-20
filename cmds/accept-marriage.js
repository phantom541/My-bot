const { jidNormalizedUser } = require('baileys');
const { getPlayer, updatePlayer } = require('../playerData');
const proposals = require('../proposals');

module.exports = {
    name: 'accept-marriage',
    description: 'Accept a marriage proposal.',
    async execute(context) {
        const { sock, from, msg, player, sender } = context;

        if (player.partnerId) {
            return sock.sendMessage(from, { text: 'You are already married.' }, { quoted: msg });
        }

        const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedJid) {
            return sock.sendMessage(from, { text: 'You must mention the user whose proposal you want to accept.' }, { quoted: msg });
        }
        const proposerJid = jidNormalizedUser(mentionedJid);

        // Check if a valid proposal exists from the mentioned user to the command sender
        const proposalId = `${proposerJid}-${sender}`;
        const proposal = proposals.get().get(proposalId);

        if (!proposal) {
            return sock.sendMessage(from, { text: 'You do not have a pending marriage proposal from this user.' }, { quoted: msg });
        }

        const proposerPlayer = getPlayer(proposerJid);
        if (!proposerPlayer || proposerPlayer.partnerId) {
            proposals.delete(proposalId); // Clean up invalid proposal
            return sock.sendMessage(from, { text: 'This user is no longer available for marriage.' }, { quoted: msg });
        }

        // Finalize the marriage
        player.partnerId = proposerJid;
        proposerPlayer.partnerId = sender;

        // Add titles to both players
        player.titles.push('Married');
        proposerPlayer.titles.push('Married');

        updatePlayer(player);
        updatePlayer(proposerPlayer);

        proposals.delete(proposalId); // Remove the used proposal

        const successMessage = `💍 Congratulations! ${proposerPlayer.name} and ${player.name} are now married! 💍`;
        await sock.sendMessage(from, {
            text: successMessage,
            mentions: [proposerJid, sender]
        }, { quoted: msg });
    },
};
