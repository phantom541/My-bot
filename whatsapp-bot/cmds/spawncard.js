const { spawnCard } = require('../card-spawner');

module.exports = {
  name: 'spawncard',
  description: 'Spawns a random card with advanced features.',
  async execute(context) {
    const { reply, hasRole, activeCardSpawns, from } = context;

    // Ensure the command can only be used by moderators or owners
    if (!hasRole('mod')) {
        return reply('You do not have permission to use this command.');
    }

    // Check if there's already a card waiting to be claimed in the chat
    if (activeCardSpawns[from]) {
        return reply('There is already an active card spawn in this chat. Use `%claim` to get it!');
    }

    try {
        // Call the new, centralized spawnCard function
        await spawnCard(context);
    } catch (error) {
        console.error('Error executing spawncard command:', error);
        reply('There was an error trying to spawn a card.');
    }
  },
};