const allQuests = [
    // --- Slaying Quests (Tier 1) ---
    { id: 1, title: 'A Rat Problem', description: 'Slay 5 Giant Rats in the tavern cellar.', type: 'slay', target: 'Giant Rat', count: 5, rewards: { gold: 20, xp: 10 } },
    { id: 2, title: 'Goblin Scouts', description: 'Defeat 8 Goblin Scouts near the town bridge.', type: 'slay', target: 'Goblin Scout', count: 8, rewards: { gold: 30, xp: 15 } },
    { id: 3, title: 'Forest Spiders', description: 'Exterminate 10 Forest Spiders from the woods.', type: 'slay', target: 'Forest Spider', count: 10, rewards: { gold: 40, xp: 20 } },
    { id: 4, title: 'Wild Boars', description: 'Hunt 6 Wild Boars that are trampling the farms.', type: 'slay', target: 'Wild Boar', count: 6, rewards: { gold: 50, xp: 25 } },
    { id: 5, title: 'Kobold Pestering', description: 'Deal with 12 Kobolds in the nearby caves.', type: 'slay', target: 'Kobold', count: 12, rewards: { gold: 60, xp: 30 } },

    // --- Gathering Quests (Tier 1) ---
    { id: 6, title: 'Mushroom Foraging', description: 'Gather 10 Cave Mushrooms for the alchemist.', type: 'gather', target: 'Cave Mushroom', count: 10, rewards: { gold: 25, xp: 10 } },
    { id: 7, title: 'Iron for the Smith', description: 'Collect 15 pieces of Iron Ore.', type: 'gather', target: 'Iron Ore', count: 15, rewards: { gold: 45, xp: 20 } },
    { id: 8, title: 'Wolf Pelts', description: 'Bring back 5 Wolf Pelts for the tanner.', type: 'gather', target: 'Wolf Pelt', count: 5, rewards: { gold: 55, xp: 25 } },
    { id: 9, title: 'Medicinal Herbs', description: 'Find 12 Sun-kissed Ferns for the healer.', type: 'gather', target: 'Sun-kissed Fern', count: 12, rewards: { gold: 35, xp: 15 } },
    { id: 10, title: 'Shiny Things', description: 'Collect 20 sparkling river stones for a collector.', type: 'gather', target: 'River Stone', count: 20, rewards: { gold: 20, xp: 10 } },

    // --- Slaying Quests (Tier 2) ---
    { id: 11, title: 'Orc Raiders', description: 'Repel an attack of 10 Orc Raiders from the mountain pass.', type: 'slay', target: 'Orc Raider', count: 10, rewards: { gold: 150, xp: 70 } },
    { id: 12, title: 'Grave Robbers', description: 'Clear out 15 Skeletons from the old graveyard.', type: 'slay', target: 'Skeleton', count: 15, rewards: { gold: 120, xp: 60 } },
    { id: 13, title: 'Harpy Nuisance', description: 'Slay 8 Harpies from the coastal cliffs.', type: 'slay', target: 'Harpy', count: 8, rewards: { gold: 200, xp: 90 } },
    { id: 14, title: 'Troll Under the Bridge', description: 'Defeat the fearsome Bridge Troll.', type: 'slay', target: 'Bridge Troll', count: 1, rewards: { gold: 300, xp: 150 } },
    { id: 15, title: 'Basilisk Hunt', description: 'Hunt the dangerous Basilisk in the petrified forest.', type: 'slay', target: 'Basilisk', count: 1, rewards: { gold: 400, xp: 200 } },

    // --- Gathering Quests (Tier 2) ---
    { id: 16, title: 'Dragon Scales', description: 'Carefully collect 5 scales from a wild Fire Drake.', type: 'gather', target: 'Fire Drake Scale', count: 5, rewards: { gold: 250, xp: 100 } },
    { id: 17, title: 'Mithril Vein', description: 'Mine 10 pieces of rare Mithril Ore.', type: 'gather', target: 'Mithril Ore', count: 10, rewards: { gold: 350, xp: 120 } },
    { id: 18, title: 'Griffon Feathers', description: 'Gather 3 tail feathers from a wild Griffon.', type: 'gather', target: 'Griffon Feather', count: 3, rewards: { gold: 280, xp: 110 } },
    { id: 19, title: 'Crystal Shards', description: 'Collect 20 Mana Crystals from the Crystal Caves.', type: 'gather', target: 'Mana Crystal', count: 20, rewards: { gold: 180, xp: 80 } },
    { id: 20, title: 'Ancient Tomes', description: 'Recover 2 Ancient Tomes from the ruined library.', type: 'gather', target: 'Ancient Tome', count: 2, rewards: { gold: 220, xp: 95 } },

    // --- Exploration & Milestone Quests ---
    { id: 21, title: 'Reach for the Sky', description: 'Reach player level 10.', type: 'milestone', target: 'level', count: 10, rewards: { gold: 500, xp: 0 } },
    { id: 22, title: 'The First Den', description: 'Send a dragon to your den for the first time.', type: 'milestone', target: 'sendtoden', count: 1, rewards: { gold: 100, xp: 50 } },
    { id: 23, title: 'A New Nickname', description: 'Give one of your dragons a nickname.', type: 'milestone', target: 'nickname', count: 1, rewards: { gold: 50, xp: 20 } },
    { id: 24, title: 'The Explorer', description: 'Discover the Whispering Woods.', type: 'explore', target: 'Whispering Woods', count: 1, rewards: { gold: 150, xp: 50 } },
    { id: 25, title: 'Deep Dive', description: 'Venture into the Echoing Caverns.', type: 'explore', target: 'Echoing Caverns', count: 1, rewards: { gold: 200, xp: 75 } },
    { id: 26, title: 'Master of the Forge', description: 'Craft your first item.', type: 'milestone', target: 'craft', count: 1, rewards: { gold: 100, xp: 40 } },
    { id: 27, title: 'Team Builder', description: 'Assemble a party of 6 dragons.', type: 'milestone', target: 'party_full', count: 1, rewards: { gold: 300, xp: 100 } },
    { id: 28, title: 'First Trade', description: 'Successfully trade a dragon with another player.', type: 'milestone', target: 'trade', count: 1, rewards: { gold: 250, xp: 80 } },
    { id: 29, title: 'Guild Initiate', description: 'Join or create a guild.', type: 'milestone', target: 'guild_join', count: 1, rewards: { gold: 400, xp: 120 } },
    { id: 30, title: 'Tournament Hopeful', description: 'Enter your first tournament.', type: 'milestone', target: 'tournament_join', count: 1, rewards: { gold: 200, xp: 70 } },

    // --- Slaying Quests (Tier 3) ---
    { id: 31, title: 'Desert Terror', description: 'Slay 5 Sand Wurms in the Great Desert.', type: 'slay', target: 'Sand Wurm', count: 5, rewards: { gold: 500, xp: 250 } },
    { id: 32, title: 'Swamp Thing', description: 'Defeat the Hydra in the Sunken Swamp.', type: 'slay', target: 'Hydra', count: 1, rewards: { gold: 800, xp: 400 } },
    { id: 33, title: 'Ice Giants', description: 'Vanquish 3 Frost Giants from the Glacial Peaks.', type: 'slay', target: 'Frost Giant', count: 3, rewards: { gold: 700, xp: 350 } },
    { id: 34, title: 'Minotaur\'s Maze', description: 'Hunt the Minotaur Lord in its labyrinth.', type: 'slay', target: 'Minotaur Lord', count: 1, rewards: { gold: 1000, xp: 500 } },
    { id: 35, title: 'Beholder\'s Gaze', description: 'Destroy the Beholder in the Underdark.', type: 'slay', target: 'Beholder', count: 1, rewards: { gold: 1200, xp: 600 } },

    // --- Gathering Quests (Tier 3) ---
    { id: 36, title: 'Phoenix Ashes', description: 'Collect a pinch of Phoenix Ashes from a reborn Phoenix.', type: 'gather', target: 'Phoenix Ashes', count: 1, rewards: { gold: 1500, xp: 500 } },
    { id: 37, title: 'Starlight Petal', description: 'Gather 5 Starlight Petals that bloom only at night.', type: 'gather', target: 'Starlight Petal', count: 5, rewards: { gold: 600, xp: 280 } },
    { id: 38, title: 'Leviathan\'s Pearl', description: 'Find a giant pearl from a deep-sea Leviathan.', type: 'gather', target: 'Leviathan Pearl', count: 1, rewards: { gold: 2000, xp: 700 } },
    { id: 39, title: 'Shadow Essence', description: 'Collect 10 vials of Shadow Essence from the Shadow Realm.', type: 'gather', target: 'Shadow Essence', count: 10, rewards: { gold: 800, xp: 350 } },
    { id: 40, title: 'Sunstone', description: 'Retrieve a legendary Sunstone from the Sky Temple.', type: 'gather', target: 'Sunstone', count: 1, rewards: { gold: 1800, xp: 650 } },

    // --- More Slaying Quests ---
    { id: 41, title: 'Slime Cleanup', description: 'Destroy 20 Corrosive Slimes in the sewers.', type: 'slay', target: 'Corrosive Slime', count: 20, rewards: { gold: 100, xp: 50 } },
    { id: 42, title: 'Gargoyle Guardians', description: 'Defeat 10 Stone Gargoyles atop the old castle.', type: 'slay', target: 'Stone Gargoyle', count: 10, rewards: { gold: 250, xp: 120 } },
    { id: 43, title: 'Wraith Haunting', description: 'Banish 8 Wraiths from the haunted mansion.', type: 'slay', target: 'Wraith', count: 8, rewards: { gold: 350, xp: 180 } },
    { id: 44, title: 'Lizardfolk Ambush', description: 'Survive an ambush of 15 Lizardfolk warriors.', type: 'slay', target: 'Lizardfolk Warrior', count: 15, rewards: { gold: 280, xp: 140 } },
    { id: 45, title: 'Manticore\'s Lair', description: 'Slay the Manticore that preys on travelers.', type: 'slay', target: 'Manticore', count: 1, rewards: { gold: 600, xp: 300 } },
    { id: 46, title: 'Wyvern in the Peaks', description: 'Hunt down a rogue Wyvern.', type: 'slay', target: 'Wyvern', count: 1, rewards: { gold: 750, xp: 380 } },
    { id: 47, title: 'Elemental Fury', description: 'Subdue 5 raging Fire Elementals.', type: 'slay', target: 'Fire Elemental', count: 5, rewards: { gold: 450, xp: 220 } },
    { id: 48, title: 'Djinn\'s Wish', description: 'Defeat a powerful Djinn and seal it.', type: 'slay', target: 'Djinn', count: 1, rewards: { gold: 1500, xp: 750 } },
    { id: 49, title: 'Vampire\'s Curse', description: 'Slay the Vampire Lord in his castle.', type: 'slay', target: 'Vampire Lord', count: 1, rewards: { gold: 2000, xp: 1000 } },
    { id: 50, title: 'Lich\'s Phylactery', description: 'Destroy the ancient Lich and its phylactery.', type: 'slay', target: 'Lich', count: 1, rewards: { gold: 3000, xp: 1500 } },

    // --- More Gathering Quests ---
    { id: 51, title: 'Spider Silk', description: 'Gather 30 bundles of Giant Spider Silk.', type: 'gather', target: 'Spider Silk', count: 30, rewards: { gold: 120, xp: 60 } },
    { id: 52, title: 'Gorgon\'s Blood', description: 'Collect a vial of Gorgon\'s Blood.', type: 'gather', target: 'Gorgon Blood', count: 1, rewards: { gold: 400, xp: 200 } },
    { id: 53, title: 'Roc\'s Egg', description: 'Steal a giant egg from a Roc\'s nest.', type: 'gather', target: 'Roc Egg', count: 1, rewards: { gold: 550, xp: 280 } },
    { id: 54, title: 'Obsidian Shards', description: 'Collect 25 Obsidian Shards from the volcano.', type: 'gather', target: 'Obsidian Shard', count: 25, rewards: { gold: 300, xp: 150 } },
    { id: 55, title: 'Moon Dust', description: 'Gather a pouch of Moon Dust from the highest peak.', type: 'gather', target: 'Moon Dust', count: 1, rewards: { gold: 900, xp: 450 } },
    { id: 56, title: 'Ectoplasm', description: 'Collect 15 samples of Ectoplasm from ghosts.', type: 'gather', target: 'Ectoplasm', count: 15, rewards: { gold: 280, xp: 140 } },
    { id: 57, title: 'Adamantite Ore', description: 'Mine 5 pieces of the legendary Adamantite Ore.', type: 'gather', target: 'Adamantite Ore', count: 5, rewards: { gold: 1200, xp: 600 } },
    { id: 58, title: 'Dragon\'s Heart', description: 'Retrieve the heart of a fallen Ancient Dragon.', type: 'gather', target: 'Dragon Heart', count: 1, rewards: { gold: 5000, xp: 2500 } },
    { id: 59, title: 'Fairy Wings', description: 'Collect 10 pairs of sparkling Fairy Wings.', type: 'gather', target: 'Fairy Wing', count: 10, rewards: { gold: 400, xp: 200 } },
    { id: 60, title: 'Aetherium Crystals', description: 'Gather 5 Aetherium Crystals from a meteor crash site.', type: 'gather', target: 'Aetherium Crystal', count: 5, rewards: { gold: 1000, xp: 500 } },

    // --- More Milestone & Exploration Quests ---
    { id: 61, title: 'Dungeon Delver', description: 'Clear your first dungeon.', type: 'milestone', target: 'dungeon_clear', count: 1, rewards: { gold: 1000, xp: 300 } },
    { id: 62, title: 'Boss Slayer', description: 'Participate in defeating a world boss.', type: 'milestone', target: 'boss_slay', count: 1, rewards: { gold: 2000, xp: 500 } },
    { id: 63, title: 'Master Trader', description: 'Complete 10 successful trades.', type: 'milestone', target: 'trade', count: 10, rewards: { gold: 500, xp: 150 } },
    { id: 64, title: 'Guild Champion', description: 'Help your guild reach level 5.', type: 'milestone', target: 'guild_level', count: 5, rewards: { gold: 1500, xp: 400 } },
    { id: 65, title: 'Grand Master', description: 'Reach player level 50.', type: 'milestone', target: 'level', count: 50, rewards: { gold: 5000, xp: 0 } },
    { id: 66, title: 'Volcano Voyager', description: 'Explore the inside of the fiery volcano.', type: 'explore', target: 'Volcano', count: 1, rewards: { gold: 800, xp: 400 } },
    { id: 67, title: 'Underdark Survivor', description: 'Navigate the treacherous Underdark and return.', type: 'explore', target: 'Underdark', count: 1, rewards: { gold: 1200, xp: 600 } },
    { id: 68, title: 'Sky Temple Pilgrim', description: 'Reach the legendary Sky Temple.', type: 'explore', target: 'Sky Temple', count: 1, rewards: { gold: 1500, xp: 750 } },
    { id: 69, title: 'Collector', description: 'Collect 20 unique cards.', type: 'milestone', target: 'cards_collect', count: 20, rewards: { gold: 500, xp: 200 } },
    { id: 70, title: 'Dragon Master', description: 'Train a dragon to level 100.', type: 'milestone', target: 'dragon_level', count: 100, rewards: { gold: 10000, xp: 0 } },

    // --- Even More Quests (for a total of 100) ---
    { id: 71, title: 'Centaur Alliance', description: 'Deliver a peace treaty to the Centaur tribe.', type: 'delivery', target: 'Centaur Tribe', count: 1, rewards: { gold: 300, xp: 150 } },
    { id: 72, title: 'Mermaid\'s Song', description: 'Listen to the Mermaid Queen\'s song in the Sunken City.', type: 'explore', target: 'Sunken City', count: 1, rewards: { gold: 700, xp: 350 } },
    { id: 73, title: 'Gryphon Taming', description: 'Successfully tame a wild Gryphon.', type: 'tame', target: 'Gryphon', count: 1, rewards: { gold: 1000, xp: 500 } },
    { id: 74, title: 'Phoenix Rising', description: 'Witness the rebirth of a Phoenix.', type: 'milestone', target: 'phoenix_rebirth', count: 1, rewards: { gold: 1500, xp: 750 } },
    { id: 75, title: 'Shadow Veil', description: 'Travel through the Shadow Realm.', type: 'explore', target: 'Shadow Realm', count: 1, rewards: { gold: 900, xp: 450 } },
    { id: 76, title: 'Elemental Harmony', description: 'Bring peace to warring elemental spirits.', type: 'diplomacy', target: 'Elemental Spirits', count: 1, rewards: { gold: 1200, xp: 600 } },
    { id: 77, title: 'The World Tree', description: 'Find the hidden location of the World Tree.', type: 'explore', target: 'World Tree', count: 1, rewards: { gold: 2000, xp: 1000 } },
    { id: 78, title: 'Colossal Problem', description: 'Defeat a Colossal Beast.', type: 'slay', target: 'Colossal Beast', count: 1, rewards: { gold: 5000, xp: 2500 } },
    { id: 79, title: 'Master of Disguise', description: 'Infiltrate the Thieves Guild.', type: 'stealth', target: 'Thieves Guild', count: 1, rewards: { gold: 600, xp: 300 } },
    { id: 80, title: 'The Great Library', description: 'Read a book from the Great Library of Alexandria.', type: 'explore', target: 'Great Library', count: 1, rewards: { gold: 400, xp: 200 } },
    { id: 81, title: 'Angel\'s Tear', description: 'Find a tear from a weeping angel statue.', type: 'gather', target: 'Angel Tear', count: 1, rewards: { gold: 1800, xp: 900 } },
    { id: 82, title: 'Demon\'s Contract', description: 'Trick a demon into a favorable contract.', type: 'diplomacy', target: 'Demon', count: 1, rewards: { gold: 2500, xp: 1250 } },
    { id: 83, title: 'Titan\'s Strength', description: 'Win a wrestling match against a Titan.', type: 'challenge', target: 'Titan', count: 1, rewards: { gold: 3500, xp: 1750 } },
    { id: 84, title: 'Gods\' Favor', description: 'Receive a blessing from a deity.', type: 'milestone', target: 'deity_blessing', count: 1, rewards: { gold: 5000, xp: 2500 } },
    { id: 85, title: 'The Void', description: 'Survive a trip to the Void.', type: 'explore', target: 'The Void', count: 1, rewards: { gold: 10000, xp: 5000 } },
    { id: 86, title: 'Chimera Core', description: 'Slay a Chimera and extract its core.', type: 'slay', target: 'Chimera', count: 1, rewards: { gold: 950, xp: 480 } },
    { id: 87, title: 'Dryad\'s Gift', description: 'Help a Dryad protect her forest.', type: 'escort', target: 'Dryad', count: 1, rewards: { gold: 350, xp: 180 } },
    { id: 88, 'title': 'Golem Heart', 'description': 'Retrieve the heart of an ancient stone golem.', 'type': 'gather', 'target': 'Golem Heart', 'count': 1, 'rewards': { 'gold': 750, 'xp': 380 } },
    { id: 89, 'title': 'Jungle Ruins', 'description': 'Explore the lost ruins deep in the jungle.', 'type': 'explore', 'target': 'Jungle Ruins', 'count': 1, 'rewards': { 'gold': 500, 'xp': 250 } },
    { id: 90, 'title': 'Kraken\'s Ink', 'description': 'Gather a vial of ink from a Kraken.', 'type': 'gather', 'target': 'Kraken Ink', 'count': 1, 'rewards': { 'gold': 1300, 'xp': 650 } },
    { id: 91, 'title': 'Naga Caverns', 'description': 'Clear the Naga from their cavernous lair.', 'type': 'slay', 'target': 'Naga', 'count': 20, 'rewards': { 'gold': 650, 'xp': 330 } },
    { id: 92, 'title': 'Ogre Clan', 'description': 'Defeat the Ogre chieftain and his clan.', 'type': 'slay', 'target': 'Ogre Chieftain', 'count': 1, 'rewards': { 'gold': 450, 'xp': 230 } },
    { id: 93, 'title': 'Pixie Dust', 'description': 'Collect 25 pouches of Pixie Dust.', 'type': 'gather', 'target': 'Pixie Dust', 'count': 25, 'rewards': { 'gold': 200, 'xp': 100 } },
    { id: 94, 'title': 'Sphinx\'s Riddle', 'description': 'Answer the Sphinx\'s riddle correctly.', 'type': 'challenge', 'target': 'Sphinx', 'count': 1, 'rewards': { 'gold': 1000, 'xp': 500 } },
    { id: 95, 'title': 'Unicorn\'s Horn', 'description': 'Receive a shard of a Unicorn\'s horn as a gift.', 'type': 'milestone', 'target': 'Unicorn Horn Shard', 'count': 1, 'rewards': { 'gold': 2200, 'xp': 1100 } },
    { id: 96, 'title': 'Yeti Fur', 'description': 'Collect 10 tufts of Yeti fur.', 'type': 'gather', 'target': 'Yeti Fur', 'count': 10, 'rewards': { 'gold': 850, 'xp': 430 } },
    { id: 97, 'title': 'Zombie Horde', 'description': 'Survive a night against a horde of 50 zombies.', 'type': 'survive', 'target': 'Zombie', 'count': 50, 'rewards': { 'gold': 1000, 'xp': 500 } },
    { id: 98, 'title': 'Treasure Hunter', 'description': 'Find a hidden pirate treasure.', 'type': 'explore', 'target': 'Pirate Treasure', 'count': 1, 'rewards': { 'gold': 2500, 'xp': 800 } },
    { id: 99, 'title': 'Master Enchanter', 'description': 'Enchant an item with a powerful spell.', 'type': 'milestone', 'target': 'enchant', 'count': 1, 'rewards': { 'gold': 700, 'xp': 350 } },
    { id: 100, 'title': 'The Final Frontier', 'description': 'Reach the edge of the known world.', 'type': 'explore', 'target': 'World Edge', 'count': 1, 'rewards': { 'gold': 10000, 'xp': 5000 } }
];

