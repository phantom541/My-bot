module.exports = {
  name: 'environments',
  description: 'View the list of battle environments.',
  async execute(context) {
    const { hasRole, reply, BATTLE_ENVIRONMENTS } = context;
    if (!hasRole('mod')) return reply('You do not have permission to use this command.');

    let response = '*Available Battle Environments:*\n\n';
    BATTLE_ENVIRONMENTS.forEach(env => {
        response += `- *${env.name}* (Boosts: ${env.boostedType})\n`;
    });

    await reply(response);
  },
};
