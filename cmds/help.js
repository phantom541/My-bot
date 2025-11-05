module.exports = {
  name: 'help',
  aliases: ['menu'],
  description: 'Displays the list of all available commands.',
  async execute(context) {
    const { reply } = context;
    await reply(`*🐉⛓️ 𝙳𝚁Δ𝙶Ø₦ ₣𝙰𝙻𝙻 ⱣⱧΔ₥ŦØ₥ 𝙲𝙾𝙽𝚂𝙾𝙻𝙴 ⛓️🐉*
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
%spawnpack7          → Spawn tiered pack.%claimpack           → Claim pack.
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

**Owner:** 𓂀 𝕰𝖎𝖉𝖔𝖑𝖔𝖓 𝕻𝖚𝖈𝖐 𓂀
**Console Motto:** *“𝘛𝘩𝘦 𝘥𝘳𝘢𝘨𝘰𝘯 𝘪𝘴 𝘯𝘰𝘵 𝘵𝘰 𝘣𝘦 𝘵𝘳𝘢𝘪𝘯𝘦𝘥—𝘪𝘵 𝘪𝘴 𝘵𝘰 𝘣𝘦 𝘧𝘦𝘢𝘳𝘦𝘥.”*

═══▰▰▰▰▰▰▰▰═══
    `);
  },
};
