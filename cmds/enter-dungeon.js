module.exports = {
  name: 'enter-dungeon',
  description: 'Enter the active dungeon.',
  async execute(context) {
    const { activeDungeons, from, reply, player } = context;
    const dungeon = activeDungeons[from];
    if (!dungeon) return reply('There is no active dungeon to enter.');
    if (dungeon.status === 'running') return reply('This dungeon crawl has already begun.');
    if (!player.guildId) return reply('Only guild members can enter dungeons.');
    if (dungeon.party.some(p => p.id === player.id)) return reply('You are already in the dungeon party.');

    dungeon.party.push(player);
    await reply(`${player.name} has joined the dungeon party! Current party size: ${dungeon.party.length}.`);
  },
};
