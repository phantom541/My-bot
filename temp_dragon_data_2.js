const dragons = [
  {
    dragonId: 82,
    name: "Horrorcow",
    type: "Earth",
    imageUrl: "Image not available",
    moveset: [
      { name: "Earthquake Stamp", damage: 80, type: "Physical" },
      { name: "Tail Sweep", damage: 60, type: "Physical" },
      { name: "Bellow Roar", damage: 0, type: "Status" },
      { name: "Horn Charge", damage: 75, type: "Physical" },
      { name: "Mud Splash", damage: 50, type: "Special" },
      { name: "Ground Tremor", damage: 70, type: "Special" },
      { name: "Horn Toss", damage: 65, type: "Physical" },
      { name: "Roar Shockwave", damage: 60, type: "Special" },
      { name: "Heavy Stomp", damage: 70, type: "Physical" },
      { name: "Calming Low Chant", damage: 0, type: "Status" },
      { name: "Rock Throw", damage: 60, type: "Physical" },
      { name: "Hornclap Burst", damage: 70, type: "Special" }
    ]
  },
  {
    dragonId: 83,
    name: "Windwalker",
    type: "Wind",
    imageUrl: "Image not available",
    moveset: [
      { name: "Sky Glide", damage: 0, type: "Status" },
      { name: "Whisper Wing", damage: 50, type: "Special" },
      { name: "Wind Slash", damage: 70, type: "Special" },
      { name: "Tempest Gust", damage: 80, type: "Special" },
      { name: "Air Curtain", damage: 0, type: "Status" },
      { name: "Silent Dive", damage: 60, type: "Physical" },
      { name: "Tail Breeze", damage: 40, type: "Special" },
      { name: "Feather Lift", damage: 0, type: "Status" },
      { name: "Tornado Swirl", damage: 85, type: "Special" },
      { name: "Calm Breath", damage: 0, type: "Status" },
      { name: "Silent Roar", damage: 0, type: "Status" },
      { name: "Aero Flash", damage: 75, type: "Special" }
    ]
  },
  {
    dragonId: 84,
    name: "Wodensfang",
    type: "Water",
    imageUrl: "Image not available",
    moveset: [
      { name: "Ocean Roar", damage: 80, type: "Special" },
      { name: "Tidal Crash", damage: 90, type: "Special" },
      { name: "Sea Breath", damage: 75, type: "Special" },
      { name: "Tail Whirlpool", damage: 70, type: "Special" },
      { name: "Wave Slam", damage: 80, type: "Physical" },
      { name: "Coral Spikes", damage: 65, type: "Physical" },
      { name: "Aqua Shield", damage: 0, type: "Status" },
      { name: "Depth Dive", damage: 0, type: "Status" },
      { name: "Water Spout", damage: 85, type: "Special" },
      { name: "Tsunami Charge", damage: 95, type: "Special" },
      { name: "Ancient Roar", damage: 0, type: "Status" },
      { name: "Salt Spray", damage: 40, type: "Special" }
    ]
  },
  {
    dragonId: 85,
    name: "Patience / Innocence / Arrogance",
    type: "Shadow",
    imageUrl: "Image not available",
    moveset: [
      { name: "Triple Shadow Strike", damage: 90, type: "Physical" },
      { name: "Fear Howl", damage: 0, type: "Status" },
      { name: "Black Fog", damage: 0, type: "Status" },
      { name: "Phantom Claw", damage: 75, type: "Physical" },
      { name: "Coordinated Bite", damage: 80, type: "Physical" },
      { name: "Night Cloak", damage: 0, type: "Status" },
      { name: "Roar of Dread", damage: 0, type: "Status" },
      { name: "Shadow Merge", damage: 0, type: "Status" },
      { name: "Quick Bait", damage: 0, type: "Status" },
      { name: "Multi-Head Slam", damage: 85, type: "Physical" },
      { name: "Dark Pulse", damage: 80, type: "Special" },
      { name: "Evasive Fade", damage: 0, type: "Status" }
    ]
  },
  {
    dragonId: 86,
    name: "Armorwing",
    type: "Steel",
    imageUrl: "Image not available",
    moveset: [
      { name: "Wing Charge", damage: 70, type: "Physical" },
      { name: "Steel Shield", damage: 0, type: "Status" },
      { name: "Tail Plate Smash", damage: 75, type: "Physical" },
      { name: "Armor Breath", damage: 60, type: "Special" },
      { name: "Claw Rend", damage: 65, type: "Physical" },
      { name: "Reflective Roar", damage: 0, type: "Status" },
      { name: "Iron Defense", damage: 0, type: "Status" },
      { name: "Steel Toss", damage: 70, type: "Physical" },
      { name: "Sonic Slam", damage: 80, type: "Special" },
      { name: "Blade Wing", damage: 75, type: "Physical" },
      { name: "Harden", damage: 0, type: "Status" },
      { name: "Plate Crush", damage: 80, type: "Physical" }
    ]
  },
  {
    dragonId: 87,
    name: "Moldruffle",
    type: "Poison",
    imageUrl: "Image not available",
    moveset: [
      { name: "Pollen Burst", damage: 60, type: "Special" },
      { name: "Petal Shield", damage: 0, type: "Status" },
      { name: "Vine Lash", damage: 65, type: "Physical" },
      { name: "Healing Scent", damage: 0, type: "Status" },
      { name: "Blossom Gust", damage: 70, type: "Special" },
      { name: "Tail Spike", damage: 60, type: "Physical" },
      { name: "Ground Root Hold", damage: 0, type: "Status" },
      { name: "Earth Heal", damage: 0, type: "Status" },
      { name: "Nectar Pulse", damage: 75, type: "Special" },
      { name: "Petal Flurry", damage: 80, type: "Special" },
      { name: "Calm Breeze", damage: 0, type: "Status" },
      { name: "Seed Spit", damage: 50, type: "Physical" }
    ]
  },
  {
    dragonId: 88,
    name: "Graveknapper",
    type: "Bone",
    imageUrl: "Image not available",
    moveset: [
        { name: "Bone Crush", damage: 80, type: "Physical" },
        { name: "Claw Spikes", damage: 70, type: "Physical" },
        { name: "Tail Smash", damage: 75, type: "Physical" },
        { name: "Roar Stun", damage: 0, type: "Status" },
        { name: "Bone Barrage", damage: 85, type: "Physical" },
        { name: "Skeleton Shield", damage: 0, type: "Status" },
        { name: "Ground Pound", damage: 70, type: "Physical" },
        { name: "Fossil Throw", damage: 75, type: "Physical" },
        { name: "Quick Bite", damage: 60, type: "Physical" },
        { name: "Earthquake", damage: 80, type: "Special" },
        { name: "Venom Drip", damage: 65, type: "Special" },
        { name: "Shadow Roar", damage: 0, type: "Status" }
    ]
  },
  {
    dragonId: 89,
    name: "Ripwrecker",
    type: "Water",
    imageUrl: "Image not available",
    moveset: [
        { name: "Rip Slam", damage: 85, type: "Physical" },
        { name: "Tail Tear", damage: 75, type: "Physical" },
        { name: "Wing Buffet", damage: 60, type: "Physical" },
        { name: "Roar", damage: 0, type: "Status" },
        { name: "Ground Shatter", damage: 80, type: "Physical" },
        { name: "Armor Break", damage: 0, type: "Status" },
        { name: "Quick Bite", damage: 65, type: "Physical" },
        { name: "Shockwave", damage: 70, type: "Special" },
        { name: "Boulder Throw", damage: 75, type: "Physical" },
        { name: "Stomp", damage: 70, type: "Physical" },
        { name: "Quake Roar", damage: 0, type: "Status" },
        { name: "River Surge", damage: 80, type: "Special" }
    ]
  },
  {
    dragonId: 90,
    name: "Silver Phantom",
    type: "Shadow",
    imageUrl: "Image not available",
    moveset: [
        { name: "Phantom Glide", damage: 0, type: "Status" },
        { name: "Shadow Swipe", damage: 70, type: "Physical" },
        { name: "Tail Fade", damage: 0, type: "Status" },
        { name: "Silent Roar", damage: 0, type: "Status" },
        { name: "Invisibility Cloak", damage: 0, type: "Status" },
        { name: "Quick Claw", damage: 65, type: "Physical" },
        { name: "Moonflash", damage: 75, type: "Special" },
        { name: "Stealth Bite", damage: 70, type: "Physical" },
        { name: "Night Pulse", damage: 80, type: "Special" },
        { name: "Eclipse Slash", damage: 85, type: "Physical" },
        { name: "Shadow Merge", damage: 0, type: "Status" },
        { name: "Fade Strike", damage: 90, type: "Physical" }
    ]
  },
  {
    dragonId: 91,
    name: "Wraithmill",
    type: "Shadow",
    imageUrl: "Image not available",
    moveset: [
        { name: "Illusion Strike", damage: 70, type: "Special" },
        { name: "Shadow Puff", damage: 0, type: "Status" },
        { name: "Cloak Dive", damage: 0, type: "Status" },
        { name: "Phantom Rush", damage: 80, type: "Physical" },
        { name: "Camouflage", damage: 0, type: "Status" },
        { name: "Quick Bite", damage: 65, type: "Physical" },
        { name: "Ghost Pulse", damage: 75, type: "Special" },
        { name: "Silent Assault", damage: 85, type: "Physical" },
        { name: "Fear Roar", damage: 0, type: "Status" },
        { name: "Dark Glide", damage: 0, type: "Status" },
        { name: "Smoke Cloud", damage: 0, type: "Status" },
        { name: "Stealth Howl", damage: 0, type: "Status" }
    ]
  },
  {
    dragonId: 92,
    name: "Frostcrusher",
    type: "Ice",
    imageUrl: "Image not available",
    moveset: [
        { name: "Ice Crush", damage: 85, type: "Physical" },
        { name: "Frost Breath", damage: 80, type: "Special" },
        { name: "Tail Slam", damage: 75, type: "Physical" },
        { name: "Chill Roar", damage: 0, type: "Status" },
        { name: "Freeze Shard", damage: 70, type: "Special" },
        { name: "Quad Blizzard", damage: 90, type: "Special" },
        { name: "Ground Freeze", damage: 0, type: "Status" },
        { name: "Ice Armor", damage: 0, type: "Status" },
        { name: "Quick Bite", damage: 65, type: "Physical" },
        { name: "Snow Spin", damage: 70, type: "Special" },
        { name: "Icicle Throw", damage: 75, type: "Physical" },
        { name: "Frozen Stomp", damage: 80, type: "Physical" }
    ]
  },
  {
    dragonId: 93,
    name: "Thornridge",
    type: "Poison",
    imageUrl: "Image not available",
    moveset: [
        { name: "Thorn Lash", damage: 75, type: "Physical" },
        { name: "Spike Volley", damage: 80, type: "Physical" },
        { name: "Poison Needle", damage: 70, type: "Special" },
        { name: "Prickle Shield", damage: 0, type: "Status" },
        { name: "Vine Grab", damage: 0, type: "Status" },
        { name: "Quick Bite", damage: 65, type: "Physical" },
        { name: "Root Bind", damage: 0, type: "Status" },
        { name: "Leaf Storm", damage: 75, type: "Special" },
        { name: "Camouflage", damage: 0, type: "Status" },
        { name: "Tail Spin", damage: 60, type: "Physical" },
        { name: "Creeping Vines", damage: 0, type: "Status" },
        { name: "Bark Slam", damage: 80, type: "Physical" }
    ]
  },
  {
    dragonId: 94,
    name: "Frostfang",
    type: "Ice",
    imageUrl: "Image not available",
    moveset: [
        { name: "Ice Fang", damage: 80, type: "Physical" },
        { name: "Cold Bite", damage: 75, type: "Physical" },
        { name: "Frost Breath", damage: 85, type: "Special" },
        { name: "Roar", damage: 0, type: "Status" },
        { name: "Blizzard Wing", damage: 90, type: "Special" },
        { name: "Freeze Pulse", damage: 80, type: "Special" },
        { name: "Quick Bite", damage: 65, type: "Physical" },
        { name: "Tail Spin", damage: 60, type: "Physical" },
        { name: "Snow Spike", damage: 70, type: "Physical" },
        { name: "Ice Armor", damage: 0, type: "Status" },
        { name: "Frost Shield", damage: 0, type: "Status" },
        { name: "Chill Roar", damage: 0, type: "Status" }
    ]
  },
  {
    dragonId: 95,
    name: "Smokebreath Queen",
    type: "Fire",
    imageUrl: "Image not available",
    moveset: [
        { name: "Royal Smoke", damage: 0, type: "Status" },
        { name: "Fire Crown", damage: 85, type: "Special" },
        { name: "Tail Blast", damage: 80, type: "Physical" },
        { name: "Inferno Screen", damage: 0, type: "Status" },
        { name: "Queenly Roar", damage: 0, type: "Status" },
        { name: "Smoke Shield", damage: 0, type: "Status" },
        { name: "Fire Trail", damage: 75, type: "Special" },
        { name: "Quick Bite", damage: 65, type: "Physical" },
        { name: "Flame Wave", damage: 80, type: "Special" },
        { name: "Tail Spin", damage: 70, type: "Physical" },
        { name: "Royal Breath", damage: 90, type: "Special" },
        { name: "Blaze Queen", damage: 95, type: "Special" }
    ]
  },
  {
    dragonId: 96,
    name: "Nightlight Hybrids (Dart, Pouncer, Ruffrunner)",
    type: "Shadow",
    imageUrl: "Image not available",
    moveset: [
        { name: "Hybrid Strike", damage: 85, type: "Physical" },
        { name: "Plasma Bite", damage: 80, type: "Special" },
        { name: "Tail Whip", damage: 60, type: "Physical" },
        { name: "Cloak Dash", damage: 0, type: "Status" },
        { name: "Night Roar", damage: 0, type: "Status" },
        { name: "Wing Blade", damage: 75, type: "Physical" },
        { name: "Quick Bite", damage: 65, type: "Physical" },
        { name: "Shadow Blend", damage: 0, type: "Status" },
        { name: "Aero Slash", damage: 70, type: "Special" },
        { name: "Tail Spin", damage: 65, type: "Physical" },
        { name: "Sneak Pounce", damage: 80, type: "Physical" },
        { name: "Eclipse Pulse", damage: 90, type: "Special" }
    ]
  },
  {
    dragonId: 97,
    name: "Titan Variants",
    type: "Varies",
    imageUrl: "Image not available",
    moveset: [
        { name: "Titan Strike", damage: 100, type: "Physical" },
        { name: "Tail Slam", damage: 90, type: "Physical" },
        { name: "Mega Blast", damage: 110, type: "Special" },
        { name: "Roar of Power", damage: 0, type: "Status" },
        { name: "Overcharge Pulse", damage: 100, type: "Special" },
        { name: "Wing Buffet", damage: 80, type: "Physical" },
        { name: "Earthquake Stomp", damage: 95, type: "Physical" },
        { name: "Dive Bomb", damage: 85, type: "Physical" },
        { name: "Quick Bite", damage: 75, type: "Physical" },
        { name: "Tail Spin", damage: 80, type: "Physical" },
        { name: "Titan Burst", damage: 120, type: "Special" },
        { name: "Ultimate Roar", damage: 0, type: "Status" }
    ]
  },
  {
    dragonId: 98,
    name: "Red Furry",
    type: "Fire",
    imageUrl: "Image not available",
    moveset: [
        { name: "Fireball Blast", damage: 85, type: "Special" },
        { name: "Tail Whip", damage: 60, type: "Physical" },
        { name: "Flame Breath", damage: 90, type: "Special" },
        { name: "Scale Shield", damage: 0, type: "Status" },
        { name: "Roar of Fury", damage: 0, type: "Status" },
        { name: "Claw Slash", damage: 70, type: "Physical" },
        { name: "Lava Spit", damage: 80, type: "Special" },
        { name: "Wing Gust", damage: 65, type: "Special" },
        { name: "Ember Shower", damage: 75, type: "Special" },
        { name: "Heat Wave", damage: 80, type: "Special" },
        { name: "Fire Spin", damage: 85, type: "Special" },
        { name: "Blazing Charge", damage: 95, type: "Physical" }
    ]
  }
];

module.exports = dragons;
