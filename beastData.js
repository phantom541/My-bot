const beasts = [
    {
        "id": 1,
        "name": "Lycagon the Nightslayer",
        "hp": 720000,
        "atk": 5,
        "def": 3,
        "spd": 5,
        "environment": "Moonlit Forest",
        "passive": "Dark Aura",
        "passiveDesc": "Drains 5% HP per turn from enemies.",
        "weakness": "Light",
        "imageUrl": "https://images.unsplash.com/photo-1575382999375-a6c69b84e649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxMeWNhZ29uJTIwdGhlJTIwTmlnaHRzbGF5ZXIlMjBmYW50YXN5JTIwYXJ0fGVufDB8fHx8MTc1NjY1NDM0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Moon Claw",
                "desc": "High-speed slash"
            },
            {
                "name": "Lunar Drain",
                "desc": "Heals 15% of damage dealt"
            },
            {
                "name": "Feral Leap",
                "desc": "Stuns for 1 turn"
            },
            {
                "name": "Silent Howl",
                "desc": "Debuffs enemy defense"
            },
            {
                "name": "Ghost Slash",
                "desc": "Ignores armor"
            },
            {
                "name": "Flicker",
                "desc": "Dodge chance up"
            },
            {
                "name": "Crescent Barrage",
                "desc": "Multi-hit low damage attack"
            }
        ]
    },
    {
        "id": 2,
        "name": "Ctarnidd of the Abyss",
        "hp": 850000,
        "atk": 4,
        "def": 5,
        "spd": 2,
        "environment": "Black Sea Cavern",
        "passive": "Water Skin",
        "passiveDesc": "30% damage resistance.",
        "weakness": "Fire",
        "imageUrl": "https://images.unsplash.com/photo-1585441694812-6f21997b88ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxDdGFybmlkZCUyMG9mJTIwdGhlJTIwQWJ5c3MlMjBmYW50YXN5JTIwYXJ0fGVufDB8fHx8MTc1NjY1NDM0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Tentacle Slam",
                "desc": "Stuns randomly"
            },
            {
                "name": "Abyss Gaze",
                "desc": "Lowers accuracy"
            },
            {
                "name": "Water Bind",
                "desc": "Freezes player for 1 turn"
            },
            {
                "name": "Deep Crush",
                "desc": "Moderate physical damage"
            },
            {
                "name": "Drown Field",
                "desc": "Water-type AoE"
            },
            {
                "name": "Pressure Shift",
                "desc": "Defense up"
            },
            {
                "name": "Silent Pull",
                "desc": "Forces switch in team"
            }
        ]
    },
    {
        "id": 3,
        "name": "Siegwurm the Sky Ruler",
        "hp": 680000,
        "atk": 5,
        "def": 4,
        "spd": 4,
        "environment": "Floating Skypillar",
        "passive": "Dragon Scale",
        "passiveDesc": "Reflects 10% of damage taken.",
        "weakness": "Earth",
        "imageUrl": "https://images.unsplash.com/photo-1734640407658-8f413702657e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxTaWVnd3VybSUyMHRoZSUyMFNreSUyMFJ1bGVyJTIwZmFudGFzeSUyMGFydHxlbnwwfHx8fDE3NTY2NTQzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Skyfall Spear",
                "desc": "Meteor drop"
            },
            {
                "name": "Cyclone Guard",
                "desc": "Wind shield (reduce damage)"
            },
            {
                "name": "Tailstorm",
                "desc": "AoE wind slashes"
            },
            {
                "name": "Roar of Ruin",
                "desc": "Silence"
            },
            {
                "name": "Thunder Dive",
                "desc": "2-turn charge attack"
            },
            {
                "name": "Feather Shard",
                "desc": "Bleed over time"
            },
            {
                "name": "Windstep",
                "desc": "Speed +2"
            }
        ]
    },
    {
        "id": 4,
        "name": "Orchestra of the Doom Echo",
        "hp": 640000,
        "atk": 4,
        "def": 3,
        "spd": 5,
        "environment": "Ruined Concert Hall",
        "passive": "Diva’s Pride",
        "passiveDesc": "Immune to debuffs.",
        "weakness": "Sound-resistant",
        "imageUrl": "https://images.unsplash.com/photo-1607541297580-7bb554347b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxPcmNoZXN0cmElMjBvZiUyMHRoZSUyMERvb20lMjBFY2hvJTIwZmFudGFzeSUyMGFydHxlbnwwfHx8fDE3NTY2NTQzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Mind Shatter",
                "desc": "Confuses"
            },
            {
                "name": "Echo Break",
                "desc": "Double-hit sound wave"
            },
            {
                "name": "Resonance Shield",
                "desc": "Reflects status effects"
            },
            {
                "name": "Chime Slash",
                "desc": "Medium sound damage"
            },
            {
                "name": "Bass Bomb",
                "desc": "Delayed AoE"
            },
            {
                "name": "Song of Silence",
                "desc": "Mute"
            },
            {
                "name": "Reverberate",
                "desc": "Random effect repeat"
            }
        ]
    },
    {
        "id": 5,
        "name": "Wezaemon the Tombguard",
        "hp": 710000,
        "atk": 5,
        "def": 4,
        "spd": 3,
        "environment": "Silent Graveyard",
        "passive": "Deadman's Code",
        "passiveDesc": "+ATK as HP drops.",
        "weakness": "Life",
        "imageUrl": "https://images.unsplash.com/photo-1733006955704-3f96d25d8792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxXZXphZW1vbiUyMHRoZSUyMFRvbWJndWFyZCUyMGZhbnRhc3klMjBhcnR8ZW58MHx8fHwxNzU2NjU0MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Ghost Strike",
                "desc": "Damage + fear debuff"
            },
            {
                "name": "Parry",
                "desc": "Chance to nullify attacks"
            },
            {
                "name": "Vengeful Wake",
                "desc": "Damage increases when below 50% HP"
            },
            {
                "name": "Blade Cross",
                "desc": "Moderate AoE slash"
            },
            {
                "name": "Rise Again",
                "desc": "Revives once per battle"
            },
            {
                "name": "Shadowbind",
                "desc": "Immobilize"
            },
            {
                "name": "Iron March",
                "desc": "Buffs attack + defense"
            }
        ]
    },
    {
        "id": 6,
        "name": "Goldhuneenay the Inexhaustible",
        "hp": 990000,
        "atk": 4,
        "def": 4,
        "spd": 3,
        "environment": "Evergrowth Jungle",
        "passive": "Unyielding Heart",
        "passiveDesc": "Revives once per battle.",
        "weakness": "Poison",
        "imageUrl": "https://images.unsplash.com/photo-1755272990109-f952e79ef12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxHb2xkaHVuZWVuYXklMjB0aGUlMjBJbmV4aGF1c3RpYmxlJTIwZmFudGFzeSUyMGFydHxlbnwwfHx8fDE3NTY2NTQzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Vine Crush",
                "desc": "Medium damage + trap"
            },
            {
                "name": "Rot Spore",
                "desc": "Poison"
            },
            {
                "name": "Digest",
                "desc": "Heals based on poisoned targets"
            },
            {
                "name": "Jungle Cry",
                "desc": "Boosts speed"
            },
            {
                "name": "Spore Shield",
                "desc": "Status immunity 2 turns"
            },
            {
                "name": "Feral Charge",
                "desc": "High-speed attack"
            },
            {
                "name": "Bloom Doom",
                "desc": "AoE nature burst"
            }
        ]
    },
    {
        "id": 7,
        "name": "Vyssach the Immortal",
        "hp": 600000,
        "atk": 5,
        "def": 2,
        "spd": 5,
        "environment": "Distorted Dimension",
        "passive": "Immortality Glitch",
        "passiveDesc": "Survives death for 2 turns.",
        "weakness": "Pure-energy",
        "imageUrl": "https://images.unsplash.com/photo-1724927080035-bb6e95449984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxWeXNzYWNoJTIwdGhlJTIwSW1tb3J0YWwlMjBmYW50YXN5JTIwYXJ0fGVufDB8fHx8MTc1NjY1NDM1NXww&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Shadow Pierce",
                "desc": "True damage (ignores armor)"
            },
            {
                "name": "Fade",
                "desc": "Becomes untargetable for 1 turn"
            },
            {
                "name": "Reality Warp",
                "desc": "Removes buffs"
            },
            {
                "name": "Void Tear",
                "desc": "Randomly disables a move"
            },
            {
                "name": "Whisper End",
                "desc": "Slow burn (HP loss over time)"
            },
            {
                "name": "Echo Shift",
                "desc": "Switches position in team"
            },
            {
                "name": "Oblivion Grasp",
                "desc": "Delay death by 2 turns"
            }
        ]
    }
];

module.exports = beasts;