const ytdlp = require('ytdlp-nodejs');

module.exports = {
  name: 'facebook',
  aliases: ['fb'],
  description: 'Download from Facebook.',
  async execute(context) {
    const { args, reply, sock, from } = context;
    const url = args[0];

    if (!url || (!url.includes('facebook.com') && !url.includes('fb.watch'))) {
      return reply('Please provide a valid Facebook URL.');
    }

    try {
      await reply('Downloading from Facebook...');

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
        caption: metadata.title || 'Downloaded from Facebook',
      });

    } catch (error) {
      console.error('Error downloading from Facebook:', error);
      await reply('Sorry, I could not download that content. It might be a private video.');
    }
  },
};
