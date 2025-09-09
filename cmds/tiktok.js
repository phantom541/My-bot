const ytdlp = require('ytdlp-nodejs');

module.exports = {
  name: 'tiktok',
  aliases: ['tt'],
  description: 'Download from TikTok.',
  async execute(context) {
    const { args, reply, sock, from } = context;
    const url = args[0];

    if (!url || !url.includes('tiktok.com')) {
      return reply('Please provide a valid TikTok URL.');
    }

    try {
      await reply('Downloading from TikTok...');

      const metadata = await ytdlp(url, {
        dumpSingleJson: true,
      });

      const readableStream = ytdlp.execStream([
        url,
        '-f',
        'best',
        '-o',
        '-',
      ]);

      await sock.sendMessage(from, {
        video: readableStream,
        caption: metadata.title || 'Downloaded from TikTok',
      });

    } catch (error) {
      console.error('Error downloading from TikTok:', error);
      await reply('Sorry, I could not download that video.');
    }
  },
};
