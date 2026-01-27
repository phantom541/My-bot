const { downloadAudio, isUnderLimit } = require('../services/downloader');

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube.',
    async execute({ sock, from, args, msg, reply }) {
        const query = args.join(' ');
        if (!query) return reply('❌ Please provide a song name or YouTube URL.');

        await reply(`🔍 Searching and downloading: "${query}"...`);

        try {
            const media = await downloadAudio(query);

            if (isUnderLimit(media.buffer)) {
                await sock.sendMessage(from, {
                    audio: media.buffer,
                    mimetype: 'audio/mpeg',
                    fileName: media.filename
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, {
                    document: media.buffer,
                    mimetype: 'audio/mpeg',
                    fileName: media.filename,
                    caption: `🎵 ${media.title} (Sent as document because it's > 16MB)`
                }, { quoted: msg });
            }
        } catch (e) {
            console.error('[PLAY] Error:', e);
            await reply('❌ Failed to download audio. Please make sure the URL is valid.');
        }
    }
};
