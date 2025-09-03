module.exports = {
  name: 'trade',
  description: 'Trade dragons with other players.',
  async execute(context) {
    const { args, activeTrades, from, sender, reply, getPlayer, updatePlayer, msg } = context;

    if (args[0] === 'accept') {
        const trade = activeTrades[from];
        if (!trade || trade.player2.id !== sender) return reply('There is no trade for you to accept.');

        const player1 = getPlayer(trade.player1.id);
        const player2 = getPlayer(trade.player2.id);

        const dragon1 = player1.party[trade.player1.dragonIndex];
        const dragon2 = player2.party[trade.player2.dragonIndex];

        player1.party[trade.player1.dragonIndex] = dragon2;
        player2.party[trade.player2.dragonIndex] = dragon1;

        updatePlayer(player1);
        updatePlayer(player2);

        delete activeTrades[from];
        await reply('Trade accepted!');

    } else if (args[0] === 'decline') {
        const trade = activeTrades[from];
        if (!trade || trade.player2.id !== sender) return reply('There is no trade for you to decline.');

        delete activeTrades[from];
        await reply('Trade declined.');

    } else {
        const opponentId = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!opponentId) return reply('You need to mention a user to trade with.');

        const myDragonIndex = parseInt(args[0]) - 1;
        const theirDragonIndex = parseInt(args[1]) - 1;

        const player = getPlayer(sender);
        if (isNaN(myDragonIndex) || myDragonIndex < 0 || myDragonIndex >= player.party.length) {
            return reply('Invalid index for your dragon.');
        }

        const opponent = getPlayer(opponentId);
        if (isNaN(theirDragonIndex) || theirDragonIndex < 0 || theirDragonIndex >= opponent.party.length) {
            return reply('Invalid index for their dragon.');
        }

        activeTrades[from] = {
            player1: { id: sender, dragonIndex: myDragonIndex },
            player2: { id: opponentId, dragonIndex: theirDragonIndex }
        };

        await reply(`${opponent.name}, ${player.name} wants to trade their ${player.party[myDragonIndex].name} for your ${opponent.party[theirDragonIndex].name}. Use \`%trade accept\` or \`%trade decline\`.`);
    }
  },
};
