const ytdlp = require('ytdlp-nodejs');

module.exports = {
  name: 'youtube',
  aliases: ['yt'],
  description: 'Download from YouTube.',
  async execute(context) {
    const { args, reply, sock, from } = context;
    const format = args[0]?.toLowerCase();
    const url = args[1];

    if (!format || (format !== 'mp3' && format !== 'mp4') || !url || !url.includes('youtu')) {
      return reply('Invalid usage. Use `%youtube <mp3|mp4> <youtube_url>`');
    }

    try {
      await reply('Fetching video information...');

      const metadata = await ytdlp(url, {
        dumpSingleJson: true,
      });

      await reply(`Downloading *${metadata.title}* as ${format}...`);

      let ytdlpArgs = [url, '-o', '-']; // Common args
      if (format === 'mp3') {
        ytdlpArgs.push('-f', 'bestaudio', '--extract-audio', '--audio-format', 'mp3');
      } else { // mp4
        ytdlpArgs.push('-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best');
      }

      const readableStream = ytdlp.execStream(ytdlpArgs);

      if (format === 'mp4') {
        await sock.sendMessage(from, {
          video: readableStream,
          caption: metadata.title,
        });
      } else {
        await sock.sendMessage(from, {
          audio: readableStream,
          mimetype: 'audio/mpeg', // Correct mimetype for mp3
        });
      }

    } catch (error) {
      console.error('Error downloading from YouTube:', error);
      await reply('Sorry, I could not download that video.');
    }
  },
};
