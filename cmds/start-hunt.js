const dragonClasses = require('../dragonClasses');

module.exports = {
  name: 'start-hunt',
  description: 'Begin your adventure by choosing a dragon class.',
  async execute(context) {
    const { sock, from, msg, player } = context;

    if (player.adventureStarted) {
      return sock.sendMessage(from, { text: 'You have already begun your adventure! Use `%party` to see your dragons.' }, { quoted: msg });
    }

    let message = `*Welcome, Dragon Hunter! A new journey awaits.*\n\n`;
    message += `The world of dragons is vast and diverse. Dragons are categorized into classes, each with unique traits and abilities. Choose a class to explore the starter dragons within it.\n\n`;

    for (const className in dragonClasses) {
      const dClass = dragonClasses[className];
      message += `*${dClass.name}*\n`;
      message += `${dClass.description}\n\n`;
    }

    message += `To view the dragons in a class, use the command \`%viewclass <ClassName>\`.\nFor example: \`%viewclass "Inferno Drakes"\``;

    // Send a collage of class images or a general welcome image
    // For now, let's send one cool image and the text.
    // In the future, could generate a collage.
    try {
      await sock.sendMessage(from, {
          image: { url: 'https://i.imgur.com/8a6a2e8.jpeg' }, // A general "welcome" image
          caption: message
      }, { quoted: msg });
    } catch (imgError) {
      console.error("Failed to send welcome image in start-hunt:", imgError);
      await sock.sendMessage(from, { text: message }, { quoted: msg }); // Fallback to text-only
    }
  },
};
