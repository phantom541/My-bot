const config = require('../config');
const { jidNormalizedUser } = require('baileys');

const groupMetadataCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getAuthContext(sock, msg) {
    const senderJid = jidNormalizedUser(msg.key.participant || msg.key.remoteJid);
    const isOwner = config.ownerNumbers.includes(senderJid);

    return {
        senderJid,
        isOwner,
        isAdmin: isOwner,
    };
}

async function isGroupAdmin(sock, groupId, participantJid) {
    try {
        let metadata = groupMetadataCache.get(groupId);
        if (!metadata || (Date.now() - metadata.time > CACHE_TTL)) {
            metadata = {
                data: await sock.groupMetadata(groupId),
                time: Date.now()
            };
            groupMetadataCache.set(groupId, metadata);
        }

        const participant = metadata.data.participants.find(p => jidNormalizedUser(p.id) === jidNormalizedUser(participantJid));
        return participant && (participant.admin || participant.isSuperAdmin);
    } catch (e) {
        return false;
    }
}

module.exports = {
    getAuthContext,
    isGroupAdmin
};
