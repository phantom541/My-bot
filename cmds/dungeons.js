module.exports = {
  name: 'dungeons',
  description: 'View available dungeons.',
  async execute(context) {
    const { reply, dungeonTiers } = context;
    let response = '*Available Dungeon Difficulties:*\n\n';
    for (const key in dungeonTiers) {
        const tier = dungeonTiers[key];
        response += `*${key}* - "${tier.name}"\n`;
    }
    response += "\nUse `%spawn-dungeon <Difficulty>` to start a dungeon (Admins only).";
    await reply(response);
  },
};
