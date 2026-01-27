const { prepareWAMessageMedia } = require('baileys');
const fs = require('fs');
const axios = require('axios');

/**
 * Standardized function to send images.
 */
async function sendImage(sock, jid, source, caption = '', quoted = null) {
    try {
        let imageContent;
        if (typeof source === 'string') {
            if (source.startsWith('http')) {
                const response = await axios.get(source, { responseType: 'arraybuffer' });
                imageContent = Buffer.from(response.data);
            } else if (fs.existsSync(source)) {
                imageContent = fs.readFileSync(source);
            } else {
                throw new Error(`Invalid image source: ${source}`);
            }
        } else if (Buffer.isBuffer(source)) {
            imageContent = source;
        } else {
            throw new Error('Invalid image source type');
        }

        await sock.sendMessage(jid, {
            image: imageContent,
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
 * Prepares media for messages if needed (advanced usage).
 */
async function prepareMedia(sock, source, type = 'image') {
    try {
        const media = await prepareWAMessageMedia({ [type]: { url: source } }, { upload: sock.waUploadToServer });
        return media;
    } catch (error) {
        console.error('[MEDIA] Error preparing media:', error);
        return null;
    }
}

module.exports = {
    sendImage,
    prepareMedia
};
