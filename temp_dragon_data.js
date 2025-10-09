const dragons = [
  {
    dragonId: 1,
    name: "Night Fury (Toothless)",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/3/33/Toothless_Season_6.png",
    moveset: [
      { name: "Plasma Blast", damage: 200, type: "Special" },
      { name: "Tail Swipe", damage: 160, type: "Physical" },
      { name: "Stealth Flight", damage: 110, type: "Status" },
      { name: "Sonic Screech", damage: 150, type: "Special" },
      { name: "Fireball Burst", damage: 185, type: "Special" },
      { name: "Shadow Dive", damage: 170, type: "Physical" },
      { name: "Claw Slash", damage: 165, type: "Physical" },
      { name: "Wing Buffet", damage: 155, type: "Physical" },
      { name: "Rapid Fire Plasma", damage: 180, type: "Special" },
      { name: "Dragon Roar", damage: 180, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" },
      { name: "Evasive Roll", damage: 15, type: "Status" }
    ],
    equippedMoves: [0, 2, 4, 6, 8, 10]
  },

  {
    dragonId: 2,
    name: "Light Fury",
    type: "Fire",
    imageUrl: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/7/7a/Light_Fury_HTTYD3.png",
    moveset: [
      { name: "Plasma Blast", damage: 85, type: "Special" },
      { name: "Invisibility Cloak", damage: 0, type: "Status" },
      { name: "Blinding Flash", damage: 75, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Aerial Dive", damage: 70, type: "Physical" },
      { name: "Fireball Burst", damage: 80, type: "Special" },
      { name: "Whirlwind", damage: 60, type: "Special" },
      { name: "Sonic Boom", damage: 50, type: "Special" },
      { name: "Wing Slice", damage: 65, type: "Physical" },
      { name: "Dragon Roar", damage: 40, type: "Status" },
      { name: "Swift Strike", damage: 75, type: "Physical" },
      { name: "Stealth Glide", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 5, 8, 10, 11]
  },

  {
    dragonId: 3,
    name: "Deadly Nadder (Stormfly)",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/d/d0/Stormfly_HTTYD2.png",
    moveset: [
      { name: "Spike Shot", damage: 80, type: "Physical" },
      { name: "Tail Lash", damage: 60, type: "Physical" },
      { name: "Fire Blast", damage: 85, type: "Special" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Flame Burst", damage: 75, type: "Special" },
      { name: "Sharp Claw Slash", damage: 65, type: "Physical" },
      { name: "Wind Gust", damage: 55, type: "Special" },
      { name: "Toxic Spines", damage: 70, type: "Special" },
      { name: "Blinding Dust", damage: 0, type: "Status" },
      { name: "Rapid Fire Spikes", damage: 85, type: "Physical" },
      { name: "Sonic Scream", damage: 50, type: "Special" },
      { name: "Fire Trail", damage: 80, type: "Special" }
    ],
    equippedMoves: [0, 2, 4, 5, 9, 11]
  },

  {
    dragonId: 4,
    name: "Monstrous Nightmare (Hookfang)",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/62/Hookfang.png",
    moveset: [
      { name: "Fire Breath", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Buffet", damage: 60, type: "Physical" },
      { name: "Flame Spin", damage: 75, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Attack", damage: 70, type: "Physical" },
      { name: "Heat Wave", damage: 80, type: "Special" },
      { name: "Claw Swipe", damage: 65, type: "Physical" },
      { name: "Fireball", damage: 80, type: "Special" },
      { name: "Scorching Dive", damage: 75, type: "Physical" },
      { name: "Flame Shield", damage: 0, type: "Status" },
      { name: "Ground Slam", damage: 65, type: "Physical" }
    ],
    equippedMoves: [0, 3, 6, 7, 8, 9]
  },

  {
    dragonId: 5,
    name: "Gronckle (Meatlug)",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/05/Meatlug_Season_3.png",
    moveset: [
      { name: "Rock Throw", damage: 70, type: "Physical" },
      { name: "Fireball", damage: 80, type: "Special" },
      { name: "Tail Bash", damage: 60, type: "Physical" },
      { name: "Ground Pound", damage: 65, type: "Physical" },
      { name: "Heat Blast", damage: 75, type: "Special" },
      { name: "Wing Shield", damage: 0, type: "Status" },
      { name: "Claw Swipe", damage: 65, type: "Physical" },
      { name: "Lava Burst", damage: 85, type: "Special" },
      { name: "Defensive Curl", damage: 0, type: "Status" },
      { name: "Stomp", damage: 60, type: "Physical" },
      { name: "Smokescreen", damage: 0, type: "Status" },
      { name: "Scorch", damage: 75, type: "Special" }
    ],
    equippedMoves: [0, 1, 4, 6, 7, 9]
  },

  {
    dragonId: 6,
    name: "Hideous Zippleback (Barf & Belch)",
    type: "Poison",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/b/b1/Barf_and_Belch_HTTYD2.png",
    moveset: [
      { name: "Twin Flame Breath", damage: 90, type: "Special" },
      { name: "Gas Cloud", damage: 70, type: "Special" },
      { name: "Tail Lash", damage: 60, type: "Physical" },
      { name: "Flame Throw", damage: 75, type: "Special" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
      { name: "Double Bite", damage: 65, type: "Physical" },
      { name: "Wing Slam", damage: 55, type: "Physical" },
      { name: "Fireball Spray", damage: 80, type: "Special" },
      { name: "Confuse Gas", damage: 0, type: "Status" },
      { name: "Sonic Boom", damage: 50, type: "Special" },
      { name: "Flame Spin", damage: 75, type: "Special" },
      { name: "Stealth Approach", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 1, 3, 5, 7, 10]
  },

  {
    dragonId: 7,
    name: "Terrible Terror",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/74/Terrible_Terror_HTTYD.png",
    moveset: [
      { name: "Swarm Attack", damage: 70, type: "Physical" },
      { name: "Claw Slash", damage: 60, type: "Physical" },
      { name: "Fire Breath", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 55, type: "Physical" },
      { name: "Wing Buffet", damage: 50, type: "Physical" },
      { name: "Stealth Dive", damage: 0, type: "Status" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Sonic Screech", damage: 50, type: "Special" },
      { name: "Smoke Puff", damage: 0, type: "Status" },
      { name: "Fireball Burst", damage: 80, type: "Special" },
      { name: "Distract", damage: 0, type: "Status" },
      { name: "Rapid Flight", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 1, 2, 3, 4, 9]
  },

  {
    dragonId: 8,
    name: "Thunderdrum",
    type: "Electric",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/79/Thunderdrum_Season_3.png",
    moveset: [
      { name: "Sonic Boom", damage: 60, type: "Special" },
      { name: "Thunder Clap", damage: 75, type: "Special" },
      { name: "Tail Smash", damage: 65, type: "Physical" },
      { name: "Water Jet", damage: 70, type: "Special" },
      { name: "Wing Buffet", damage: 50, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Shockwave", damage: 75, type: "Special" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Claw Swipe", damage: 65, type: "Physical" },
      { name: "Electric Burst", damage: 80, type: "Special" },
      { name: "Tremor Stomp", damage: 75, type: "Physical" },
      { name: "Stun Wave", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 1, 3, 6, 9, 10]
  },

  {
    dragonId: 9,
    name: "Scauldron",
    type: "Water",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f0/Scauldron_HTTYD2.png",
    moveset: [
      { name: "Acid Spray", damage: 70, type: "Special" },
      { name: "Water Blast", damage: 75, type: "Special" },
      { name: "Tail Lash", damage: 60, type: "Physical" },
      { name: "Wing Slam", damage: 50, type: "Physical" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
      { name: "Fire Puff", damage: 70, type: "Special" },
      { name: "Corrosive Mist", damage: 65, type: "Special" },
      { name: "Dive Attack", damage: 70, type: "Physical" },
      { name: "Claw Swipe", damage: 65, type: "Physical" },
      { name: "Bubble Burst", damage: 75, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Defensive Curl", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 1, 5, 6, 8, 9]
  },

  {
    dragonId: 10,
    name: "Skrill",
    type: "Electric",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/3/32/Skrill.png",
    moveset: [
      { name: "Lightning Strike", damage: 90, type: "Special" },
      { name: "Thunder Roar", damage: 80, type: "Special" },
      { name: "Fireball", damage: 80, type: "Special" },
      { name: "Wing Buffet", damage: 50, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Sonic Boom", damage: 60, type: "Special" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Claw Slash", damage: 65, type: "Physical" },
      { name: "Shockwave", damage: 75, type: "Special" },
      { name: "Electric Pulse", damage: 85, type: "Special" },
      { name: "Fire Spin", damage: 75, type: "Special" },
      { name: "Stealth Glide", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 1, 2, 5, 8, 9]
  },

  {
    dragonId: 11,
    name: "Changewing",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/eb/Changewing.png",
    moveset: [
      { name: "Fire Blast", damage: 85, type: "Special" },
      { name: "Shadow Strike", damage: 75, type: "Physical" },
      { name: "Wing Slash", damage: 65, type: "Physical" },
      { name: "Smoke Bomb", damage: 0, type: "Status" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Stealth Attack", damage: 0, type: "Status" },
      { name: "Claw Swipe", damage: 65, type: "Physical" },
      { name: "Heat Wave", damage: 80, type: "Special" },
      { name: "Camouflage", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Fire Spin", damage: 75, type: "Special" },
      { name: "Silent Flight", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 1, 3, 6, 7, 10]
  },

  {
    dragonId: 12,
    name: "Whispering Death",
    type: "Earth",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/0b/Whispering_Death.png",
    moveset: [
      { name: "Burrow", damage: 0, type: "Status" },
      { name: "Claw Slash", damage: 65, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Sonic Screech", damage: 50, type: "Special" },
      { name: "Fire Breath", damage: 85, type: "Special" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Sandstorm", damage: 70, type: "Special" },
      { name: "Spin Attack", damage: 65, type: "Physical" },
      { name: "Earthquake", damage: 80, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Smoke Puff", damage: 0, type: "Status" },
      { name: "Stealth Approach", damage: 0, type: "Status" }
    ],
    equippedMoves: [1, 4, 6, 8, 9, 11]
  },

  {
    dragonId: 13,
    name: "Red Death",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/7f/Red_Death.png",
    moveset: [
      { name: "Fire Blast", damage: 90, type: "Special" },
      { name: "Tail Smash", damage: 70, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Ground Pound", damage: 65, type: "Physical" },
      { name: "Claw Slash", damage: 65, type: "Physical" },
      { name: "Fireball", damage: 80, type: "Special" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 60, type: "Physical" },
      { name: "Flame Spin", damage: 75, type: "Special" },
      { name: "Sonic Boom", damage: 60, type: "Special" }
    ],
    equippedMoves: [0, 1, 6, 8, 10, 11]
  },

  {
    dragonId: 14,
    name: "Bewilderbeast",
    type: "Ice",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/1/19/Bewilderbeast.png",
    moveset: [
      { name: "Ice Breath", damage: 85, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Tail Smash", damage: 70, type: "Physical" },
      { name: "Wing Buffet", damage: 60, type: "Physical" },
      { name: "Freeze Blast", damage: 80, type: "Special" },
      { name: "Ground Pound", damage: 65, type: "Physical" },
      { name: "Sonic Boom", damage: 60, type: "Special" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Ice Shards", damage: 75, type: "Special" },
      { name: "Thunder Roar", damage: 80, type: "Special" },
      { name: "Frost Storm", damage: 85, type: "Special" },
      { name: "Ice Shield", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 4, 6, 8, 9, 10]
  },

  {
    dragonId: 15,
    name: "Stormcutter (Cloudjumper)",
    type: "Wind",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/6f/Cloudjumper.png",
    moveset: [
      { name: "Wind Slash", damage: 75, type: "Special" },
      { name: "Claw Swipe", damage: 65, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Sonic Boom", damage: 60, type: "Special" },
      { name: "Wing Buffet", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Tornado Spin", damage: 80, type: "Special" },
      { name: "Fire Breath", damage: 85, type: "Special" },
      { name: "Stun Wave", damage: 0, type: "Status" },
      { name: "Feather Flurry", damage: 70, type: "Physical" }
    ],
    equippedMoves: [0, 1, 3, 6, 8, 11]
  },

  {
    dragonId: 16,
    name: "Eruptodon",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/2/29/Eruptodon_HTTYD2.png",
    moveset: [
      { name: "Lava Blast", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Ground Pound", damage: 65, type: "Physical" },
      { name: "Fire Breath", damage: 85, type: "Special" },
      { name: "Rock Throw", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 60, type: "Physical" },
      { name: "Flame Wave", damage: 80, type: "Special" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Molten Burst", damage: 85, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Heat Spin", damage: 75, type: "Special" }
    ],
    equippedMoves: [0, 3, 4, 6, 8, 9]
  },

  {
    dragonId: 17,
    name: "Deathgripper",
    type: "Ice",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/ee/Deathgripper.png",
    moveset: [
      { name: "Ice Claw", damage: 75, type: "Physical" },
      { name: "Tail Slash", damage: 60, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Freeze Breath", damage: 85, type: "Special" },
      { name: "Sonic Screech", damage: 50, type: "Special" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Ice Shards", damage: 75, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Stealth Attack", damage: 0, type: "Status" },
      { name: "Frost Bite", damage: 70, type: "Special" },
      { name: "Wing Buffet", damage: 60, type: "Physical" }
    ],
    equippedMoves: [0, 3, 5, 7, 10, 11]
  },

  {
    dragonId: 18,
    name: "Seashocker",
    type: "Electric",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/2/2e/Seashocker.png",
    moveset: [
      { name: "Electric Shock", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Water Blast", damage: 75, type: "Special" },
      { name: "Sonic Boom", damage: 60, type: "Special" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Electric Wave", damage: 80, type: "Special" },
      { name: "Stun Attack", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Thunder Strike", damage: 85, type: "Special" },
      { name: "Water Spin", damage: 75, type: "Special" }
    ],
    equippedMoves: [0, 2, 3, 7, 10, 11]
  },

  {
    dragonId: 19,
    name: "Snaptrapper",
    type: "Earth",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f9/Snaptrapper.png",
    moveset: [
      { name: "Bite", damage: 65, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Camouflage", damage: 0, type: "Status" },
      { name: "Stun Attack", damage: 0, type: "Status" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Claw Swipe", damage: 65, type: "Physical" },
      { name: "Earthquake", damage: 80, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Trap Snare", damage: 0, type: "Status" },
      { name: "Spin Attack", damage: 65, type: "Physical" }
    ],
    equippedMoves: [0, 1, 4, 7, 8, 11]
  },

  {
    dragonId: 20,
    name: "Typhoomerang",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/c/cf/Typhoomerang.png",
    moveset: [
      { name: "Fire Throw", damage: 80, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Boomerang Slash", damage: 70, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Flame Spin", damage: 75, type: "Special" },
      { name: "Stun Attack", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Flame Burst", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Fire Wave", damage: 80, type: "Special" }
    ],
    equippedMoves: [0, 2, 5, 6, 9, 11]
  },

  {
    dragonId: 21,
    name: "Timberjack",
    type: "Wood",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/6b/Timberjack_Season_4.png",
    moveset: [
      { name: "Wood Chop", damage: 75, type: "Physical" },
      { name: "Tail Swipe", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 80, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Branch Throw", damage: 75, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Wood Spin", damage: 70, type: "Physical" },
      { name: "Leaf Storm", damage: 80, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" }
    ],
    equippedMoves: [0, 2, 3, 6, 9, 10]
  },

  {
    dragonId: 22,
    name: "Boneknapper",
    type: "Bone",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/87/Boneknapper_S3.png",
    moveset: [
      { name: "Bone Crush", damage: 80, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Bone Throw", damage: 75, type: "Physical" },
      { name: "Earthquake", damage: 80, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Bone Armor", damage: 0, type: "Status" },
      { name: "Roar Stun", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 6, 7, 9, 10]
  },

  {
    dragonId: 23,
    name: "Scuttleclaw",
    type: "Insect",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/3/34/Scuttleclaw.png",
    moveset: [
      { name: "Claw Swipe", damage: 75, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Spin Attack", damage: 70, type: "Physical" },
      { name: "Poison Claw", damage: 75, type: "Special" },
      { name: "Camouflage", damage: 0, type: "Status" },
      { name: "Tail Spin", damage: 65, type: "Physical" }
    ],
    equippedMoves: [0, 2, 6, 8, 9, 11]
  },

  {
    dragonId: 24,
    name: "Snafflefang",
    type: "Toothless",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/7d/Snafflefang_S3.png",
    moveset: [
      { name: "Bite", damage: 75, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Snare Trap", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Stealth Attack", damage: 0, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 6, 7, 9, 10]
  },

  {
    dragonId: 25,
    name: "Raincutter",
    type: "Water",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e0/Raincutter.png",
    moveset: [
      { name: "Water Blade", damage: 80, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slash", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Water Spin", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Hydro Blast", damage: 80, type: "Special" },
      { name: "Rain Dance", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 6, 7, 10, 11]
  },

  {
    dragonId: 26,
    name: "Hobblegrunt",
    type: "Mud",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/69/Hobblegrunt.png",
    moveset: [
      { name: "Mud Splash", damage: 75, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Camouflage", damage: 0, type: "Status" },
      { name: "Mud Bomb", damage: 75, type: "Special" }
    ],
    equippedMoves: [0, 2, 6, 7, 10, 11]
  },

  {
    dragonId: 27,
    name: "Shovelhelm",
    type: "Armor",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/a/af/Shovelhelm.png",
    moveset: [
      { name: "Headbutt", damage: 75, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Shovel Spin", damage: 70, type: "Physical" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Armor Bash", damage: 75, type: "Physical" },
      { name: "Roar Stun", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 6, 8, 10, 11]
  },

  {
    dragonId: 28,
    name: "Hotburple",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/1/18/Hotburple.png",
    moveset: [
      { name: "Flame Breath", damage: 80, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Fire Spin", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Heat Wave", damage: 80, type: "Special" },
      { name: "Flame Shield", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 6, 7, 10, 11]
  },

  {
    dragonId: 29,
    name: "Smothering Smokebreath",
    type: "Smoke",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/5d/Smothering_Smokebreath.png",
    moveset: [
      { name: "Smoke Bomb", damage: 75, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Smog Cloud", damage: 0, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 6, 7, 9, 10]
  },

  {
    dragonId: 30,
    name: "Speed Stinger",
    type: "Insect",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f7/Speed_Stinger.png",
    moveset: [
      { name: "Sting Attack", damage: 75, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Speed Dash", damage: 70, type: "Physical" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Venom Spray", damage: 75, type: "Special" },
      { name: "Camouflage", damage: 0, type: "Status" }
    ],
    equippedMoves: [0, 2, 6, 7, 9, 10]
  },

  {
    dragonId: 31,
    name: "Gronckle",
    type: "Rock",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/57/Gronckle.png",
    moveset: [
      { name: "Rock Throw", damage: 70, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Lava Blast", damage: 85, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Flame Spin", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Molten Burst", damage: 85, type: "Special" },
      { name: "Heat Wave", damage: 80, type: "Special" },
    ],
    equippedMoves: [0,3,6,7,9,10]
  },

  {
    dragonId: 32,
    name: "Hideous Zippleback",
    type: "Electric",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/a/a6/Hideous_Zippleback.png",
    moveset: [
      { name: "Electric Shock", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Dual Fire Blast", damage: 90, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Electric Wave", damage: 80, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Zap Stun", damage: 0, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,3,6,7,9,10]
  },

  {
    dragonId: 33,
    name: "Monstrous Nightmare",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/c/c3/Monstrous_Nightmare.png",
    moveset: [
      { name: "Fire Blast", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Flame Burst", damage: 85, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Flame Spin", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Fire Wave", damage: 80, type: "Special" },
      { name: "Heat Wave", damage: 80, type: "Special" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,3,6,7,9,10]
  },

  {
    dragonId: 34,
    name: "Scauldron",
    type: "Water",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e0/Scauldron.png",
    moveset: [
      { name: "Water Blast", damage: 80, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slash", damage: 65, type: "Physical" },
      { name: "Steam Burst", damage: 75, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Water Spin", damage: 75, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Boiling Steam", damage: 85, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Scalding Roar", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,3,6,7,9,10]
  },

  {
    dragonId: 35,
    name: "Thunderdrum",
    type: "Electric",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e4/Thunderdrum.png",
    moveset: [
      { name: "Thunder Strike", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Sonic Boom", damage: 60, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Electric Wave", damage: 80, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Thunder Roar", damage: 0, type: "Status" },
      { name: "Stun Wave", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,3,6,7,9,10]
  },

  {
    dragonId: 36,
    name: "Terrible Terror",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/fb/Terrible_Terror.png",
    moveset: [
      { name: "Fire Blast", damage: 80, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slash", damage: 65, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Flame Spin", damage: 75, type: "Special" },
      { name: "Sonic Screech", damage: 50, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Stealth Attack", damage: 0, type: "Status" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,2,5,6,8,11]
  },

  {
    dragonId: 37,
    name: "Triple Stryke",
    type: "Electric",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/85/Triple_Stryke.png",
    moveset: [
      { name: "Electric Shock", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Thunder Strike", damage: 90, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Electric Wave", damage: 80, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Zap Stun", damage: 0, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,3,6,7,9,10]
  },

  {
    dragonId: 38,
    name: "Thunderpede",
    type: "Electric",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/4/4b/Thunderpede.png",
    moveset: [
      { name: "Electric Shock", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Thunder Spin", damage: 80, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Electric Wave", damage: 80, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Zap Stun", damage: 0, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,3,6,7,9,10]
  },

  {
    dragonId: 39,
    name: "Whispering Death (Adult)",
    type: "Earth",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/0b/Whispering_Death.png",
    moveset: [
      { name: "Burrow", damage: 0, type: "Status" },
      { name: "Claw Slash", damage: 70, type: "Physical" },
      { name: "Tail Whip", damage: 60, type: "Physical" },
      { name: "Sonic Screech", damage: 55, type: "Special" },
      { name: "Fire Breath", damage: 90, type: "Special" },
      { name: "Wing Slam", damage: 65, type: "Physical" },
      { name: "Sandstorm", damage: 80, type: "Special" },
      { name: "Spin Attack", damage: 70, type: "Physical" },
      { name: "Earthquake", damage: 85, type: "Special" },
      { name: "Roar", damage: 45, type: "Status" },
      { name: "Smoke Puff", damage: 0, type: "Status" },
      { name: "Stealth Approach", damage: 0, type: "Status" },
    ],
    equippedMoves: [1,4,6,8,9,11]
  },

  {
    dragonId: 40,
    name: "Night Fury (Toothless)",
    type: "Wind",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/5d/Toothless.png",
    moveset: [
      { name: "Plasma Blast", damage: 95, type: "Special" },
      { name: "Tail Swipe", damage: 70, type: "Physical" },
      { name: "Stealth Flight", damage: 0, type: "Status" },
      { name: "Sonic Screech", damage: 60, type: "Special" },
      { name: "Fireball Burst", damage: 85, type: "Special" },
      { name: "Shadow Dive", damage: 70, type: "Special" },
      { name: "Claw Slash", damage: 70, type: "Physical" },
      { name: "Wing Buffet", damage: 65, type: "Physical" },
      { name: "Rapid Fire Plasma", damage: 90, type: "Special" },
      { name: "Dragon Roar", damage: 45, type: "Status" },
      { name: "Camouflage", damage: 0, type: "Status" },
      { name: "Evasive Roll", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,1,5,6,8,11]
  },

  {
    dragonId: 41,
    name: "Grim Gnasher",
    type: "Dark",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/c/cd/Grim_Gnasher.png",
    moveset: [
      { name: "Bite", damage: 75, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Jaw Snap", damage: 80, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Frenzy Bite", damage: 85, type: "Physical" },
      { name: "Ferocious Roar", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 42,
    name: "Submaripper",
    type: "Water",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/8a/Submaripper.png",
    moveset: [
      { name: "Water Jet", damage: 80, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Underwater Slash", damage: 75, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Aqua Shield", damage: 0, type: "Status" },
      { name: "Whirlpool", damage: 80, type: "Special" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 43,
    name: "Small Shadow Wing",
    type: "Shadow",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e5/Small_Shadow_Wing.png",
    moveset: [
      { name: "Shadow Strike", damage: 85, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Cloak", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Dark Pulse", damage: 80, type: "Special" },
      { name: "Nightfall", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 44,
    name: "Large Shadow Wing",
    type: "Shadow",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/fb/Large_Shadow_Wing.png",
    moveset: [
      { name: "Shadow Strike", damage: 90, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 65, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 75, type: "Physical" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Cloak", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 80, type: "Special" },
      { name: "Tail Spin", damage: 70, type: "Physical" },
      { name: "Dark Pulse", damage: 85, type: "Special" },
      { name: "Eclipse", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 45,
    name: "Fire Night Terror",
    type: "Fire",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/6e/Fire_Night_Terror.png",
    moveset: [
      { name: "Fireball", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 65, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 75, type: "Physical" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Flame Burst", damage: 80, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Inferno", damage: 90, type: "Special" },
      { name: "Blaze Wave", damage: 85, type: "Special" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 46,
    name: "Sandbuster",
    type: "Sand",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e0/Sandbuster.png",
    moveset: [
      { name: "Sand Toss", damage: 75, type: "Special" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Burrow", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Sandstorm", damage: 80, type: "Special" },
      { name: "Dust Cloud", damage: 0, type: "Status" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 47,
    name: "Foreverwing",
    type: "Wind",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f0/Foreverwing.png",
    moveset: [
      { name: "Wing Slash", damage: 75, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wind Gust", damage: 70, type: "Special" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Glide", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Whirlwind", damage: 80, type: "Special" },
      { name: "Air Cutter", damage: 75, type: "Special" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 48,
    name: "Sword Stealer",
    type: "Blade",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/55/Sword_Stealer.png",
    moveset: [
      { name: "Blade Slash", damage: 85, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Quick Slash", damage: 75, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Parry", damage: 0, type: "Status" },
      { name: "Counter Attack", damage: 80, type: "Physical" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 49,
    name: "Chimeragon",
    type: "Hybrid",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/07/Chimeragon.png",
    moveset: [
      { name: "Multi-Bite", damage: 80, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Fire Breath", damage: 85, type: "Special" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Poison Fang", damage: 75, type: "Special" },
      { name: "Acid Spray", damage: 70, type: "Special" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    dragonId: 50,
    name: "Egg Biter",
    type: "Earth",
    imageUrl: "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/81/Egg_Biter.png",
    moveset: [
      { name: "Peck", damage: 65, type: "Physical" },
      { name: "Tail Whip", damage: 55, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 40, type: "Status" },
      { name: "Dive Bomb", damage: 70, type: "Physical" },
      { name: "Stomp", damage: 65, type: "Physical" },
      { name: "Egg Toss", damage: 75, type: "Physical" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Earthquake", damage: 75, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Incubate", damage: 0, type: "Status" },
      { name: "Shell Smash", damage: 80, type: "Physical" },
    ],
    equippedMoves: [0,2,6,7,10,11]
  },

  {
    id: 51,
    name: "Small Shadow Wing",
    type: "Shadow",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/34/Small_Shadow_Wing.png",
    moves: [
      { name: "Shadow Slash", damage: 85, type: "Physical" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Night Cloak", damage: 0, type: "Status" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Dark Pulse", damage: 90, type: "Special" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Phantom Strike", damage: 95, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Shadow Bind", damage: 0, type: "Status" },
      { name: "Eclipse Blast", damage: 100, type: "Special" },
    ],
    equippedMoves: [0, 2, 6, 8, 9, 11]
  },

  {
    id: 52,
    name: "Large Shadow Wing",
    type: "Shadow",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/b2/Large_Shadow_Wing.png",
    moves: [
      { name: "Shadow Slash", damage: 90, type: "Physical" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slam", damage: 70, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Night Cloak", damage: 0, type: "Status" },
      { name: "Stomp", damage: 75, type: "Physical" },
      { name: "Dark Pulse", damage: 100, type: "Special" },
      { name: "Quick Bite", damage: 55, type: "Physical" },
      { name: "Phantom Strike", damage: 100, type: "Special" },
      { name: "Tail Spin", damage: 70, type: "Physical" },
      { name: "Shadow Bind", damage: 0, type: "Status" },
      { name: "Eclipse Blast", damage: 105, type: "Special" },
    ],
    equippedMoves: [0, 2, 5, 6, 9, 11]
  },

  {
    id: 53,
    name: "Fire Night Terror",
    type: "Fire",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/3d/Fire_Night_Terror.png",
    moves: [
      { name: "Fire Breath", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Inferno", damage: 100, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Flame Burst", damage: 85, type: "Special" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Heat Wave", damage: 95, type: "Special" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Lava Surge", damage: 90, type: "Special" },
      { name: "Blaze Dive", damage: 100, type: "Special" },
    ],
    equippedMoves: [0, 4, 6, 8, 10, 11]
  },

  {
    id: 54,
    name: "Foreverwing",
    type: "Ice",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f2/Foreverwing.png",
    moves: [
      { name: "Ice Breath", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Frostbite", damage: 85, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Frozen Shield", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 45, type: "Physical" },
      { name: "Blizzard", damage: 95, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Ice Lance", damage: 100, type: "Special" },
      { name: "Frost Nova", damage: 110, type: "Special" },
    ],
    equippedMoves: [0, 4, 8, 9, 10, 11]
  },

  {
    id: 55,
    name: "Sword Stealer",
    type: "Steel",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f7/Sword_Stealer.png",
    moves: [
      { name: "Sword Slash", damage: 85, type: "Physical" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 65, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Quick Strike", damage: 75, type: "Physical" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Blade Spin", damage: 90, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Piercing Thrust", damage: 95, type: "Physical" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Counterattack", damage: 0, type: "Status" },
      { name: "Shadow Slash", damage: 85, type: "Physical" },
    ],
    equippedMoves: [0, 4, 6, 8, 9, 11]
  },

  {
    id: 56,
    name: "Chimeragon",
    type: "Dragon",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/bc/Chimeragon_Riders_of_Berk.png",
    moves: [
      { name: "Fire Breath", damage: 85, type: "Special" },
      { name: "Poison Sting", damage: 70, type: "Special" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slam", damage: 65, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Acid Spit", damage: 80, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Claw Swipe", damage: 75, type: "Physical" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Venom Fang", damage: 90, type: "Special" },
      { name: "Flame Charge", damage: 95, type: "Special" },
    ],
    equippedMoves: [0, 1, 5, 8, 10, 11]
  },

  {
    id: 57,
    name: "Egg Biter",
    type: "Beast",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/36/Egg_Biter.png",
    moves: [
      { name: "Peck", damage: 45, type: "Physical" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Flap", damage: 50, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 60, type: "Physical" },
      { name: "Stomp", damage: 55, type: "Physical" },
      { name: "Beak Strike", damage: 70, type: "Physical" },
      { name: "Nest Guard", damage: 0, type: "Status" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Egg Throw", damage: 75, type: "Special" },
      { name: "Wing Slash", damage: 65, type: "Physical" },
      { name: "Dive Bomb", damage: 80, type: "Physical" },
    ],
    equippedMoves: [0, 4, 6, 9, 10, 11]
  },

  {
    id: 58,
    name: "Prickleboggle",
    type: "Poison",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f1/Prickleboggle_Book_of_Dragons.png",
    moves: [
      { name: "Spike Shot", damage: 85, type: "Physical" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Quill Toss", damage: 80, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 55, type: "Physical" },
      { name: "Spine Shield", damage: 0, type: "Status" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Poison Quills", damage: 90, type: "Special" },
      { name: "Charge", damage: 75, type: "Physical" },
      { name: "Backstab", damage: 95, type: "Special" },
    ],
    equippedMoves: [0, 4, 6, 9, 10, 11]
  },

  {
    id: 59,
    name: "Luminous Krayfin",
    type: "Light",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/68/Krayfin.png",
    moves: [
      { name: "Light Beam", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Flash", damage: 0, type: "Status" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Glow Shield", damage: 0, type: "Status" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Radiant Strike", damage: 95, type: "Special" },
      { name: "Illuminate", damage: 0, type: "Status" },
      { name: "Starburst", damage: 100, type: "Special" },
    ],
    equippedMoves: [0, 5, 6, 9, 10, 11]
  },

  {
    id: 60,
    name: "Crimson Goregutter",
    type: "Fire",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/3e/Crimson_Goregutter_Titans_Uprising.png",
    moves: [
      { name: "Fire Breath", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slam", damage: 65, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Blood Surge", damage: 100, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 55, type: "Physical" },
      { name: "Claw Swipe", damage: 75, type: "Physical" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Flame Charge", damage: 95, type: "Special" },
      { name: "Berserk Slash", damage: 85, type: "Physical" },
      { name: "Fiery Roar", damage: 100, type: "Special" },
    ],
    equippedMoves: [0, 4, 6, 7, 9, 11]
  },

  {
    id: 61,
    name: "Death Song",
    type: "Sound",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/68/Death_Song_Dragons_Rise_of_Berk.png",
    moves: [
      { name: "Sonic Screech", damage: 90, type: "Special" },
      { name: "Wing Slash", damage: 65, type: "Physical" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Sound Wave", damage: 75, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Echo Pulse", damage: 85, type: "Special" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Silent Flight", damage: 0, type: "Status" },
      { name: "Shriek Blast", damage: 100, type: "Special" },
      { name: "Vibrating Claws", damage: 90, type: "Special" },
    ],
    equippedMoves: [0, 4, 6, 7, 10, 11]
  },

  {
    id: 62,
    name: "Snow Wraith",
    type: "Ice",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/b3/Snow_Wraith_Rob.png",
    moves: [
      { name: "Ice Breath", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Frostbite", damage: 85, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 45, type: "Physical" },
      { name: "Snowstorm", damage: 95, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Freeze Blast", damage: 100, type: "Special" },
      { name: "Blizzard Wing", damage: 90, type: "Special" },
      { name: "Chill Claws", damage: 85, type: "Physical" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 63,
    name: "Night Terror",
    type: "Shadow",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/8/86/Night_Terror_Titans_Uprising.png",
    moves: [
      { name: "Shadow Claw", damage: 85, type: "Physical" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slash", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Dark Pulse", damage: 90, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Night Howl", damage: 0, type: "Status" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Stealth Flight", damage: 0, type: "Status" },
      { name: "Terror Screech", damage: 100, type: "Special" },
      { name: "Phantom Strike", damage: 95, type: "Special" },
    ],
    equippedMoves: [0, 4, 6, 10, 11, 8]
  },

  {
    id: 64,
    name: "Catastrophic Quaken",
    type: "Earth",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/e/e6/Catastrophic_Quaken.png",
    moves: [
      { name: "Earthquake Stomp", damage: 190, type: "Physical" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Ground Pound", damage: 80, type: "Physical" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Shockwave", damage: 85, type: "Special" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Tremor Burst", damage: 100, type: "Special" },
      { name: "Stone Throw", damage: 175, type: "Physical" },
      { name: "Quake Roar", damage: 0, type: "Status" },
    ],
    equippedMoves: [0, 4, 6, 7, 9, 10]
  },

  {
    id: 65,
    name: "Eruptodon",
    type: "Fire",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/63/Eruptodon_Rob.png",
    moves: [
      { name: "Lava Spit", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Magma Blast", damage: 195, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Fireball", damage: 85, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Heat Wave", damage: 100, type: "Special" },
      { name: "Molten Claws", damage: 90, type: "Physical" },
      { name: "Eruption", damage: 110, type: "Special" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 66,
    name: "Submaripper",
    type: "Water",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/c/c0/Submaripper_Rescue_Riders.png",
    moves: [
      { name: "Water Jet", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slash", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Whirlpool", damage: 90, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Bubble Blast", damage: 80, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Underwater Rush", damage: 100, type: "Special" },
      { name: "Tidal Wave", damage: 105, type: "Special" },
      { name: "Ripper Claws", damage: 95, type: "Physical" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 67,
    name: "Singetail",
    type: "Sound",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f2/Singetail_Book_of_Dragons.png",
    moves: [
      { name: "Sonic Screech", damage: 90, type: "Special" },
      { name: "Tail Whip", damage: 40, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Echo Pulse", damage: 85, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Vibrato Blast", damage: 95, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Sound Barrier", damage: 0, type: "Status" },
      { name: "Harmonic Roar", damage: 100, type: "Special" },
      { name: "Songwave", damage: 110, type: "Special" },
    ],
    equippedMoves: [0, 4, 6, 7, 10, 11]
  },

  {
    id: 68,
    name: "Triple Stryke",
    type: "Electric",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/b2/Triple_Stryke_Titans_Uprising.png",
    moves: [
      { name: "Triple Tail Strike", damage: 90, type: "Physical" },
      { name: "Wing Slam", damage: 65, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Lightning Charge", damage: 100, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Shock Wave", damage: 85, type: "Special" },
      { name: "Tail Spin", damage: 60, type: "Physical" },
      { name: "Thunder Roar", damage: 0, type: "Status" },
      { name: "Electric Burst", damage: 95, type: "Special" },
      { name: "Claw Slash", damage: 75, type: "Physical" },
      { name: "Bolt Rush", damage: 105, type: "Special" },
    ],
    equippedMoves: [0, 3, 6, 9, 10, 11]
  },

  {
    id: 69,
    name: "Dramillion",
    type: "Fire",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/c/c6/Dramillion_Book_of_Dragons.png",
    moves: [
      { name: "Fire Blast", damage: 85, type: "Special" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slash", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Molten Burst", damage: 90, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Lava Wave", damage: 95, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Flame Charge", damage: 100, type: "Special" },
      { name: "Ember Claws", damage: 80, type: "Physical" },
      { name: "Heat Shield", damage: 0, type: "Status" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 70,
    name: "Grim Gnasher",
    type: "Dark",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/e/e4/Grim_Gnasher_Titans_Uprising.png",
    moves: [
      { name: "Jaw Snap", damage: 85, type: "Physical" },
      { name: "Tail Whip", damage: 45, type: "Physical" },
      { name: "Wing Slam", damage: 60, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Dark Bite", damage: 90, type: "Special" },
      { name: "Stomp", damage: 70, type: "Physical" },
      { name: "Quick Bite", damage: 50, type: "Physical" },
      { name: "Shadow Swipe", damage: 95, type: "Special" },
      { name: "Tail Spin", damage: 65, type: "Physical" },
      { name: "Fear Howl", damage: 0, type: "Status" },
      { name: "Bone Crunch", damage: 100, type: "Special" },
      { name: "Stealth Pounce", damage: 105, type: "Special" },
    ],
    equippedMoves: [0, 4, 6, 7, 10, 11]
  },

  {
    id: 71,
    name: "Cavern Crasher",
    type: "Earth",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/2/2f/Cavern_Crasher_Artwork.png",
    moves: [
      { name: "Rock Throw", damage: 180, type: "Physical" },
      { name: "Tail Whip", damage: 100, type: "Physical" },
      { name: "Wing Slam", damage: 120, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Earthquake", damage: 200, type: "Physical" },
      { name: "Stomp", damage: 130, type: "Physical" },
      { name: "Quick Bite", damage: 110, type: "Physical" },
      { name: "Boulder Crush", damage: 210, type: "Physical" },
      { name: "Tail Spin", damage: 115, type: "Physical" },
      { name: "Stone Shield", damage: 0, type: "Status" },
      { name: "Rock Slide", damage: 190, type: "Physical" },
      { name: "Cave Stomp", damage: 220, type: "Physical" },
    ],
    equippedMoves: [0, 4, 7, 10, 11, 5]
  },
  {
    id: 72,
    name: "Fireworm Queen",
    type: "Fire",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/e/e7/Fireworm_Queen_Artwork.png",
    moves: [
      { name: "Fire Breath", damage: 140, type: "Special" },
      { name: "Tail Whip", damage: 70, type: "Physical" },
      { name: "Wing Slash", damage: 85, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Lava Spit", damage: 160, type: "Special" },
      { name: "Stomp", damage: 100, type: "Physical" },
      { name: "Quick Bite", damage: 75, type: "Physical" },
      { name: "Flame Whip", damage: 155, type: "Special" },
      { name: "Tail Spin", damage: 90, type: "Physical" },
      { name: "Heat Wave", damage: 180, type: "Special" },
      { name: "Burning Sting", damage: 165, type: "Special" },
      { name: "Molten Tail", damage: 170, type: "Physical" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 73,
    name: "Snowtail",
    type: "Ice",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f7/Snowtail_Artwork.png",
    moves: [
      { name: "Ice Breath", damage: 135, type: "Special" },
      { name: "Tail Whip", damage: 65, type: "Physical" },
      { name: "Wing Slash", damage: 80, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Frostbite", damage: 140, type: "Special" },
      { name: "Stomp", damage: 95, type: "Physical" },
      { name: "Quick Bite", damage: 70, type: "Physical" },
      { name: "Snowstorm", damage: 160, type: "Special" },
      { name: "Tail Spin", damage: 85, type: "Physical" },
      { name: "Blizzard Wing", damage: 175, type: "Special" },
      { name: "Chill Claws", damage: 120, type: "Physical" },
      { name: "Freeze Blast", damage: 180, type: "Special" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 74,
    name: "Snifflehide",
    type: "Poison",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/6b/Snifflehide_Artwork.png",
    moves: [
      { name: "Poison Blast", damage: 110, type: "Special" },
      { name: "Tail Whip", damage: 60, type: "Physical" },
      { name: "Wing Slam", damage: 80, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Smoke Screen", damage: 0, type: "Status" },
      { name: "Stomp", damage: 90, type: "Physical" },
      { name: "Quick Bite", damage: 75, type: "Physical" },
      { name: "Nose Swipe", damage: 95, type: "Physical" },
      { name: "Poison tail", damage: 185, type: "Poison" },
      { name: "Sneak Attack", damage: 105, type: "Physical" },
      { name: "Smokescreen Cloak", damage: 0, type: "Status" },
      { name: "Pounce", damage: 110, type: "Physical" },
    ],
    equippedMoves: [0, 4, 7, 9, 11, 5]
  },

  {
    id: 75,
    name: "Hobgobbler",
    type: "Poison",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/a/aa/Hobgobbler_Artwork.png",
    moves: [
      { name: "Burp Blast", damage: 115, type: "Special" },
      { name: "Tail Whip", damage: 70, type: "Physical" },
      { name: "Wing Slam", damage: 80, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Gas Cloud", damage: 140, type: "Special" },
      { name: "Stomp", damage: 95, type: "Physical" },
      { name: "Quick Bite", damage: 75, type: "Physical" },
      { name: "Slam", damage: 110, type: "Physical" },
      { name: "Tail Spin", damage: 90, type: "Physical" },
      { name: "Poison Gas", damage: 130, type: "Special" },
      { name: "Headbutt", damage: 120, type: "Physical" },
      { name: "Fart Attack", damage: 180, type: "Special" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 76,
    name: "Vinetail",
    type: "Poison",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/d/d2/Vinetail_Artwork.png",
    moves: [
      { name: "Vine Lash", damage: 125, type: "Physical" },
      { name: "Tail Whip", damage: 65, type: "Physical" },
      { name: "Wing Slash", damage: 85, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Poison Sting", damage: 140, type: "Special" },
      { name: "Stomp", damage: 90, type: "Physical" },
      { name: "Quick Bite", damage: 75, type: "Physical" },
      { name: "Vine Wrap", damage: 130, type: "Special" },
      { name: "Tail Spin", damage: 80, type: "Physical" },
      { name: "Toxic Spray", damage: 135, type: "Special" },
      { name: "Claw Slash", damage: 110, type: "Physical" },
      { name: "Camouflage", damage: 0, type: "Status" },
    ],
    equippedMoves: [0, 4, 7, 9, 10, 11]
  },

  {
    id: 77,
    name: "Featherhide",
    type: "Wind",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/7/7a/Featherhide_Artwork.png",
    moves: [
      { name: "Feather Flurry", damage: 115, type: "Physical" },
      { name: "Tail Whip", damage: 65, type: "Physical" },
      { name: "Wing Shield", damage: 0, type: "Status" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Silent Pounce", damage: 110, type: "Physical" },
      { name: "Camouflage", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 80, type: "Physical" },
      { name: "Wind Slash", damage: 140, type: "Special" },
      { name: "Tail Spin", damage: 90, type: "Physical" },
      { name: "Echo Burst", damage: 130, type: "Special" },
      { name: "Stealth Glide", damage: 0, type: "Status" },
      { name: "Feather Storm", damage: 170, type: "Special" },
    ],
    equippedMoves: [0, 4, 7, 9, 11, 6]
  },

  {
    id: 78,
    name: "Mist Twister",
    type: "Wind",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f3/Mist_Twister_Artwork.png",
    moves: [
      { name: "Mist Cloud", damage: 120, type: "Special" },
      { name: "Tail Whip", damage: 70, type: "Physical" },
      { name: "Wing Cyclone", damage: 130, type: "Special" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Twister Dash", damage: 150, type: "Special" },
      { name: "Fog Cloak", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 85, type: "Physical" },
      { name: "Vortex Pulse", damage: 140, type: "Special" },
      { name: "Tail Spin", damage: 95, type: "Physical" },
      { name: "Mist Slash", damage: 130, type: "Special" },
      { name: "Spiral Surge", damage: 140, type: "Special" },
      { name: "Drift Blast", damage: 160, type: "Special" },
    ],
    equippedMoves: [0, 2, 4, 7, 11, 6]
  },

  {
    id: 79,
    name: "Gembreaker",
    type: "Earth",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/c/c2/Gembreaker_Artwork.png",
    moves: [
      { name: "Crystal Bite", damage: 140, type: "Physical" },
      { name: "Tail Smash", damage: 110, type: "Physical" },
      { name: "Wing Slam", damage: 120, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Gem Spike", damage: 155, type: "Special" },
      { name: "Stone Skin", damage: 0, type: "Status" },
      { name: "Quick Bite", damage: 90, type: "Physical" },
      { name: "Prism Beam", damage: 165, type: "Special" },
      { name: "Tail Spin", damage: 95, type: "Physical" },
      { name: "Armor Up", damage: 0, type: "Status" },
      { name: "Crystalline Roar", damage: 130, type: "Special" },
      { name: "Ground Shatter", damage: 180, type: "Physical" },
    ],
    equippedMoves: [0, 1, 4, 7, 11, 10]
  },

  {
    id: 80,
    name: "Sky Torcher",
    type: "Fire",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/67/Sky_Torcher_Artwork.png",
    moves: [
      { name: "Sky Flame", damage: 140, type: "Special" },
      { name: "Tail Whip", damage: 70, type: "Physical" },
      { name: "Wing Slash", damage: 85, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Flame Trail", damage: 150, type: "Special" },
      { name: "Dive Bomb", damage: 120, type: "Physical" },
      { name: "Quick Bite", damage: 80, type: "Physical" },
      { name: "Fire Cyclone", damage: 160, type: "Special" },
      { name: "Tail Spin", damage: 90, type: "Physical" },
      { name: "Scorching Dash", damage: 155, type: "Special" },
      { name: "Sky Burst", damage: 170, type: "Special" },
      { name: "Ash Cloud", damage: 0, type: "Status" },
    ],
    equippedMoves: [0, 4, 7, 10, 5, 6]
  },

  {
    id: 81,
    name: "Fault Ripper",
    type: "Earth",
    image: "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/3c/Fault_Ripper_Artwork.png", // example real image from HTTYD wiki
    moves: [
      { name: "Earthquake", damage: 150, type: "Physical" },
      { name: "Tail Slam", damage: 100, type: "Physical" },
      { name: "Wing Slam", damage: 90, type: "Physical" },
      { name: "Roar", damage: 0, type: "Status" },
      { name: "Fault Line Charge", damage: 130, type: "Physical" },
      { name: "Rock Barrage", damage: 110, type: "Physical" },
      { name: "Quick Bite", damage: 80, type: "Physical" },
      { name: "Ground Quake", damage: 140, type: "Physical" },
      { name: "Tail Spin", damage: 95, type: "Physical" },
      { name: "Fissure", damage: 160, type: "Physical" },
      { name: "Tremor Roar", damage: 0, type: "Status" },
      { name: "Plate Crush", damage: 170, type: "Physical" },
    ],
    equippedMoves: [0, 1, 2, 4, 6, 11]
  },
];

module.exports = dragons;
