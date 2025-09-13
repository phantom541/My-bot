module.exports = {
  name: 'tournament',
  description: 'Manage tournaments.',
  async execute(context) {
    const { args, reply } = context;
    const subCommand = args[0];
    const restOfArgs = args.slice(1);

    switch (subCommand) {
      case 'create':
        const tournamentName = restOfArgs.join(' ');
        if (!tournamentName) {
          return reply('Please provide a name for the tournament.');
        }
        await reply(`Tournament "${tournamentName}" created!`);
        break;
      case 'join':
        await reply('You have joined the tournament!');
        break;
      case 'start':
        await reply('The tournament has been started!');
        break;
      case 'reportwin':
        await reply('Your win has been reported.');
        break;
      default:
        await reply('Invalid tournament command. Use: %tournament <create|join|start|reportwin>');
    }
  },
};
