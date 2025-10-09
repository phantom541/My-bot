const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = {
  name: 'help',
  aliases: ['menu'],
  description: 'Displays a visually appealing list of all available commands.',
  async execute(context) {
    const { sock, from, reply, GIPHY_API_KEY, PREFIX } = context;

    if (!GIPHY_API_KEY) {
        console.error("GIPHY_API_KEY is not configured. Cannot fetch image for help menu.");
        // Fallback to a simple text menu if the API key is missing
        return reply("Welcome to the Dragon Bot! Use commands with the prefix '%' (e.g., %profile). For a full command list, please ask the bot owner to configure the Giphy API key.");
    }

    let mediaBuffer;
    let mediaType = 'image';
    let isGif = false;

    try {
        // Fetch a random anime image/gif
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

    // The new, "Phantom-core" menu text
    const helpText = `
*🐉⛓️ 𝙳𝚁Δ𝙶Ø₦ ₣𝙰𝙻𝙻 ⱣⱧΔ₥ŦØ₥ 𝙲𝙾𝙽𝚂𝙾𝙻𝙴 ⛓️🐉*
\`\`\`
╔═══◇══════◇═══╗
   🅓🅡🅐🅖🅞🅝   𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙲𝙾𝙽𝚃𝚁𝙾𝙻
╚═══◇══════◇═══╝

👁‍🗨 ⧫ Welcome, Dragonbound Phantom.
⚙️ SYSTEM STATUS: 🔥 Active | ⚡ CODE: DRAKON-PHANTOM
🕶 Motto: “𝘛𝘩𝘦 𝘧𝘪𝘳𝘦 𝘪𝘴 𝘯𝘰𝘵 𝘵𝘰 𝘣𝘦 𝘧𝘦𝘢𝘳𝘦𝘥—𝘪𝘵 𝘪𝘴 𝘵𝘰 𝘣𝘦 𝘸𝘦𝘪𝘭𝘥𝘦𝘥.”
🔮 CORE THEME: Elemental Warfare / Glitched Mythos

═══▰▰▰▰▰▰▰▰═══
\`\`\`

---

*🧩 General Protocols*
\`\`\`
%start-hunt          → Initiate your dragonbound saga.
%guide <cmd>         → Decrypt command intel.
%profile [@user]     → Scan user profile.
%leaderboard         → Access wealth hierarchy.
%nickname <id> <name>→ Rename your beast.
%mods                → Reveal Phantom Moderators.
%daily               → Claim daily infusion.
%quests              → Activate questline.
%dex <name|id>       → DragonDex access node.
%craft <item>        → Forge item from ether.
%map                 → Load world grid.
%achievements        → Display legacy markers.
\`\`\`

---

*💰 Economy Engine*
\`\`\`
%balance             → Scan gold & vault.
%deposit <amt>       → Transfer to vault.
%withdraw <amt>      → Extract from vault.
%mart                → Open item bazaar.
%buy <item>          → Acquire from shop.
%slot <amt>          → Gamble in the glitch.
%market              → Enter player exchange.
\`\`\`

---

*🐲 Dragon Management*
\`\`\`
%spawn               → Summon wild entity.
%catch <tool>        → Attempt capture.
%party               → View active squad.
%den                 → Access dragon vault.
%sendtoden <id>      → Transfer to vault.
%sendtoparty <id>    → Deploy to squad.
%dragon <name|id>    → Scan dragon data.
\`\`\`

---

*⚔️ Combat & Training*
\`\`\`
%train               → Initiate training protocol.
%attack              → Engage wild entity.
%battle @user        → Challenge rival.
%battle fight <1-4>  → Execute combat move.
%remove <move>       → Purge ability.
%dungeon             → Enter cryptic zone.
%boss                → Engage global entity.
\`\`\`

---

*🏰 Dungeons & Beasts*
\`\`\`
%dungeons            → List cryptic zones.
%spawn-dungeon <name>→ Admin summon.
%enter-dungeon       → Enter active zone.
%dungeon start       → Begin crawl (Leader only).

%beasts              → List Colossal Entities.
%activate-scenario   → Admin summon beast.
%challenge-beast     → Engage entity.
\`\`\`

---

*🏆 Tournaments*
\`\`\`
%tournament create   → Forge battleground.
%tournament join     → Enter arena.
%tournament start    → Begin clash.
%tournament reportwin→ Log victory.
\`\`\`

---

*🛡️ Guild System*
\`\`\`
%guilds              → List factions.
%guild create        → Forge guild (10K gold).
%guild join          → Request entry.
%guild info          → Scan guild data.
%guild accept        → Approve recruit.
%guild manage        → Promote/Demote/Kick.
%guild slogan        → Update creed.
%guild deposit       → Fund treasury.
%guild withdraw      → Extract funds.
\`\`\`

---

*🎁 Gifting & Trade*
\`\`\`
%givedragon          → Transfer beast.
%trade               → Propose exchange.
%trade accept        → Confirm deal.
%trade decline       → Reject deal.
\`\`\`

---

*🎭 Fun Protocols*
\`\`\`
%compliment          → Send praise.
%insult              → Deliver roast.
%flirt               → Engage charm protocol.
%shayari             → Emit poetic burst.
%goodnight           → Send night signal.
%roseday             → Trigger rose event.
%character           → Reveal persona.
%wasted              → Apply glitch filter.
%ship                → Link two users.
%simp                → Mark devotion.
%stupid              → Echo foolishness.
\`\`\`

---

*🃏 Card System*
\`\`\`
%spawncard           → Generate card (mods only).
%claim               → Acquire card (100 gold).
%buypack             → Buy 3-card pack (300 gold).
%cards               → View collection.
%spawnpack6          → Spawn elite pack.
%spawnpack7          → Spawn tiered pack.
%claimpack           → Claim pack.
%movetodeck          → Transfer to deck.
%movetoholder        → Transfer to holder.
%givecard            → Gift card to user.
\`\`\`

---

### 🔐 *Admin Protocols*
\`\`\`
%ban                 → Lock user.
%unban               → Unlock user.
%kick                → Eject user.
%wild on/off         → Toggle wild spawns.
%huntdragon          → Spawn elite dragon.
%givegold            → Transfer gold.
%re-roll             → Reset dragon moves.
%environments        → List battle zones.
\`\`\`

---

### 👑 *Owner Controls*
\`\`\`
%addsudo             → Promote mod.
%delsudo             → Demote mod.
%addpower            → Grant power.
%delpower            → Revoke power.
%mode                → Set bot mode.
%clearsession        → Purge session.
%setpp               → Set bot avatar.
%autotyping          → Toggle auto-type.
%autoread            → Toggle auto-read.
%antidelete          → Toggle anti-delete.
%autoreact           → Toggle auto-react.
\`\`\`

---

### 🛡️ *Group Admin Ops*
\`\`\`
%modes               → Toggle group features.
%open                → Unlock group chat.
%close               → Lock group chat.
\`\`\`

---

### 📥 *Downloader Node*
\`\`\`
%play                → Stream song.
%youtube             → Download YT media.
%instagram           → Download IG media.
%facebook            → Download FB media.
%tiktok              → Download TT media.
\`\`\`

---

**Owner:** ⱠΔ₩–ⱠΞƧƧ ⱣⱧΔ₥ŦØ₥
**Console Motto:** *“𝘛𝘩𝘦 𝘥𝘳𝘢𝘨𝘰𝘯 𝘪𝘴 𝘯𝘰𝘵 𝘵𝘰 𝘣𝘦 𝘵𝘳𝘢𝘪𝘯𝘦𝘥—𝘪𝘵 𝘪𝘴 𝘵𝘰 𝘣𝘦 𝘧𝘦𝘢𝘳𝘦𝘥.”*

═══▰▰▰▰▰▰▰▰═══
    `;

    try {
        await sock.sendMessage(from, {
            [mediaType]: mediaBuffer,
            caption: helpText,
            ...(isGif ? { gifPlayback: true } : {}),
            contextInfo: thumbnail ? {
                externalAdReply: {
                    title: `🐉 ⱠΔ₩–ⱠΞƧƧ ⱣⱧΔ₥ŦØ₥'s Dragon Bot 🐉`,
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