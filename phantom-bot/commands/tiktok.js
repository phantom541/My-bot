const { downloadMedia, isUnderLimit } = require('../services/downloader');

module.exports = {
    name: 'tiktok',
    aliases: ['tt'],
    description: 'Download a video from TikTok.',
    async execute({ sock, from, args, msg, reply }) {
        const url = args[0];
        if (!url) return reply('❌ Please provide a TikTok URL.');

        await reply(`📥 Downloading TikTok video...`);

        try {
            const media = await downloadMedia(url);

            if (isUnderLimit(media.buffer)) {
                await sock.sendMessage(from, {
                    video: media.buffer,
                    mimetype: 'video/mp4',
                    caption: `🎬 *TikTok Download*`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, {
                    document: media.buffer,
                    mimetype: 'video/mp4',
                    fileName: media.filename,
                    caption: `🎬 *TikTok Download* (Sent as document because it's > 16MB)`
                }, { quoted: msg });
            }
        } catch (e) {
            console.error('[TIKTOK] Error:', e);
            await reply('❌ Failed to download TikTok video.');
        }
    }
};
