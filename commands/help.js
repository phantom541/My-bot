module.exports = {
    name: 'help',
    aliases: ['menu'],
    description: 'Displays the list of all available commands.',
    async execute({ sock, from, msg, commands, config }) {
        let helpText = `*🐉⛓️ 𝙳𝚁Δ𝙶Ø₦ ₣𝙰𝙻𝙻 ⱣⱧΔ₥ŦØ₥ 𝙲𝙾𝙽𝚂𝙾𝙻𝙴 ⛓️🐉*\n`;
        helpText += `\`\`\`\n`;
        helpText += `╔═══◇══════◇═══╗\n`;
        helpText += `   🅓🅡🅐🅖🅞🅝   𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙲𝙾𝙽𝚃𝚁𝙾𝙻\n`;
        helpText += `╚═══◇══════◇═══╝\n`;
        helpText += `\n`;
        helpText += `👁‍🗨 ⧫ Welcome, Dragonbound Phantom.\n`;
        helpText += `⚙️ SYSTEM STATUS: 🔥 Active\n`;
        helpText += `🕶 Motto: “𝘛𝘩𝘦 𝘧𝘪𝘳𝘦 𝘪𝘴 𝘯𝘰𝘵 𝘵𝘰 𝘣𝘦 𝘧𝘦𝘢𝘳𝘦𝘥—𝘪𝘵 𝘪𝘴 𝘵𝘰 𝘣𝘦 𝘸𝘦𝘪𝘭𝘥𝙴𝚍.”\n`;
        helpText += `═══▰▰▰▰▰▰▰▰═══\n`;
        helpText += `\`\`\`\n\n`;

        // Organize commands by categories if they had them, but for now just list all
        const sortedCommands = Array.from(new Set(commands.values())).sort((a, b) => a.name.localeCompare(b.name));

        helpText += `*Available Protocols:*\n`;
        for (const cmd of sortedCommands) {
            helpText += `> \`${config.prefix}${cmd.name}\` - ${cmd.description || 'No description'}\n`;
        }

        helpText += `\n**Owner:** 𓂀 𝕰𝖎𝖉𝖔𝖑𝖔𝖓 𝕻𝖚𝖈𝖐 𓂀\n`;
        helpText += `**Console Motto:** *“𝘛𝘩𝘦 𝘥𝘳𝘢𝘨𝘰𝘯 𝘪𝘴 𝘯𝘰𝘵 𝘵𝘰 𝘣𝘦 𝘵𝘳𝘢𝘪𝘯𝘦𝘥—𝘪𝘵 𝘪𝘴 𝘵𝘰 𝘣𝘦 𝘧𝘦𝘢𝘳𝘦𝘥.”*`;

        await sock.sendMessage(from, { text: helpText }, { quoted: msg });
    }
};
