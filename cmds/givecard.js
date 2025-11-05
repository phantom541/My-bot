module.exports = {
  name: 'givecard',
  description: 'Give a card to another player.',
  async execute(context) {
    const { args, msg, player, savePlayer, reply, getPlayer, updatePlayer } = context;

    const location = args[0]?.toLowerCase();
    const cardIndex = parseInt(args[1]) - 1;
    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

    if (!location || (location !== 'deck' && location !== 'holder' && location !== 'unsorted') || isNaN(cardIndex) || !mentionedJid) {
      return reply('Invalid usage. Use: `%givecard <deck|holder|unsorted> <card_number> @user`');
    }

    if (location === 'unsorted'){
        location = 'pc';
    }

    if (mentionedJid === player.id) {
        return reply("You can't give a card to yourself.");
    }

    const sourceCollection = player[location];

    if (!sourceCollection || cardIndex < 0 || cardIndex >= sourceCollection.length) {
      return reply(`Invalid card number. Check your ${location} with the %cards command.`);
    }

    const cardToGive = sourceCollection[cardIndex];

    // Remove the card from the sender
    sourceCollection.splice(cardIndex, 1);
    savePlayer();

    // Add the card to the recipient's collection
    const recipient = getPlayer(mentionedJid);
    if (!recipient.pc) {
      recipient.pc = [];
    }
    recipient.pc.push(cardToGive);
    updatePlayer(recipient);

    const recipientName = recipient.name || mentionedJid.split('@')[0];
    await reply(`You have given the "${cardToGive.name}" card to ${recipientName}.`);
  },
};
