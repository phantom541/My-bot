// cmds/profile.js
const { getPlayer } = require('../playerData');

module.exports = {
  name: 'profile',
  description: "Displays a user's profile.",
  aliases: ['p'],
  async execute(context) {
    const { sock, msg, sender, getProfilePicture } = context;
    const player = getPlayer(sender);

    // Fallback for profile picture
    const profilePicUrl = await getProfilePicture(sender) || player.avatar;

    // Format the profile message to match the .p command style
    let profileMessage = `*--- ${player.name}'s Profile ---*\n\n`;
    profileMessage += `*Age:* ${player.age || 'Not set'}\n`;
    profileMessage += `*Bio:* ${player.bio}\n\n`;
    profileMessage += `*Level:* ${player.level} | *Rank:* ${player.rank || '#N/A'}\n`;
    profileMessage += `*XP:* ${player.xp} / ${player.level * 100}\n\n`;
    profileMessage += `*Wallet:* $${player.wallet.toLocaleString()}\n`;
    profileMessage += `*Bank:* $${player.bank.toLocaleString()} / $${player.bankMax.toLocaleString()}\n\n`;
    profileMessage += `*Guild:* ${player.guildId || 'None'}\n`;

    // Customization link (placeholder for now)
    profileMessage += `*Customize:* [Link to Website]\n\n`;

    if (player.banned) {
      profileMessage += `*Status:* BANNED`;
    }

    // Send the profile message with the user's avatar
    await sock.sendMessage(msg.chat, {
      image: { url: profilePicUrl },
      caption: profileMessage
    }, { quoted: msg });
  },
};
