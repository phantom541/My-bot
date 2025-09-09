const ytdlp = require('ytdlp-nodejs');

module.exports = {
  name: 'play',
  description: 'Play a song from YouTube.',
  async execute(context) {
    const { args, reply, sock, from } = context;
    const query = args.join(' ');

    if (!query) {
      return reply('Please provide a song name to play.');
    }

    try {
      await reply(`Searching for "${query}"...`);

      // Use yt-dlp's search feature to get metadata for the first result
      const metadata = await ytdlp(`ytsearch1:"${query}"`, {
        dumpSingleJson: true,
      });

      if (!metadata || !metadata.webpage_url) {
        return reply('Could not find any results for your query.');
      }

      await reply(`Downloading *${metadata.title}*...`);

      // Get a readable stream of the best audio
      const readableStream = ytdlp.execStream([
        metadata.webpage_url,
        '-f',
        'bestaudio',
        '-o',
        '-', // Output to stdout
      ]);

      await sock.sendMessage(from, {
        audio: readableStream,
        mimetype: 'audio/mp4',
      });

    } catch (error) {
      console.error('Error playing song:', error);
      await reply('Sorry, I could not play that song. The video might be region-locked or private.');
    }
  },
};
