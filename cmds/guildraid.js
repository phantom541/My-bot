const { jidNormalizedUser } = require('baileys');
const { getPlayer, updatePlayer } = require('../playerData');

const RAID_COOLDOWN = 60 * 60 * 1000; // 1 hour

module.exports = {
  name: 'guildraid',
  description: 'Raid a member of another guild for a chance to steal gold.',
  async execute(context) {
    const { sock, from, msg, player, sender } = context;

    if (!player.guildId) {
      return sock.sendMessage(from, { text: 'You must be in a guild to raid.' }, { quoted: msg });
    }

    const now = Date.now();
    if (player.cooldowns.raid && now < player.cooldowns.raid) {
      const remaining = new Date(player.cooldowns.raid - now).toISOString().substr(11, 8);
      return sock.sendMessage(from, { text: `You are too tired to raid. You can raid again in ${remaining}.` }, { quoted: msg });
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mentionedJid) {
      return sock.sendMessage(from, { text: 'You must mention a player to raid.' }, { quoted: msg });
    }
    const targetJid = jidNormalizedUser(mentionedJid);
    const targetPlayer = getPlayer(targetJid);

    if (!targetPlayer || !targetPlayer.guildId) {
      return sock.sendMessage(from, { text: 'You can only raid players who are in a guild.' }, { quoted: msg });
    }

    if (player.guildId === targetPlayer.guildId) {
      return sock.sendMessage(from, { text: 'You cannot raid a member of your own guild.' }, { quoted: msg });
    }

    player.cooldowns.raid = now + RAID_COOLDOWN;

    const successChance = 0.6; // 60% chance of success
    if (Math.random() < successChance) {
      const maxSteal = Math.floor(targetPlayer.gold * 0.1); // Steal up to 10%
      const amountStolen = Math.floor(Math.random() * maxSteal);

      player.gold += amountStolen;
      targetPlayer.gold -= amountStolen;

      updatePlayer(player);
      updatePlayer(targetPlayer);

      await sock.sendMessage(from, { text: `Success! You raided ${targetPlayer.name} and stole ${amountStolen} gold!` }, { quoted: msg });
    } else {
      updatePlayer(player); // To save the cooldown
      await sock.sendMessage(from, { text: `You failed to raid ${targetPlayer.name} and got away with nothing.` }, { quoted: msg });
    }
  },
};
