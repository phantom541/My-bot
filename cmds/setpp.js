module.exports = {
  name: 'setpp',
  description: 'Sets the bot\'s profile picture.',
  async execute(context) {
    const { hasRole, reply, msg, downloadContentFromMessage, sock } = context;
    if (!hasRole('owner')) return reply('You do not have permission to use this command.');
    if (!msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
        return reply('Please reply to an image to set it as the profile picture.');
    }
    try {
        const stream = await downloadContentFromMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        await sock.updateProfilePicture(sock.user.id, buffer);
        await reply('Profile picture updated.');
    } catch (error) {
        console.error('Error setting profile picture:', error);
        await reply('I could not set the profile picture.');
    }
  },
};
