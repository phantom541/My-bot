const ytdlp = require('ytdlp-nodejs');

module.exports = {
  name: 'play',
  description: 'Plays a song from YouTube.',
  async execute(context) {
    const { args, reply, sock, from } = context;
    const query = args.join(' ');
    if (!query) return reply('Please provide a song name or YouTube URL.');

    await reply('Searching for your song, please wait...');

    try {
        const stream = ytdlp(query, {
            output: '-',
            format: 'bestaudio[ext=m4a]/bestaudio/best',
        });

        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        await sock.sendMessage(from, { audio: buffer });

    } catch (error) {
        console.error('Error playing song:', error);
        await reply('Sorry, I could not play the song.');
    }
  },
};
