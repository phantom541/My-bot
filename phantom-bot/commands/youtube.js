const { downloadMedia, isUnderLimit } = require('../services/downloader');

module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    description: 'Download a video from YouTube.',
    async execute({ sock, from, args, msg, reply }) {
        const url = args[0];
        if (!url) return reply('❌ Please provide a YouTube URL.');

        await reply(`📥 Downloading YouTube video...`);

        try {
            const media = await downloadMedia(url);

            if (isUnderLimit(media.buffer)) {
                await sock.sendMessage(from, {
                    video: media.buffer,
                    mimetype: 'video/mp4',
                    caption: `🎬 *${media.title}*`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, {
                    document: media.buffer,
                    mimetype: 'video/mp4',
                    fileName: media.filename,
                    caption: `🎬 *${media.title}* (Sent as document because it's > 16MB)`
                }, { quoted: msg });
            }
        } catch (e) {
            console.error('[YOUTUBE] Error:', e);
            await reply('❌ Failed to download YouTube video.');
        }
    }
};
