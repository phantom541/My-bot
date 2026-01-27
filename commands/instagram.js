const { downloadMedia, isUnderLimit } = require('../services/downloader');

module.exports = {
    name: 'instagram',
    aliases: ['ig'],
    description: 'Download a video/reel from Instagram.',
    async execute({ sock, from, args, msg, reply }) {
        const url = args[0];
        if (!url) return reply('❌ Please provide an Instagram URL.');

        await reply(`📥 Downloading Instagram content...`);

        try {
            const media = await downloadMedia(url);

            if (isUnderLimit(media.buffer)) {
                await sock.sendMessage(from, {
                    video: media.buffer,
                    mimetype: 'video/mp4',
                    caption: `🎬 *Instagram Download*`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, {
                    document: media.buffer,
                    mimetype: 'video/mp4',
                    fileName: media.filename,
                    caption: `🎬 *Instagram Download* (Sent as document because it's > 16MB)`
                }, { quoted: msg });
            }
        } catch (e) {
            console.error('[INSTAGRAM] Error:', e);
            await reply('❌ Failed to download Instagram content.');
        }
    }
};
