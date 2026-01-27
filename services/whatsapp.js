const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    jidNormalizedUser
} = require("baileys");
const pino = require("pino");
const config = require("../config");
const { loadDb } = require("../database");

const logger = pino({ level: "info" });

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`[WA] Using Baileys v${version.join('.')}, isLatest: ${isLatest}`);

    const sock = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        printQRInTerminal: true,
        logger,
        browser: ["DragonBound", "Safari", "3.0"],
        retryRequestDelayMs: 5000,
        getMessage: async (key) => {
            // This is where you would implement message retrieval from a store for retries
            return { conversation: 'DragonBound Bot' };
        }
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log("[WA] QR Code received, scan it to connect.");
        }

        if (connection === "close") {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("[WA] Connection closed due to", lastDisconnect?.error, ", reconnecting:", shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === "open") {
            console.log("[WA] Connection opened successfully!");
        }
    });

    return sock;
}

module.exports = { connectToWhatsApp, jidNormalizedUser };