module.exports = {
  name: 'quests',
  description: 'View and complete quests.',
  async execute(context) {
    const { args, reply } = context;
    const page = parseInt(args[0]) || 1;
    const questsPerPage = 10;

    // In a real implementation, you would filter quests based on player's progress
    const availableQuests = allQuests;

    const totalPages = Math.ceil(availableQuests.length / questsPerPage);
    if (page < 1 || page > totalPages) {
      return reply(`Invalid page number. Please choose a page between 1 and ${totalPages}.`);
    }

    const startIndex = (page - 1) * questsPerPage;
    const questsToShow = availableQuests.slice(startIndex, startIndex + questsPerPage);

    let message = `📜 *Available Quests (Page ${page}/${totalPages})* 📜\n\n`;
    questsToShow.forEach(quest => {
      message += `*${quest.id}. ${quest.title}*\n`;
      message += `> ${quest.description}\n`;
      let rewardsStr = [];
      if (quest.rewards.gold) rewardsStr.push(`${quest.rewards.gold} Gold`);
      if (quest.rewards.xp) rewardsStr.push(`${quest.rewards.xp} XP`);
      if (quest.rewards.items) rewardsStr.push(quest.rewards.items.join(', '));
      message += `> *Rewards:* ${rewardsStr.join(', ')}\n\n`;
    });

    message += `Use \`%quests <page_number>\` to see more.`;

    await reply(message);
  },
};
