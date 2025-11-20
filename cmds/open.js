module.exports = {
    name: 'open',
    description: 'Allows anyone to send messages in the group (Admin only).',
    async execute(context) {
        const { sock, from, msg, isGroupAdmin } = context;

        if (!await isGroupAdmin(from, msg.key.participant)) {
            return sock.sendMessage(from, { text: 'Only group admins can use this command.' }, { quoted: msg });
        }

        try {
            await sock.groupSettingUpdate(from, 'not_announcement');
            await sock.sendMessage(from, { text: 'The group chat has been opened.' });
        } catch (error) {
            console.error('Error opening group chat:', error);
            await sock.sendMessage(from, { text: 'I could not open the group chat. Am I an admin?' }, { quoted: msg });
        }
    },
};
