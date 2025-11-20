const dragonClasses = require('../dragonClasses');
const starterDragonMap = require('../starterDragonMap');
const allDragons = require('../dragonData');

module.exports = {
  name: 'viewclass',
  description: 'View the starter dragons available in a specific class.',
  async execute(context) {
    const { sock, from, msg, args } = context;

    const classNameQuery = args.join(' ');
    if (!classNameQuery) {
      return sock.sendMessage(from, { text: 'Please specify a class name. Example: `%viewclass "Inferno Drakes"`' }, { quoted: msg });
    }

    // Find the class by name (case-insensitive)
    const foundClassName = Object.keys(dragonClasses).find(name => name.toLowerCase() === classNameQuery.toLowerCase());
    if (!foundClassName) {
      return sock.sendMessage(from, { text: `Could not find the class "${classNameQuery}". Please use one of the official class names from \`%start-hunt\`.` }, { quoted: msg });
    }

    const dClass = dragonClasses[foundClassName];
    const starterIds = starterDragonMap[foundClassName];

    if (!starterIds || starterIds.length === 0) {
      return sock.sendMessage(from, { text: 'There are currently no starter dragons available for this class.' }, { quoted: msg });
    }

    const starterDragons = starterIds.map(id => allDragons.find(d => d.id === id)).filter(Boolean); // Filter out any nulls

    let message = `*Dragons of the ${dClass.name} Class*\n\n`;
    message += `${dClass.description}\n\n`;
    message += `Here are the starter dragons available for you to choose:\n\n`;

    starterDragons.forEach(dragon => {
      message += `*${dragon.id}: ${dragon.name}*\n`;
      message += `*Type:* ${dragon.type}\n`;
      // You can add more brief details here if you like
      message += `\n`;
    });

    message += `To choose your companion, use the command \`%choose <id>\`.\nFor example: \`%choose ${starterDragons[0].id}\``;

    // Send the class image along with the list of dragons
    try {
      await sock.sendMessage(from, {
          image: { url: dClass.imageUrl },
          caption: message
      }, { quoted: msg });
    } catch (imgError) {
      console.error(`Failed to send class image in viewclass for "${dClass.name}":`, imgError);
      await sock.sendMessage(from, { text: message }, { quoted: msg }); // Fallback to text-only
    }
  },
};
