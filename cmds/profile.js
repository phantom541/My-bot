module.exports = {
  name: 'profile',
  description: 'View your or another user\'s profile.',
  async execute(context) {
    const { sender, msg, getPlayer, reply, getRank } = context;
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
  },
};
