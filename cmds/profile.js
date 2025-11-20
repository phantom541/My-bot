const { jidNormalizedUser } = require('baileys');

module.exports = {
    name: 'profile',
    description: 'View your or another user\'s profile.',
    aliases: ['p'],
    async execute(context) {
        const { sock, msg, sender, getPlayer, getProfilePicture, getRank, getGuild } = context;

        let targetJid;
        if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            targetJid = jidNormalizedUser(msg.message.extendedTextMessage.contextInfo.mentionedJid[0]);
        } else {
            targetJid = jidNormalizedUser(sender);
        }

        const player = getPlayer(targetJid);
        if (!player) {
            await sock.sendMessage(sender, { text: "This user doesn't have a profile yet." }, { quoted: msg });
            return;
        }

        try {
            const profilePicUrl = await getProfilePicture(targetJid);
            const userRank = getRank(player.level || 1);
            const guild = player.guildId ? getGuild(player.guildId) : null;
            const partner = player.partnerId ? getPlayer(player.partnerId) : null;

            let profileCaption = `*👤 Profile: ${player.name}*\n`;
            profileCaption += `*칭호 (Title):* ${player.activeTitle || 'No Title'}\n`;
            if (partner) {
                profileCaption += `*💍 Married To:* ${partner.name}\n`;
            }
            profileCaption += `*🎖️ Level:* ${player.level || 1}\n`;
            profileCaption += `*🏆 Rank:* ${userRank}\n`;
            profileCaption += `*✨ XP:* ${player.playerXp || 0} / ${ (player.level || 1) * 100}\n`;
            profileCaption += `*💰 Gold:* ${player.gold || 0}\n`;
            if (guild) {
                profileCaption += `*🏰 Guild:* ${guild.name} (${guild.tier} Tier)\n`;
            }

            await sock.sendMessage(sender, {
                image: { url: profilePicUrl },
                caption: profileCaption,
                mentions: [targetJid]
            }, { quoted: msg });

        } catch (error) {
            console.error("Error in profile command:", error);
            await sock.sendMessage(sender, { text: "An error occurred while fetching the profile." }, { quoted: msg });
        }
    },
};
