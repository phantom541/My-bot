module.exports = {
  name: 'set-title',
  description: 'Set an active title to display on your profile.',
  async execute(context) {
    const { sock, from, msg, player, args, savePlayer } = context;

    const titleQuery = args.join(' ');
    if (!titleQuery) {
      return sock.sendMessage(from, { text: 'You must specify a title to set. Use `%titles` to see your available titles.' }, { quoted: msg });
    }

    // Find the title in the player's list (case-insensitive)
    const foundTitle = player.titles.find(t => t.toLowerCase() === titleQuery.toLowerCase());

    if (!foundTitle) {
      return sock.sendMessage(from, { text: `You have not earned the title "${titleQuery}".` }, { quoted: msg });
    }

    player.activeTitle = foundTitle;
    savePlayer();

    await sock.sendMessage(from, { text: `Your active title has been set to: *${foundTitle}*` }, { quoted: msg });
  },
};
