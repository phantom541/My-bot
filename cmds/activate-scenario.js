module.exports = {
  name: 'activate-scenario',
  description: 'Spawn a Colossal Beast (Admin only).',
  async execute(context) {
    const { args, reply, hasRole } = context;

    if (!hasRole('mod')) { // Or owner, depending on desired permissions
        return reply("You do not have permission to use this command.");
    }

    const scenarioName = args.join(' ');
    if (!scenarioName) {
      return reply('Please specify a scenario to activate.');
    }

    await reply(`Scenario "${scenarioName}" has been activated.`);
  },
};
