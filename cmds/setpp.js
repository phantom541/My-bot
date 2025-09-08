const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
  name: 'setpp',
  description: 'Sets the bot\'s profile picture.',
  async execute(context) {
    const { hasRole, reply, msg, client } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');

    if (!msg.hasQuotedMsg) {
        return reply('Please reply to an image to set it as the profile picture.');
    }

    const quotedMsg = await msg.getQuotedMessage();
    if (!quotedMsg.hasMedia || !quotedMsg.type === 'image') {
        return reply('The replied message is not an image.');
    }

    try {
        const media = await quotedMsg.downloadMedia();
        await client.setProfilePicture(media);
        await reply('Profile picture updated.');
    } catch (error) {
        console.error('Error setting profile picture:', error);
        await reply('I could not set the profile picture.');
    }
  },
};
