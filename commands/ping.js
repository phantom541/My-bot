module.exports = {
    name: 'ping',
    description: 'Check bot latency.',
    cooldown: 5,
    async execute({ sock, from, msg }) {
        const start = Date.now();
        await sock.sendMessage(from, { text: 'Pinging...' }, { quoted: msg });
        const end = Date.now();
        await sock.sendMessage(from, { text: `Pong! Latency: ${end - start}ms` }, { quoted: msg });
    }
};
