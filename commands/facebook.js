const { downloadMedia, isUnderLimit } = require('../services/downloader');

module.exports = {
    name: 'facebook',
    aliases: ['fb'],
    description: 'Download a video from Facebook.',
    async execute({ sock, from, args, msg, reply }) {
        const url = args[0];
        if (!url) return reply('❌ Please provide a Facebook URL.');

        await reply(`📥 Downloading Facebook video...`);

        try {
            const media = await downloadMedia(url);

            if (isUnderLimit(media.buffer)) {
                await sock.sendMessage(from, {
                    video: media.buffer,
                    mimetype: 'video/mp4',
                    caption: `🎬 *Facebook Download*`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, {
                    document: media.buffer,
                    mimetype: 'video/mp4',
                    fileName: media.filename,
                    caption: `🎬 *Facebook Download* (Sent as document because it's > 16MB)`
                }, { quoted: msg });
            }
        } catch (e) {
            console.error('[FACEBOOK] Error:', e);
            await reply('❌ Failed to download Facebook video.');
        }
    }
};
