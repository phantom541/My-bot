const fs = require('fs');
const path = require('path');
const config = require('../config');

const DB_PATH = path.join(process.cwd(), config.databaseFile);
const BACKUP_DIR = path.join(process.cwd(), config.backupDir);
const MAX_BACKUPS = config.maxBackups;

global.db = { players: {}, sessions: {}, guilds: {}, groupSettings: {} };

/**
 * Loads the database from disk.
 */
function loadDb() {
    if (!fs.existsSync(DB_PATH)) {
        console.log("[DB] No database file found, creating new one.");
        saveDb();
        return;
    }

    try {
        const raw = fs.readFileSync(DB_PATH);
        const data = JSON.parse(raw);
        global.db = {
            players: data.players || {},
            sessions: data.sessions || {},
            guilds: data.guilds || {},
            groupSettings: data.groupSettings || {},
            ...data
        };
        console.log(`[DB] Database loaded. Players: ${Object.keys(global.db.players).length}`);
    } catch (err) {
        console.error("[DB] DATABASE LOAD FAILED:", err);
        // If it fails, we keep the default empty structure to avoid crashes,
        // but we should probably backup the corrupted file if it exists.
        if (fs.existsSync(DB_PATH)) {
            const corruptedPath = `${DB_PATH}.corrupted-${Date.now()}`;
            fs.renameSync(DB_PATH, corruptedPath);
            console.error(`[DB] Corrupted database moved to ${corruptedPath}`);
        }
    }
}

/**
 * Saves the database to disk atomically.
 */
function saveDb() {
    try {
        const tempPath = `${DB_PATH}.tmp`;
        fs.writeFileSync(tempPath, JSON.stringify(global.db, null, 2));
        fs.renameSync(tempPath, DB_PATH);
    } catch (err) {
        console.error("[DB] DATABASE SAVE FAILED:", err);
    }
}

/**
 * Creates a backup of the database.
 */
function createBackup() {
    try {
        if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupPath = path.join(BACKUP_DIR, `db-backup-${timestamp}.json`);

        fs.writeFileSync(backupPath, JSON.stringify(global.db, null, 2));

        rotateBackups();
        console.log(`[DB] Backup created: ${backupPath}`);
    } catch (err) {
        console.error("[DB] BACKUP ERROR:", err);
    }
}

/**
 * Rotates backups, keeping only the most recent ones.
 */
function rotateBackups() {
    try {
        const files = fs.readdirSync(BACKUP_DIR)
            .filter(f => f.startsWith("db-backup-"))
            .sort();

        while (files.length > MAX_BACKUPS) {
            const oldest = files.shift();
            fs.unlinkSync(path.join(BACKUP_DIR, oldest));
        }
    } catch (err) {
        console.error("[DB] ROTATION ERROR:", err);
    }
}

// Initialize
global.saveDb = saveDb;
loadDb();

// Schedule backups every 5 minutes
setInterval(createBackup, 5 * 60 * 1000);

module.exports = {
    loadDb,
    saveDb,
    createBackup
};
