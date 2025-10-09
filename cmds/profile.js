module.exports = {
  name: 'profile',
  description: "View your or another user's profile with full details and a profile picture.",
  async execute(context) {
    const { sock, msg, from, sender, reply, getPlayer, getGuild, getRank } = context;

    // Determine the target user: the sender or the first person mentioned in the message
    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const targetJid = mentionedJid || sender;

    const player = getPlayer(targetJid);

    // Fetch the user's profile picture URL from WhatsApp
    let pfpUrl;
    try {
      pfpUrl = await sock.profilePictureUrl(targetJid, 'image');
    } catch (e) {
      console.log(`Failed to fetch profile picture for ${targetJid}. Using a default image.`);
      // Use a generic placeholder image if the user has no picture or it's private
      pfpUrl = 'https://i.imgur.com/7D7I6dI.png';
    }

    // Safely access player properties with default values
    const playerLevel = player.level || 1;
    const playerRank = getRank(playerLevel);
    const guild = player.guildId ? getGuild(player.guildId) : null;
    const guildName = guild ? guild.name : 'None';
    const partyCount = player.party ? player.party.length : 0;
    const denCount = player.den ? player.den.length : 0;

    // Construct the profile message
    let profileText = `*${player.name}'s Profile*\n\n`;
    profileText += `👤 *User ID:* ${targetJid.split('@')[0]}\n`;
    profileText += `🏆 *Rank:* ${playerRank}\n`;
    profileText += `🌟 *Level:* ${playerLevel}\n`;
    profileText += `💰 *Gold:* ${player.gold || 0}\n`;
    profileText += `🏦 *Bank:* ${player.bank || 0}\n`;
    profileText += `🏰 *Guild:* ${guildName}\n\n`;
    profileText += `🐉 *Dragons in Party:* ${partyCount}\n`;
    profileText += `📦 *Dragons in Den:* ${denCount}\n`;

    try {
      // Send the profile picture with the detailed caption and a rich preview
      await sock.sendMessage(from, {
        image: { url: pfpUrl },
        caption: profileText,
        contextInfo: {
          externalAdReply: {
            title: `${player.name}'s Profile`,
            body: `Level ${playerLevel} - ${playerRank}`,
            thumbnail: { url: pfpUrl },
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      }, { quoted: msg });
    } catch (err) {
      console.error("Error sending profile message with media:", err);
      // Fallback to a text-only message if sending the image fails
      reply(profileText);
    }
  },
};