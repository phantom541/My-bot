const { connectToWhatsApp } = require('./services/whatsapp');
const { loadCommands, handleMessage } = require('./handlers/command');
const { loadDb } = require('./database/index');
const http = require('http');

// Simple HTTP server for health checks
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'running', timestamp: new Date().toISOString() }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`[SYS] Health check server running on port ${PORT}`);
});

async function startBot() {
    console.log("[SYS] Starting DragonBound Bot...");
    
    // 1. Initialize Database
    loadDb();
    
    // 2. Load Commands
    loadCommands();

    // 3. Connect to WhatsApp
    const sock = await connectToWhatsApp();

    // 4. Initialize Spawners
    const { initSpawners } = require('./services/spawner');
    initSpawners(sock);

    // 5. Handle Messages
    sock.ev.on("messages.upsert", async (m) => {
        await handleMessage(sock, m);
    });

    console.log("[SYS] Bot is ready.");
}

startBot().catch(err => {
    console.error("[FATAL] Startup failed:", err);
});
