module.exports = {
  name: 'leave',
  description: 'Leave the current group.',
  async execute(context) {
    const { sock, from, reply, hasRole } = context;

    if (!hasRole('owner')) {
      return reply('You do not have permission to use this command.');
    }

    if (!from.endsWith('@g.us')) {
      return reply('This command can only be used in a group.');
    }
    await reply('Leaving the group. Goodbye!');
    await sock.groupLeave(from);
  },
};
