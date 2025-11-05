module.exports = {
  name: 'givedragon',
  description: 'Give a dragon to another player.',
  async execute(context) {
    const { args, msg, reply, player, getPlayer, updatePlayer } = context;
    const recipientId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!recipientId) return reply('You need to mention a user to give a dragon to.');

    const dragonIndex = parseInt(args[0]) - 1;
    if (isNaN(dragonIndex) || dragonIndex < 0 || dragonIndex >= player.party.length) {
        return reply('Invalid dragon index.');
    }

    const recipient = getPlayer(recipientId);
    if (!recipient) return reply('Recipient not found.');

    const [dragonToGive] = player.party.splice(dragonIndex, 1);
    recipient.den.push(dragonToGive);

    updatePlayer(player);
    updatePlayer(recipient);

    await reply(`You have given your ${dragonToGive.name} to ${recipient.name}.`);
  },
};
