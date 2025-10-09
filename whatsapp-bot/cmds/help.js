const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = {
  name: 'help',
  aliases: ['menu'],
  description: 'Displays a visually appealing list of all available commands.',
  async execute(context) {
    const { sock, from, reply, OWNER_NAME, GIPHY_API_KEY, PREFIX } = context;

    if (!GIPHY_API_KEY) {
        console.error("GIPHY_API_KEY is not configured. Cannot fetch image for help menu.");
        // Fallback to a simple text menu if the API key is missing
        return reply("Welcome to the Dragon Bot! Use commands with the prefix '%' (e.g., %profile). For a full command list, please ask the bot owner to configure the Giphy API key.");
    }

    let mediaBuffer;
    let mediaType = 'image';
    let isGif = false;

    try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=anime&rating=pg-13`);
        const imageUrl = response.data.data.images.original.url;

        isGif = imageUrl.endsWith('.gif');
        mediaType = isGif ? 'video' : 'image';

        const bufferResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        mediaBuffer = Buffer.from(bufferResponse.data, 'binary');

    } catch (error) {
        console.error("Failed to fetch image for help menu:", error);
        // Fallback to a text-only menu if the image fetch fails
        return reply("The menu is currently unavailable. Please try again later.");
    }

    const ravenLogoPath = path.join(__dirname, '..', 'assets', 'ravenlogo.png');
    let thumbnail;
    try {
        const thumbRaw = fs.readFileSync(ravenLogoPath);
        if (thumbRaw.length > 0) {
             thumbnail = await sharp(thumbRaw).resize(100, 100).png().toBuffer();
        } else {
            thumbnail = null;
        }
    } catch(e) {
        console.error("Could not read or process logo for help menu, skipping thumbnail.", e);
        thumbnail = null;
    }

    const helpText = `
🐲 *DRAGON BOT MENU* 🐲

Hello! I'm your friendly Dragon Bot, here to bring adventure to your chat!
Owner: *${OWNER_NAME}*

Here's a quick look at what I can do (prefix: \`${PREFIX}\`):

🐉 *Core Commands*
 • *start-hunt*: Begin your journey.
 • *profile*: View your player profile.
 • *daily*: Claim your daily reward.
 • *leaderboard*: See who's on top.
 • *guide <cmd>*: Get details on a command.

⚔️ *Dragon & Battle*
 • *spawn*: Find a wild dragon.
 • *catch <tool>*: Catch a spawned dragon.
 • *party* / *den*: Manage your dragons.
 • *train*: Level up your dragons.
 • *attack*: Battle a wild dragon.
 • *battle <@user>*: Challenge a friend.

🃏 *Card Collecting*
 • *spawncard*: Spawn a collectible card (Mod).
 • *claim*: Claim the spawned card.
 • *cards*: View your collection.
 • *buypack*: Get a random pack of cards.

🏛️ *Guilds*
 • *guild create <name>*: Start your own guild.
 • *guild join <name>*: Join a guild.
 • *guild info*: Check guild status.

💰 *Economy*
 • *balance*: Check your gold.
 • *mart*: See items for sale.
 • *buy <item>*: Purchase an item.

🎉 *Fun & Social*
 • *compliment*, *insult*, *flirt*, *ship*

🎵 *Downloader*
 • *play <song>*: Play music from YouTube.

...and many more! Use \`${PREFIX}guide <command>\` for more details on any command.
    `;

    try {
        await sock.sendMessage(from, {
            [mediaType]: mediaBuffer,
            caption: helpText,
            ...(isGif ? { gifPlayback: true } : {}),
            contextInfo: thumbnail ? {
                externalAdReply: {
                    title: `🐉 ${OWNER_NAME}'s Dragon Bot 🐉`,
                    body: `Type ${PREFIX}guide for more info!`,
                    thumbnail,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            } : undefined
        });
    } catch (sendError) {
        console.error("Failed to send help menu with media:", sendError);
        // If sending with media fails, send the text part as a fallback
        reply(helpText);
    }
  },
};