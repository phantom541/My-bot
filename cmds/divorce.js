const { getPlayer, updatePlayer } = require('../playerData');

module.exports = {
    name: 'divorce',
    description: 'End your current marriage.',
    async execute(context) {
        const { sock, from, msg, player, sender } = context;

        if (!player.partnerId) {
            return sock.sendMessage(from, { text: 'You are not married.' }, { quoted: msg });
        }

        const partner = getPlayer(player.partnerId);

        const divorceMessage = `${player.name} has divorced ${partner.name}. The bond is broken.`;

        // Remove the "Married" title from both players
        player.titles = player.titles.filter(t => t !== 'Married');
        if (partner) {
            partner.titles = partner.titles.filter(t => t !== 'Married');
            // Unset active title if it was "Married"
            if (partner.activeTitle === 'Married') {
                partner.activeTitle = null;
            }
            partner.partnerId = null;
            updatePlayer(partner);
        }

        if (player.activeTitle === 'Married') {
            player.activeTitle = null;
        }
        player.partnerId = null;
        updatePlayer(player);

        await sock.sendMessage(from, {
            text: divorceMessage,
            mentions: [sender, partner.id]
        }, { quoted: msg });
    },
};
