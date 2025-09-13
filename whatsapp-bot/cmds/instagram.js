const ytdlp = require('ytdlp-nodejs');

module.exports = {
  name: 'instagram',
  aliases: ['ig'],
  description: 'Download from Instagram.',
  async execute(context) {
    const { args, reply, sock, from } = context;
    const url = args[0];

    if (!url || !url.includes('instagram.com')) {
      return reply('Please provide a valid Instagram URL.');
    }

    try {
      await reply('Downloading from Instagram...');

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
        caption: metadata.title || 'Downloaded from Instagram',
      });

    } catch (error) {
      console.error('Error downloading from Instagram:', error);
      await reply('Sorry, I could not download that content. It might be a private post or a story.');
    }
  },
};
