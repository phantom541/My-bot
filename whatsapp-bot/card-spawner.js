const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const cards = require('./cardData.js'); // Use our own card data

ffmpeg.setFfmpegPath(ffmpegPath);

// === CONFIG & PATHS ===
const ravenLogoPath = path.join(__dirname, 'assets', 'ravenlogo.png');

// === UTILITIES ===
const downloadToBuffer = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(res.data, 'binary');
};

const convertGifToMp4 = async (gifBuffer) => new Promise((resolve, reject) => {
    const tmpGif = path.join(__dirname, 'tmp_input.gif');
    const tmpMp4 = path.join(__dirname, 'tmp_output.mp4');
    fs.writeFileSync(tmpGif, gifBuffer);
    ffmpeg(tmpGif)
        .outputOptions(['-movflags faststart', '-pix_fmt yuv420p', '-vf scale=320:-1,fps=15', '-b:v 700k'])
        .toFormat('mp4')
        .save(tmpMp4)
        .on('end', () => {
            const output = fs.readFileSync(tmpMp4);
            fs.unlinkSync(tmpGif);
            fs.unlinkSync(tmpMp4);
            resolve(output);
        })
        .on('error', (err) => {
            if (fs.existsSync(tmpGif)) fs.unlinkSync(tmpGif);
            if (fs.existsSync(tmpMp4)) fs.unlinkSync(tmpMp4);
            reject(err);
        });
});

const compressMp4 = async (mp4Buffer) => new Promise((resolve, reject) => {
    const tmpIn = path.join(__dirname, 'tmp_input.mp4');
    const tmpOut = path.join(__dirname, 'tmp_compressed.mp4');
    fs.writeFileSync(tmpIn, mp4Buffer);
    ffmpeg(tmpIn)
        .outputOptions(['-movflags faststart', '-pix_fmt yuv420p', '-vf scale=320:-1,fps=15', '-b:v 700k'])
        .toFormat('mp4')
        .save(tmpOut)
        .on('end', () => {
            const output = fs.readFileSync(tmpOut);
            fs.unlinkSync(tmpIn);
            fs.unlinkSync(tmpOut);
            resolve(output);
        })
        .on('error', (err) => {
            if (fs.existsSync(tmpIn)) fs.unlinkSync(tmpIn);
            if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);
            reject(err);
        });
});

// === SPAWN LOGIC ===
async function spawnCard(context) {
    const { sock, from, activeCardSpawns, CARD_CLAIM_COST } = context;

    if (!cards.length) {
        console.error('❌ No cards available to spawn.');
        return;
    }

    const card = cards[Math.floor(Math.random() * cards.length)];

    activeCardSpawns[from] = {
        ...card,
        spawnTime: Date.now(),
    };

    const ext = card.imageUrl.split('.').pop().toLowerCase();
    const isGif = ext === 'gif';
    const isVideo = ext === 'mp4';

    try {
        let mediaBuffer = await downloadToBuffer(card.imageUrl);
        let finalBuffer = mediaBuffer;
        let mediaType = 'image';

        if (isGif) {
            finalBuffer = await convertGifToMp4(mediaBuffer);
            mediaType = 'video';
        } else if (isVideo) {
            // Assuming we might have mp4s in cardData.js in the future
            finalBuffer = await compressMp4(mediaBuffer);
            mediaType = 'video';
        }

        // --- Small simple thumbnail ---
        let thumbnail;
        try {
            const thumbRaw = fs.readFileSync(ravenLogoPath);
            if (thumbRaw.length > 0) { // Check if the logo file is not empty
                 thumbnail = await sharp(thumbRaw)
                    .resize(100, 100)   // small square
                    .png()
                    .toBuffer();
            } else {
                thumbnail = null; // Don't generate a thumbnail if the logo is empty
            }
        } catch(e) {
            console.error("Could not read or process logo, skipping thumbnail.", e);
            thumbnail = null;
        }

        const caption = `A wild card has appeared!\n\n*${card.name}* (Tier: ${card.tier})\n\nUse \`%claim\` to add it to your collection! It costs ${CARD_CLAIM_COST} gold.`;

        await sock.sendMessage(from, {
            [mediaType]: finalBuffer,
            caption: caption,
            ...(mediaType === 'video' ? { gifPlayback: true } : {}),
            contextInfo: thumbnail ? {
                externalAdReply: {
                    title: "🎉 New Card Spawn! 🎉",
                    body: "A wild card has appeared!",
                    thumbnail,
                    mediaType: 1, // 1 for photo, 2 for video
                    renderLargerThumbnail: false
                }
            } : undefined
        });

        console.log(`✅ Spawned ${card.name} in ${from}`);

        // Set a timeout for the card to disappear (5 minutes)
        setTimeout(() => {
            if (activeCardSpawns[from] && activeCardSpawns[from].id === card.id) {
                delete activeCardSpawns[from];
                sock.sendMessage(from, { text: `The card "${card.name}" was not claimed and has disappeared.` });
            }
        }, 5 * 60 * 1000);

    } catch (err) {
        console.error('❌ Failed to send card:', err.message);
        // Clean up the active spawn if sending failed
        if (activeCardSpawns[from] && activeCardSpawns[from].id === card.id) {
            delete activeCardSpawns[from];
        }
    }
}

module.exports = { spawnCard };