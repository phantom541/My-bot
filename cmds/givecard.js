module.exports = {
  name: 'givecard',
  description: 'Give a card to another player.',
  async execute(context) {
    const { args, msg, reply, player, getPlayer, updatePlayer } = context;
    const source = args[0]?.toLowerCase();
    const cardIndex = parseInt(args[1]) - 1;
    const recipientId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

    if (!source || (source !== 'deck' && source !== 'holder')) {
        return reply('Please specify the source: deck or holder.');
    }
    if (isNaN(cardIndex)) {
        return reply('Invalid card index.');
    }
    if (!recipientId) {
        return reply('You need to mention a user to give a card to.');
    }

    const recipient = getPlayer(recipientId);
    if (!recipient) return reply('Recipient not found.');

    let cardToGive;
    if (source === 'deck') {
        if (cardIndex < 0 || cardIndex >= player.deck.length) {
            return reply('Invalid deck index.');
        }
        [cardToGive] = player.deck.splice(cardIndex, 1);
    } else { // holder
        if (cardIndex < 0 || cardIndex >= player.holder.length) {
            return reply('Invalid holder index.');
        }
        [cardToGive] = player.holder.splice(cardIndex, 1);
    }

    if (recipient.deck.length < 12) {
        recipient.deck.push(cardToGive);
    } else {
        recipient.holder.push(cardToGive);
    }

    updatePlayer(player);
    updatePlayer(recipient);

    await reply(`You have given your ${cardToGive.name} card to ${recipient.name}.`);
  },
};
