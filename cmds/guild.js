module.exports = {
  name: 'guild',
  description: 'Manage guilds.',
  async execute(context) {
    const { args, reply } = context;
    const subCommand = args[0];
    const restOfArgs = args.slice(1);

    switch (subCommand) {
      case 'create':
        await reply(`Guild "${restOfArgs.join(' ')}" created!`);
        break;
      case 'join':
        await reply(`Requested to join guild "${restOfArgs.join(' ')}".`);
        break;
      case 'info':
        await reply(`Info for guild "${restOfArgs.join(' ')}".`);
        break;
      case 'accept':
        await reply('User accepted into the guild.');
        break;
      case 'manage':
        await reply('Guild members managed.');
        break;
      case 'slogan':
        await reply(`Guild slogan changed to "${restOfArgs.join(' ')}".`);
        break;
      case 'deposit':
        await reply('Gold deposited into guild treasury.');
        break;
      case 'withdraw':
        await reply('Gold withdrawn from guild treasury.');
        break;
      default:
        await reply('Invalid guild command. Use: %guild <create|join|info|accept|manage|slogan|deposit|withdraw>');
    }
  },
};
