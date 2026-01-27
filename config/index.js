require('dotenv').config();

module.exports = {
    ownerNumbers: (process.env.OWNER_NUMBERS || '').split(',').map(num => num.trim().replace('+', '')),
    prefix: process.env.BOT_PREFIX || '%',
    port: process.env.PORT || 5000,
    databaseFile: process.env.DATABASE_FILE || 'database.json',
    backupDir: process.env.BACKUP_DIR || 'backups',
    maxBackups: parseInt(process.env.MAX_BACKUPS) || 20,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    giphy: {
        api_key: process.env.GIPHY_API_KEY
    },
    unsplash: {
        access_key: process.env.UNSPLASH_ACCESS_KEY,
        secret_key: process.env.UNSPLASH_SECRET_KEY
    },
    economy: {
        cardClaimCost: parseInt(process.env.CARD_CLAIM_COST) || 100,
        cardPackCost: parseInt(process.env.CARD_PACK_COST) || 300,
        cardPackSize: parseInt(process.env.CARD_PACK_SIZE) || 3,
        guildCreateCost: parseInt(process.env.GUILD_CREATE_COST) || 10000,
        maxBet: parseInt(process.env.MAX_BET) || 1000000
    }
};
