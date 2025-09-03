const ytdlp = require('ytdlp-nodejs');

module.exports = {
  name: 'youtube',
  description: 'Downloads a video or audio from YouTube.',
  async execute(context) {
    const { args, reply, sock, from } = context;
    const format = args[0]?.toLowerCase();
    const url = args[1];

    if (!format || (format !== 'mp3' && format !== 'mp4')) {
        return reply('Please specify a format: mp3 or mp4.');
    }
    if (!url) return reply('Please provide a YouTube URL.');

    await reply(`Downloading your ${format}, please wait...`);

    try {
        const stream = ytdlp(url, {
            output: '-',
            format: format === 'mp3' ? 'bestaudio[ext=m4a]/bestaudio/best' : 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best/best',
        });

        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        if (format === 'mp3') {
            await sock.sendMessage(from, { audio: buffer });
        } else {
            await sock.sendMessage(from, { video: buffer });
        }

    } catch (error) {
        console.error('Error downloading from YouTube:', error);
        await reply('Sorry, I could not download the video/audio.');
    }
  },
};
