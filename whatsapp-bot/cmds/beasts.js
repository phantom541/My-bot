module.exports = {
    name: 'beasts',
    description: 'List the Colossal Beasts.',
    async execute(context) {
        const { sock, from, msg, beasts } = context;

        let beastList = '*🌳 Colossal Beasts 🌳*\n\n';
        beastList += 'These are the mighty beasts that roam the world. Challenge them to earn great rewards!\n\n';

        beasts.forEach(beast => {
            beastList += `*${beast.name}* (Level ${beast.level}) - HP: ${beast.hp}\n`;
        });

        beastList += '\nUse `%challenge-beast <name>` to fight one.';

        try {
            await sock.sendMessage(from, {
                image: { url: 'https://i.imgur.com/8016GvT.jpeg' },
                caption: beastList
            }, { quoted: msg });
        } catch (error) {
            console.error("Error sending beasts list:", error);
            await sock.sendMessage(from, { text: beastList }, { quoted: msg });
        }
    },
};
