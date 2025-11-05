module.exports = {
  name: 'guide',
  description: 'Provides detailed guides for various bot commands.',
  async execute(context) {
    const { reply, args } = context;
    const guideName = args[0]?.toLowerCase();
    if (!guideName) {
        return reply('*Available Guides:*\n- start-hunt\n- battle\n- trade\n- remove\n- cards\n- givecard\n- modes\n- spawn\n- tournament\n- guild\n- dungeons\n- beasts');
    }

    switch (guideName) {
        case 'start-hunt':
            await reply(
`*Guide: %start-hunt*
This command starts your adventure as a dragon trainer.
- Use \`%start-hunt\` to see a list of available starter dragons.
- To see more details about a specific dragon, use \`%start-hunt --<dragon_name>\` (e.g., \`%start-hunt --Terrible_Terror\`).
- To choose your starter, use \`%start-hunt --<dragon_name> --choose\` (e.g., \`%start-hunt --Terrible_Terror --choose\`).`
            );
            break;
        case 'battle':
            await reply(
`*Guide: %battle*
This command is used for all battles.
- To battle a wild dragon that has spawned, use \`%attack\`.
- To challenge another player, use \`%battle @user\`.
- Once in a battle, use \`%battle fight <1-4>\` to use one of your dragon's moves.`
            );
            break;
        case 'trade':
            await reply(
`*Guide: %trade*
This command allows you to trade dragons with other players.
- To propose a trade, use \`%trade @user <your_dragon_index> <their_dragon_index>\`. The indices are from your and their party list.
- The other player must then use \`%trade accept\` or \`%trade decline\`.`
            );
            break;
        case 'remove':
            await reply(
`*Guide: %remove*
This command allows you to remove a move from your dragon's moveset to make space for a new one.
- Use \`%remove <move_name>\`. This will affect the first dragon in your party.
- Make sure to type the move name exactly as it appears in the \`%dragon\` command.`
            );
            break;
        case 'cards':
            await reply(
`*Guide: Card Collecting*
The bot features a vast collection of cards, including Dragon cards from Yu-Gi-Oh! and animated GIFs from the world of anime.

*Getting Cards:*
- *Spawning:* Use \`%spawncard\` to make a new card appear in the chat.
- *Claiming:* When a card appears (either from \`%spawncard\` or an automatic "wild card" spawn), use \`%claim\` to add it to your collection. This costs 100 gold.
- *Buying Packs:* Use \`%buypack\` to purchase a pack of 3 random cards/GIFs for 300 gold.

*Managing Your Collection:*
- Your collection is split into a \`deck\` (max 12 cards) and a \`holder\` (unlimited storage).
- Use \`%cards\` to view your deck and holder.
- Use \`%movetodeck <holder_index>\` and \`%movetoholder <deck_index>\` to organize your cards.`
            );
            break;
        case 'givecard':
            await reply(
`*Guide: %givecard*
- This command allows you to give a card to another player.
- Usage: \`%givecard <deck|holder> <card_index> @user\`
- Example: \`%givecard deck 3 @user\` to give the 3rd card from your deck.`
            );
            break;
        case 'modes':
            await reply(
`*Guide: %modes*
This command is for group admins to configure the bot's features in their group.
- Usage: \`%modes <feature> <on|off>\`
- Available features:
  - \`antilink\`: Automatically deletes messages with links and removes the sender.
  - \`slot\`: Enables or disables the \`%slot\` command in the group.
  - \`wild\`: Enables or disables automatic wild dragon spawns.
  - \`wildcard\`: Enables or disables automatic card/GIF spawns.`
            );
            break;
        case 'spawn':
            await reply(
`*Guide: %spawn*
This command spawns a wild dragon.
- There is a 5-minute cooldown for this command.
- When you spawn a dragon, you have a 1-minute exclusive window to catch it.
- After 1 minute, the dragon becomes available for anyone to catch.
- The dragon will fly away after 3 minutes if it's not caught.`
            );
            break;
        case 'tournament':
            await reply(
`*Guide: Tournaments*
This guide explains how to participate in and run a tournament.

*For Players:*
- To join an open tournament, use \`%tournament join\`.
- After you play your match against an opponent, the winner must use \`%tournament reportwin\` to have the result recorded.

*For Organizers (Mods/Owners):*
1. *Create:* Use \`%tournament create <Tournament Name>\` to start a new tournament and open registration.
2. *Start:* Once you are ready to begin, use \`%tournament start\`. This closes registration, shuffles the players, and announces the first round of matches.
3. *Run:* The tournament will run automatically as winners report their victories. The bot will announce new rounds and the final champion.`
            );
            break;
        case 'guild':
            await reply(
`*Guide: Guilds*
Guilds are communities of players who can work together, access special features, and compete for glory.

*Finding & Joining:*
- \`%guilds\`: See a list of all existing guilds.
- \`%guild join <Guild Name>\`: Request to join a guild.
- \`%guild info [Guild Name]\`: View detailed stats for your guild or another.

*Leveling & Perks:*
- Guilds earn XP from member activities like winning battles and clearing dungeons.
- As your guild levels up, it will advance through Tiers (Bronze, Silver, Gold, etc.).
- Higher tiers provide better perks, such as an XP Boost and a Loot Bonus for all members!

*Management & Roles:*
- \`%guild create <name>\`: Found a new guild for 10,000 gold. You become the Guild Master.
- \`%guild slogan <text>\`: As Guild Master, set your guild's public slogan.
- \`%guild accept @user\`: Guild Master accepts a join request.
- \`%guild manage promote @user\`: Guild Master promotes a member to Officer, or an Officer to Vice Leader.
- \`%guild manage demote @user\`: Guild Master demotes a Vice Leader or Officer.
- \`%guild manage kick @user\`: Remove a member from the guild (Leaders only).

*Treasury:*
- \`%guild deposit <amount>\`: Any member can deposit gold into the guild's treasury.
- \`%guild withdraw <amount>\`: Only the Guild Master can withdraw gold from the treasury.`
            );
            break;
        case 'dungeons':
            await reply(
`*Guide: Dungeons*
Dungeons are challenging, multi-floor battles for guild members.

*How it Works:*
1. An admin must first spawn a dungeon with \`%spawn-dungeon <Dungeon Name>\`.
2. Once spawned, all members of a guild can form a party by using \`%enter-dungeon\`.
3. The first player to enter is the party leader and can start the crawl with \`%dungeon start\`.
4. The party will then fight through multiple floors of monsters.
5. If the party clears the final floor, everyone in the party receives a reward!`
            );
            break;
        case 'beasts':
            await reply(
`*Guide: Colossal Beasts*
These are world bosses that can be spawned by an admin.

*How it Works:*
1. An admin uses \`%activate-scenario <Beast Name>\` to summon a beast.
2. The beast's arrival is announced globally. It will only remain for 15 minutes.
3. Any player can fight it using \`%challenge-beast\`.
4. These are extremely difficult 1-on-1 battles.
5. The first player to defeat the beast tames it permanently and receives a massive reward!`
            );
            break;
        default:
            await reply('Invalid guide name. Use `%guide` to see the list of available guides.');
            break;
    }
  },
};
