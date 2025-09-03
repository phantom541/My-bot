module.exports = {
  name: 'guilds',
  description: 'Lists all guilds.',
  async execute(context) {
    const { reply, getAllGuilds } = context;
    const allGuilds = Object.values(getAllGuilds());
    if (allGuilds.length === 0) {
        return reply('There are no guilds yet. Create one with `%guild create <name>`!');
    }

    let response = '*List of Guilds:*\n\n';
    allGuilds.forEach(g => {
        response += `- *${g.name}* (Members: ${g.members.length})\n`;
    });

    await reply(response);
  },
};
