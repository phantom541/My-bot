const util = require('util');

module.exports = {
  name: 'eval',
  description: 'Executes JavaScript code (Owner only).',
  async execute(context) {
    // Making all context variables available to eval
    const { args, reply, hasRole, sock, msg, from, sender, player, savePlayer, commandName, ...restOfContext } = context;

    if (!hasRole('owner')) {
      return reply('❌ You are not authorized to use this command.');
    }

    const code = args.join(' ');
    if (!code) {
      return reply('Please provide code to execute.');
    }

    try {
      // The eval'd code will have access to all the variables destructured above
      let result = await eval(code);

      if (typeof result !== 'string') {
        // Using depth 0 to keep the output clean for large objects
        result = util.inspect(result, { depth: 0 });
      }

      // Slice the result to avoid hitting message length limits
      const output = result.slice(0, 4000); // Increased limit slightly for more detailed output

      await reply(`✅ Result:\n\`\`\`\n${output}\`\`\``);
    } catch (err) {
      await reply(`❌ Error:\n\`\`\`\n${err.message}\`\`\``);
    }
  },
};
