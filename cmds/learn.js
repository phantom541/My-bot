const allItems = require('../items');

// In-memory store for move replacement sessions. Key: player JID
const moveReplacementSessions = new Map();

module.exports = {
  name: 'learn',
  description: 'Teach a dragon a new move. Use `%learn replace <number>` to finish.',
  async execute(context) {
    const { sock, from, msg, player, args, savePlayer, sender } = context;

    // --- Part 2: Handling the replacement confirmation ---
    if (args[0]?.toLowerCase() === 'replace') {
      const session = moveReplacementSessions.get(sender);
      if (!session) {
        return sock.sendMessage(from, { text: 'You do not have an active move replacement session. Start one with `%learn <party_id> <scroll_id>`.' }, { quoted: msg });
      }

      const moveIndexToReplace = parseInt(args[1]) - 1;
      if (isNaN(moveIndexToReplace) || moveIndexToReplace < 0 || moveIndexToReplace > 3) {
        return sock.sendMessage(from, { text: 'Invalid move number. Please choose a number from 1 to 4.' }, { quoted: msg });
      }

      const dragon = player.party[session.partyIndex];
      const oldMoveName = dragon.moves[moveIndexToReplace].name;

      // Consume the scroll
      player.inventory[session.scrollId] -= 1;
      if (player.inventory[session.scrollId] <= 0) {
        delete player.inventory[session.scrollId];
      }

      // Replace the move
      dragon.moves[moveIndexToReplace] = session.newMove;

      savePlayer();
      moveReplacementSessions.delete(sender); // Clean up session

      await sock.sendMessage(from, { text: `Success! Your ${dragon.name} forgot ${oldMoveName} and learned *${session.newMove.name}*!` }, { quoted: msg });
      return;
    }

    // --- Part 1: Starting the learning process ---
    if (args.length < 2) {
      return sock.sendMessage(from, { text: 'You must specify the party ID of the dragon and the Move Scroll you want to use. Example: `%learn 1 move_scroll_fireball`' }, { quoted: msg });
    }

    const partyIndex = parseInt(args[0]) - 1;
    if (isNaN(partyIndex) || !player.party[partyIndex]) {
      return sock.sendMessage(from, { text: 'Invalid party ID.' }, { quoted: msg });
    }

    const scrollId = args[1];
    const scroll = allItems[scrollId];

    if (!scroll || scroll.type !== 'scroll') {
      return sock.sendMessage(from, { text: 'That is not a valid Move Scroll.' }, { quoted: msg });
    }

    if (!player.inventory[scrollId] || player.inventory[scrollId] < 1) {
      return sock.sendMessage(from, { text: `You do not have a ${scroll.name}.` }, { quoted: msg });
    }

    const dragon = player.party[partyIndex];

    // If the dragon has less than 4 moves, add it directly
    if (dragon.moves.length < 4) {
      player.inventory[scrollId] -= 1;
      if (player.inventory[scrollId] <= 0) {
        delete player.inventory[scrollId];
      }
      dragon.moves.push(scroll.move);
      savePlayer();
      await sock.sendMessage(from, { text: `Success! Your ${dragon.name} learned the move *${scroll.move.name}*.` }, { quoted: msg });
      return;
    }

    // If the dragon has 4 moves, start a replacement session
    moveReplacementSessions.set(sender, {
      partyIndex,
      scrollId,
      newMove: scroll.move,
      timestamp: Date.now()
    });
    setTimeout(() => moveReplacementSessions.delete(sender), 5 * 60 * 1000); // 5-minute expiry

    let replacementMessage = `${dragon.name} already knows 4 moves. Which move should it forget?\n\n`;
    dragon.moves.forEach((move, index) => {
        replacementMessage += `${index + 1}: ${move.name}\n`;
    });
    replacementMessage += `\nReply with \`%learn replace <number>\` to replace a move. This request will expire in 5 minutes.`;

    await sock.sendMessage(from, { text: replacementMessage }, { quoted: msg });
  },
};
