const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { prepareWAMessageMedia } = require('baileys');
const ytdlp = require('ytdlp-nodejs');

/**
 * Converts a stream to a Buffer.
 */
function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

/**
 * Checks file size and returns true if under 16MB.
 */
function isUnderLimit(buffer) {
    const MAX_SIZE = 16 * 1024 * 1024; // 16MB
    return buffer.length <= MAX_SIZE;
}

/**
 * Downloads media from various platforms.
 */
async function downloadMedia(url, platform = 'auto') {
    try {
        console.log(`[DOWNLOAD] Attempting to download from ${url} (Platform: ${platform})`);

        // For YouTube/Play/TikTok/etc, we use yt-dlp via ytdlp-nodejs
        // Note: ytdlp-nodejs might require yt-dlp to be installed on the system.

        const result = await ytdlp.download(url, {
            filter: 'best',
            // Add any other necessary options
        });

        if (!result || !result.stream) {
            throw new Error('Failed to get download stream');
        }

        const buffer = await streamToBuffer(result.stream);
        const info = result.info || { title: 'downloaded_media' };

        return {
            buffer,
            filename: `${info.title || 'media'}.mp4`,
            mimetype: 'video/mp4', // Default to video/mp4
            title: info.title
        };

    } catch (error) {
        console.error(`[DOWNLOAD] Error downloading from ${url}:`, error);
        throw error;
    }
}

/**
 * Specialized download for audio (play command).
 */
async function downloadAudio(url) {
    try {
        const result = await ytdlp.download(url, {
            filter: 'bestaudio',
        });

        if (!result || !result.stream) {
            throw new Error('Failed to get audio stream');
        }

        const buffer = await streamToBuffer(result.stream);
        const info = result.info || { title: 'downloaded_audio' };

        return {
            buffer,
            filename: `${info.title || 'audio'}.mp3`,
            mimetype: 'audio/mpeg',
            title: info.title
        };
    } catch (error) {
        console.error(`[DOWNLOAD] Error downloading audio from ${url}:`, error);
        throw error;
    }
}

module.exports = {
    downloadMedia,
    downloadAudio,
    isUnderLimit,
    streamToBuffer
};
