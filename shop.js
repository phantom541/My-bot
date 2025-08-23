const shop = {
    // Potions
    'health_potion': { name: "Health Potion", price: 100, description: "Restores 50 HP to a dragon." },
    'xp_potion': { name: "XP Potion", price: 500, description: "Gives a dragon 100 XP." },
    'strength_potion': { name: "Strength Potion", price: 250, description: "Temporarily boosts a dragon's attack in battle." },
    'defense_potion': { name: "Defense Potion", price: 250, description: "Temporarily boosts a dragon's defense in battle." },

    // Dragon Food
    'fish': { name: "Fish", price: 50, description: "A tasty treat for your dragon. Increases bond level." },
    'dragon_nip': { name: "Dragon Nip", price: 150, description: "A special herb that dragons love. Greatly increases bond level." },

    // Special Items
    'common_egg': { name: "Common Dragon Egg", price: 1000, description: "A common dragon egg. Who knows what will hatch?" },
    'rare_egg': { name: "Rare Dragon Egg", price: 5000, description: "A rare dragon egg. Might contain a powerful dragon!" },
    'epic_egg': { name: "Epic Dragon Egg", price: 20000, description: "An epic dragon egg. Only the luckiest trainers find these." },
    'legendary_egg': { name: "Legendary Dragon Egg", price: 100000, description: "A legendary dragon egg. A once-in-a-lifetime find!" },
    'map_fragment': { name: "Map Fragment", price: 10000, description: "A piece of a mysterious map. Collect them all to unlock a new area." },
    'fire_stone': { name: "Fire Stone", price: 50000, description: "A stone used to evolve certain fire-type dragons." },
    'water_stone': { name: "Water Stone", price: 50000, description: "A stone used to evolve certain water-type dragons." },
    'thunder_stone': { name: "Thunder Stone", price: 50000, description: "A stone used to evolve certain electric-type dragons." },

    // TMs
    'tm_fire_blast': { name: "TM Fire Blast", price: 75000, description: "Teaches a dragon the move Fire Blast." },
    'tm_hydro_pump': { name: "TM Hydro Pump", price: 75000, description: "Teaches a dragon the move Hydro Pump." },
    'tm_thunder': { name: "TM Thunder", price: 75000, description: "Teaches a dragon the move Thunder." },

    // Capture Tools
    'masterorb': { name: "Master Orb", price: 50000, description: "The ultimate capture tool. Can catch any dragon without fail." },
    'ultratrap': { name: "Ultra Trap", price: 10000, description: "A very effective capture tool." },
    'greatsnare': { name: "Great Snare", price: 5000, description: "A good capture tool." },
    'dragnet': { name: "Dragon Net", price: 1000, description: "A basic capture tool." },

    // Other
    'move_reroller': { name: "Move Re-roller", price: 25000, description: "Randomly changes one of your dragon's moves. (Owner/Mod only)" },
    'profile_banner_1': { name: "Profile Banner 1", price: 10000, description: "A cool banner for your profile." },
    'profile_banner_2': { name: "Profile Banner 2", price: 10000, description: "Another cool banner for your profile." },
    'profile_banner_3': { name: "Profile Banner 3", price: 10000, description: "A third cool banner for your profile." },

    // More items to reach 30+
    'revive': { name: "Revive", price: 2000, description: "Revives a fainted dragon with half HP." },
    'max_revive': { name: "Max Revive", price: 5000, description: "Revives a fainted dragon with full HP." },
    'escape_rope': { name: "Escape Rope", price: 500, description: "Instantly escape from a wild dragon battle." },
    'lucky_egg': { name: "Lucky Egg", price: 10000, description: "An item to be held by a dragon. It doubles the XP earned in battle." },
    'amulet_coin': { name: "Amulet Coin", price: 10000, description: "An item to be held by a dragon. It doubles the gold earned from winning battles." },
    'everstone': { name: "Everstone", price: 20000, description: "An item to be held by a dragon. It prevents the dragon from evolving." }
};

module.exports = shop;
