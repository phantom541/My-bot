module.exports = {
  name: 'titles',
  description: 'View your earned titles.',
  async execute(context) {
    const { sock, from, msg, player } = context;

    let titlesMessage = `*📜 ${player.name}'s Titles*\n\n`;

    if (!player.titles || player.titles.length === 0) {
      titlesMessage += 'You have not earned any titles yet.';
    } else {
      player.titles.forEach(title => {
        const isActive = player.activeTitle === title;
        titlesMessage += `- ${title} ${isActive ? '[Active]' : ''}\n`;
      });
      titlesMessage += `\nTo set a title, use \`%set-title <Title Name>\`.`;
    }

    await sock.sendMessage(from, { text: titlesMessage }, { quoted: msg });
  },
};
