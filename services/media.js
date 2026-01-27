const { prepareWAMessageMedia } = require('baileys');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const config = require('../config');

/**
 * Standardized function to send images using Baileys media preparation.
 */
async function sendImage(sock, jid, source, caption = '', quoted = null) {
    try {
        let imageOptions;
        if (typeof source === 'string') {
            if (source.startsWith('http')) {
                imageOptions = { url: source };
            } else if (fs.existsSync(source)) {
                imageOptions = fs.readFileSync(source);
            } else {
                throw new Error(`Invalid image source: ${source}`);
            }
        } else if (Buffer.isBuffer(source)) {
            imageOptions = source;
        } else {
            throw new Error('Invalid image source type');
        }

        const media = await prepareWAMessageMedia(
            { image: imageOptions },
            { upload: sock.waUploadToServer }
        );

        await sock.sendMessage(jid, {
            image: media.image,
            caption: caption
        }, { quoted });

    } catch (error) {
        console.error('[MEDIA] Error sending image:', error);
        // Fallback to text if image fails
        await sock.sendMessage(jid, {
            text: `${caption}\n\n[Note: Image could not be loaded]`
        }, { quoted });
    }
}

/**
 * Specifically sends a dragon image based on its ID.
 */
async function sendDragonImage(sock, jid, dragon, caption = '', quoted = null) {
    try {
        const imageUrl = `${config.imageBaseUrl}${dragon.id}.png`;
        const media = await prepareWAMessageMedia(
            { image: { url: imageUrl } },
            { upload: sock.waUploadToServer }
        );
        await sock.sendMessage(jid, { image: media.image, caption: caption || `🐲 ${dragon.name}` }, { quoted });
    } catch (err) {
        console.error(`[MEDIA] Failed to send dragon image for ${dragon.name}:`, err);
        const fallbackPath = path.join(process.cwd(), 'assets/fallback-dragon.png');
        try {
            // Ensure assets dir exists for the sake of the example
            if (!fs.existsSync(path.dirname(fallbackPath))) fs.mkdirSync(path.dirname(fallbackPath), { recursive: true });
            if (!fs.existsSync(fallbackPath)) {
                // If fallback doesn't exist, we send a generic placeholder or text
                return sock.sendMessage(jid, { text: `${caption || `🐲 ${dragon.name}`}\n\n[Image Unavailable]` }, { quoted });
            }
            const media = await prepareWAMessageMedia(
                { image: { url: fallbackPath } },
                { upload: sock.waUploadToServer }
            );
            await sock.sendMessage(jid, { image: media.image, caption: `${caption || `🐲 ${dragon.name}`} (image fallback)` }, { quoted });
        } catch (fallbackErr) {
            await sock.sendMessage(jid, { text: `${caption || `🐲 ${dragon.name}`}\n\n[Image Unavailable]` }, { quoted });
        }
    }
}

/**
 * Specifically sends a card image based on its ID.
 */
async function sendCardImage(sock, jid, card, caption = '', quoted = null) {
    try {
        // Cards might use a different prefix or the same base
        const imageUrl = card.imageUrl || `${config.imageBaseUrl}cards/${card.id}.png`;
        const media = await prepareWAMessageMedia(
            { image: { url: imageUrl } },
            { upload: sock.waUploadToServer }
        );
        await sock.sendMessage(jid, { image: media.image, caption: caption || `🃏 ${card.name}` }, { quoted });
    } catch (err) {
        console.error(`[MEDIA] Failed to send card image for ${card.name}:`, err);
        await sock.sendMessage(jid, { text: `${caption || `🃏 ${card.name}`}\n\n[Image Unavailable]` }, { quoted });
    }
}

module.exports = {
    sendImage,
    sendDragonImage,
    sendCardImage
};
