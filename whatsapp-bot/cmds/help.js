module.exports = {
  name: 'help',
  aliases: ['menu'],
  description: 'Displays the list of all available commands.',
  async execute(context) {
    const { reply, OWNER_NAME } = context;
    await reply(`
*Dragon Bot Commands*

*General:*
%start-hunt - Start your adventure and choose a dragon.
%guide <command> - Get a detailed guide for a command.
%profile [@user] - View your or another user's profile.
%leaderboard - View the richest players.
%nickname <dragon_index> <new_name> - Give your dragon a nickname.
%mods - View the list of bot moderators.
%daily - Get a daily reward.
%quests - View and complete quests.
%dex <dragon_name_or_id> - View DragonDex information.
%craft <item_name> - Craft new items.
%map - View the world map.
%achievements - View your achievements.

*Economy:*
%balance - Check gold & bank
%deposit <amount> - Deposit gold
%withdraw <amount> - Withdraw gold
%mart - View items to buy
%buy <item> - Buy items from the shop.
%slot <amount> - Gamble gold (max 1,000,000 at once)
%market - Access the player market.

*Dragons:*
%spawn - Spawn a wild dragon (5m cooldown, 1m exclusive catch).
%catch <tool> - Catch the spawned wild dragon
%party - View your active dragons (max 6)
%den - View your dragon den (storage)
%sendtoden <dragon_index> - Move a party dragon to den
%sendtoparty <den_index> - Move a den dragon to party (max 6)
%dragon <name_or_id> - View dragon summary

*Training & Battles:*
%train - Train your dragons (cooldown 15m)
%attack - Attack a spawned wild dragon
%battle @user - Challenge another player
%battle fight <1-4> - Use a move in battle
%remove <move_name> - Remove a move from your dragon to learn a new one.
%dungeon - Enter a dungeon.
%boss - Fight the global boss.

*Dungeons:*
%dungeons - View available dungeons.
%spawn-dungeon <name> - Spawn a dungeon (Admin only).
%enter-dungeon - Enter the active dungeon.
%dungeon start - Start the dungeon crawl (Party leader only).

*Colossal Beasts:*
%beasts - List the Colossal Beasts.
%activate-scenario <name> - Spawn a Colossal Beast (Admin only).
%challenge-beast - Fight the active Colossal Beast.

*Tournaments:*
%tournament create <name> - Create a new tournament.
%tournament join - Join the active tournament.
%tournament start - Start the tournament (organizer only).
%tournament reportwin - Report your win in a tournament match.

*Guilds:*
%guilds - List all guilds.
%guild create <name> - Create a new guild (costs 10000 gold).
%guild join <name> - Request to join a guild.
%guild info [name] - View info about your guild or another.
%guild accept @user - Accept a user's request to join (Master only).
%guild manage <promote|demote|kick> @user - Manage guild members (Leaders only).
%guild slogan <new_slogan> - Change your guild's slogan (Master only).
%guild deposit <amount> - Deposit gold into the guild treasury.
%guild withdraw <amount> - Withdraw gold from the treasury (Master only).

*Gifting & Trading:*
%givedragon <dragon_index> @user - Give a dragon to another player.
%trade @user <your_dragon_index> <their_dragon_index> - Propose a trade.
%trade accept - Accept a trade proposal.
%trade decline - Decline a trade proposal.

*Fun Commands:*
%compliment @user
%insult @user
%flirt
%shayari
%goodnight
%roseday
%character @user
%wasted @user
%ship @user
%simp @user
%stupid @user [text]

*Card Collecting:*
%spawncard [--tier=<tier>] - Spawn a random card (optionally of a specific tier, mods only).
%claim - Claim a spawned card (costs 100 gold).
%buypack - Buy a pack of 3 random cards for 300 gold.
%cards - View your card collection (deck and holder).
%spawnpack6 - Spawn a 6-card pack with guaranteed high-tier cards.
%spawnpack7 - Spawn a 7-card pack with one card from each tier.
%claimpack - Claim a spawned card pack.
%movetodeck <holder_index> - Move a card from your holder to your deck.
%movetoholder <deck_index> - Move a card from your deck to your holder.
%givecard <deck|holder> <card_index> @user - Give a card to another player.

*Admin:*
%ban @user - Ban a user from using the bot.
%unban @user - Unban a user.
%kick @user - Kick a user from the group.
%wild on/off - Enable/disable wild spawns (mods only)
%huntdragon <Dragon Name> <Level> - Spawn a specific high-level dragon.
%givegold @user <amount> - Give gold to user (owner only)
%re-roll <dragon_index> - Re-roll a dragon's moves (owner/mod only).
%environments - View the list of battle environments.

*Owner:*
%addsudo @user - Promote a user to mod.
%delsudo @user - Demote a mod.
%addpower @user - Add a power user.
%delpower @user - Remove a power user.
%mode <public/private> - Set the bot mode.
%clearsession - Clear the bot's session file.
%setpp <reply to image> - Set the bot's profile picture.
%autotyping <on/off> - Enable or disable auto typing.
%autoread <on/off> - Enable or disable auto read.
%antidelete <on/off> - Enable or disable anti-delete.
%autoreact <on/off> - Enable or disable auto-react.

*Group Admin (Bot must be admin):*
%modes <feature> <on|off> - Enable or disable features for this group.
%open - Open the group for all members to send messages.
%close - Close the group for only admins to send messages.

*Downloader:*
%play <song_name> - Play a song from YouTube.
%youtube <mp3/mp4> <url> - Download from YouTube.
%instagram <url> - Download from Instagram.
%facebook <url> - Download from Facebook.
%tiktok <url> - Download from TikTok.

Owner: ${OWNER_NAME}
        `);
  },
};
