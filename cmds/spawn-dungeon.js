module.exports = {
  name: 'spawn-dungeon',
  description: 'Spawn a dungeon (Admin only).',
  async execute(context) {
    const { args, reply, hasRole } = context;
    if (!hasRole('mod')) {
      return reply('You do not have permission to use this command.');
    }
    const dungeonName = args.join(' ');
    if (!dungeonName) {
      return reply('Please specify a dungeon to spawn.');
    }
    await reply(`Dungeon "${dungeonName}" has been spawned.`);
  },
};
