module.exports = {
  name: 'clearsession',
  description: 'Logs the bot out.',
  async execute(context) {
    const { hasRole, reply, sock } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    await reply('Logging out...');
    await sock.logout();
  },
};
