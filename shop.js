const shop = [
    // Potions
    { id: 1, name: "Health Potion", price: 100, description: "Restores 50 HP to a dragon." },
    { id: 2, name: "XP Potion", price: 500, description: "Gives a dragon 100 XP." },
    { id: 3, name: "Strength Potion", price: 250, description: "Temporarily boosts a dragon's attack in battle." },
    { id: 4, name: "Defense Potion", price: 250, description: "Temporarily boosts a dragon's defense in battle." },

    // Dragon Food
    { id: 5, name: "Fish", price: 50, description: "A tasty treat for your dragon. Increases bond level." },
    { id: 6, name: "Dragon Nip", price: 150, description: "A special herb that dragons love. Greatly increases bond level." },

    // Special Items
    { id: 7, name: "Common Dragon Egg", price: 1000, description: "A common dragon egg. Who knows what will hatch?" },
    { id: 8, name: "Rare Dragon Egg", price: 5000, description: "A rare dragon egg. Might contain a powerful dragon!" },
    { id: 9, name: "Epic Dragon Egg", price: 20000, description: "An epic dragon egg. Only the luckiest trainers find these." },
    { id: 10, name: "Legendary Dragon Egg", price: 100000, description: "A legendary dragon egg. A once-in-a-lifetime find!" },
    { id: 11, name: "Map Fragment", price: 10000, description: "A piece of a mysterious map. Collect them all to unlock a new area." },
    { id: 12, name: "Fire Stone", price: 50000, description: "A stone used to evolve certain fire-type dragons." },
    { id: 13, name: "Water Stone", price: 50000, description: "A stone used to evolve certain water-type dragons." },
    { id: 14, name: "Thunder Stone", price: 50000, description: "A stone used to evolve certain electric-type dragons." },

    // TMs
    { id: 15, name: "TM Fire Blast", price: 75000, description: "Teaches a dragon the move Fire Blast." },
    { id: 16, name: "TM Hydro Pump", price: 75000, description: "Teaches a dragon the move Hydro Pump." },
    { id: 17, name: "TM Thunder", price: 75000, description: "Teaches a dragon the move Thunder." },

    // Capture Tools
    { id: 18, name: "Master Orb", price: 50000, description: "The ultimate capture tool. Can catch any dragon without fail." },
    { id: 19, name: "Ultra Trap", price: 10000, description: "A very effective capture tool." },
    { id: 20, name: "Great Snare", price: 5000, description: "A good capture tool." },
    { id: 21, name: "Dragon Net", price: 1000, description: "A basic capture tool." },

    // Other
    { id: 22, name: "Move Re-roller", price: 25000, description: "Randomly changes one of your dragon's moves. (Owner/Mod only)" },
    { id: 23, name: "Profile Banner 1", price: 10000, description: "A cool banner for your profile." },
    { id: 24, name: "Profile Banner 2", price: 10000, description: "Another cool banner for your profile." },
    { id: 25, name: "Profile Banner 3", price: 10000, description: "A third cool banner for your profile." },

    // More items to reach 30+
    { id: 26, name: "Revive", price: 2000, description: "Revives a fainted dragon with half HP." },
    { id: 27, name: "Max Revive", price: 5000, description: "Revives a fainted dragon with full HP." },
    { id: 28, name: "Escape Rope", price: 500, description: "Instantly escape from a wild dragon battle." },
    { id: 29, name: "Lucky Egg", price: 10000, description: "An item to be held by a dragon. It doubles the XP earned in battle." },
    { id: 30, name: "Amulet Coin", price: 10000, description: "An item to be held by a dragon. It doubles the gold earned from winning battles." },
    { id: 31, name: "Everstone", price: 20000, description: "An item to be held by a dragon. It prevents the dragon from evolving." },

    // Bank Boosters from Nexus Society doc
    { id: 32, name: "Bank Booster +25K", price: 15000, description: "Increases your maximum bank capacity by $25,000." },
    { id: 33, name: "Golden Ticket", price: 100000, description: "A rare ticket that grants access to exclusive features." },
    { id: 34, name: "Time Token", price: 50000, description: "Reduces cooldowns on certain actions." }
];

module.exports = shop;
