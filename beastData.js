const beasts = [
    {
        id: 1,
        name: "Lycagon the Nightslayer",
        type: "Shadow",
        hp: 12000,
        atk: 400,
        difficulty: "Colossal",
        environment: "Night Forest",
        passive: "Dark Aura",
        passiveDesc: "Drains 5% HP per turn from enemies.",
        weakness: "Light",
        imageUrl: "https://images.unsplash.com/photo-1575382999375-a6c69b84e649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxMeWNhZ29uJTIwdGhlJTIwTmlnaHRzbGF5ZXIlMjBmYW50YXN5JTIwYXJ0fGVufDB8fHx8MTc1NjY1NDM0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        moves: [
            { name: "Moon Claw", damage: 150, type: "Shadow" },
            { name: "Lunar Drain", damage: 120, type: "Shadow" }, // Special effect: heals
            { name: "Feral Leap", damage: 100, type: "Metal" }, // Special effect: stuns
            { name: "Silent Howl", damage: 80, type: "Wind" }, // Special effect: debuffs
            { name: "Ghost Slash", damage: 180, type: "Shadow" }, // Special effect: ignores armor
            { name: "Crescent Barrage", damage: 50, type: "Metal" }, // Special effect: multi-hit
        ]
    },
    {
        id: 2,
        name: "Ctarnidd of the Abyss",
        type: "Water",
        hp: 15000,
        atk: 380,
        difficulty: "Colossal",
        environment: "Sunken Temple",
        passive: "Water Skin",
        passiveDesc: "30% damage resistance.",
        weakness: "Fire",
        imageUrl: "https://images.unsplash.com/photo-1585441694812-6f21997b88ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxDdGFybmlkZCUyMG9mJTIwdGhlJTIwQWJ5c3MlMjBmYW50YXN5JTIwYXJ0fGVufDB8fHx8MTc1NjY1NDM0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        moves: [
            { name: "Tentacle Slam", damage: 140, type: "Water" },
            { name: "Abyss Gaze", damage: 90, type: "Shadow" }, // Special effect: debuffs
            { name: "Water Bind", damage: 110, type: "Ice" }, // Special effect: freezes
            { name: "Deep Crush", damage: 160, type: "Water" },
            { name: "Drown Field", damage: 130, type: "Water" },
            { name: "Pressure Shift", damage: 0, type: "Water" }, // Special effect: buffs def
        ]
    },
    {
        id: 3,
        name: "Siegwurm the Sky Ruler",
        type: "Wind",
        hp: 11000,
        atk: 420,
        difficulty: "Colossal",
        environment: "Stormy Peaks",
        passive: "Dragon Scale",
        passiveDesc: "Reflects 10% of damage taken.",
        weakness: "Earth",
        imageUrl: "https://images.unsplash.com/photo-1734640407658-8f413702657e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxTaWVnd3VybSUyMHRoZSUyMFNreSUyMFJ1bGVyJTIwZmFudGFzeSUyMGFydHxlbnwwfHx8fDE3NTY2NTQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        moves: [
            { name: "Skyfall Spear", damage: 200, type: "Wind" },
            { name: "Cyclone Guard", damage: 0, type: "Wind" }, // Special effect: shield
            { name: "Tailstorm", damage: 140, type: "Wind" },
            { name: "Roar of Ruin", damage: 80, type: "Shadow" }, // Special effect: silence
            { name: "Thunder Dive", damage: 250, type: "Lightning" }, // Special effect: charge
            { name: "Feather Shard", damage: 100, type: "Metal" },
        ]
    },
    {
        id: 4,
        name: "Orchestra of the Doom Echo",
        type: "Metal",
        hp: 10000,
        atk: 450,
        difficulty: "Colossal",
        environment: "Ancient Ruins",
        passive: "Diva’s Pride",
        passiveDesc: "Immune to debuffs.",
        weakness: "Sound-resistant",
        imageUrl: "https://images.unsplash.com/photo-1607541297580-7bb554347b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxPcmNoZXN0cmElMjBvZiUyMHRoZSUyMERvb20lMjBFY2hvJTIwZmFudGFzeSUyMGFydHxlbnwwfHx8fDE3NTY2NTQzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        moves: [
            { name: "Mind Shatter", damage: 130, type: "Shadow" }, // Special effect: confuse
            { name: "Echo Break", damage: 90, type: "Metal" }, // Special effect: double-hit
            { name: "Resonance Shield", damage: 0, type: "Metal" }, // Special effect: reflect status
            { name: "Chime Slash", damage: 160, type: "Metal" },
            { name: "Bass Bomb", damage: 220, type: "Fire" },
            { name: "Song of Silence", damage: 90, type: "Wind" }, // Special effect: mute
        ]
    },
    {
        id: 5,
        name: "Wezaemon the Tombguard",
        type: "Earth",
        hp: 13000,
        atk: 410,
        difficulty: "Colossal",
        environment: "Night Forest",
        passive: "Deadman's Code",
        passiveDesc: "+ATK as HP drops.",
        weakness: "Life",
        imageUrl: "https://images.unsplash.com/photo-1733006955704-3f96d25d8792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxXZXphZW1vbiUyMHRoZSUyMFRvbWJndWFyZCUyMGZhbnRhc3klMjBhcnR8ZW58MHx8fHwxNzU2NjU0MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        moves: [
            { name: "Ghost Strike", damage: 150, type: "Shadow" },
            { name: "Vengeful Wake", damage: 100, type: "Fire" }, // Special effect: damage increases when low HP
            { name: "Blade Cross", damage: 170, type: "Metal" },
            { name: "Soul-Forged Steel", damage: 200, type: "Metal" },
            { name: "Shadowbind", damage: 110, type: "Shadow" }, // Special effect: immobilize
            { name: "Iron March", damage: 0, type: "Metal" }, // Special effect: buffs
        ]
    },
    {
        id: 6,
        name: "Goldhuneenay the Inexhaustible",
        type: "Earth",
        hp: 20000,
        atk: 350,
        difficulty: "Colossal",
        environment: "Mystical Forest",
        passive: "Unyielding Heart",
        passiveDesc: "Revives once per battle.",
        weakness: "Poison",
        imageUrl: "https://images.unsplash.com/photo-1755272990109-f952e79ef12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxHb2xkaHVuZWVuYXklMjB0aGUlMjBJbmV4aGF1c3RpYmxlJTIwZmFudGFzeSUyMGFydHxlbnwwfHx8fDE3NTY2NTQzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        moves: [
            { name: "Vine Crush", damage: 140, type: "Earth" },
            { name: "Rot Spore", damage: 100, type: "Shadow" }, // Special effect: poison
            { name: "Digest", damage: 120, type: "Water" }, // Special effect: heal
            { name: "Jungle Cry", damage: 0, type: "Wind" }, // Special effect: speed buff
            { name: "Feral Charge", damage: 180, type: "Earth" },
            { name: "Bloom Doom", damage: 210, type: "Fire" },
        ]
    },
    {
        id: 7,
        name: "Vyssach the Immortal",
        type: "Shadow",
        hp: 10000,
        atk: 500,
        difficulty: "Colossal",
        environment: "Ancient Ruins",
        passive: "Immortality Glitch",
        passiveDesc: "Survives death for 2 turns.",
        weakness: "Pure-energy",
        imageUrl: "https://images.unsplash.com/photo-1724927080035-bb6e95449984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxWeXNzYWNoJTIwdGhlJTIwSW1tb3J0YWwlMjBmYW50YXN5JTIwYXJ0fGVufDB8fHx8MTc1NjY1NDM1NXww&ixlib=rb-4.1.0&q=80&w=1080",
        moves: [
            { name: "Shadow Pierce", damage: 220, type: "Shadow" },
            { name: "Fade", damage: 0, type: "Shadow" }, // Special effect: untargetable
            { name: "Reality Warp", damage: 150, type: "Metal" }, // Special effect: remove buffs
            { name: "Void Tear", damage: 130, type: "Shadow" }, // Special effect: disable move
            { name: "Whisper End", damage: 110, type: "Shadow" }, // Special effect: DoT
            { name: "Oblivion Grasp", damage: 300, type: "Shadow" },
        ]
    }
];

module.exports = beasts;