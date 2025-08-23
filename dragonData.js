const dragons = [
  {
    "id": 1,
    "name": "Night Fury (Toothless)",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/3/33/Toothless_Season_6.png",
    "moves": [
      {
        "name": "Rapid Fire Plasma",
        "damage": 180,
        "type": "Special"
      },
      {
        "name": "Shadow Dive",
        "damage": 170,
        "type": "Physical"
      },
      {
        "name": "Sonic Screech",
        "damage": 150,
        "type": "Special"
      },
      {
        "name": "Dragon Roar",
        "damage": 180,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 2,
    "name": "Light Fury",
    "type": "Fire",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/7/7a/Light_Fury_HTTYD3.png",
    "moves": [
      {
        "name": "Plasma Blast",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Whirlwind",
        "damage": 60,
        "type": "Special"
      },
      {
        "name": "Swift Strike",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Blinding Flash",
        "damage": 75,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 3,
    "name": "Deadly Nadder (Stormfly)",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/d/d0/Stormfly_HTTYD2.png",
    "moves": [
      {
        "name": "Fire Blast",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Tail Lash",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Fire Trail",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Rapid Fire Spikes",
        "damage": 85,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 4,
    "name": "Monstrous Nightmare (Hookfang)",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/62/Hookfang.png",
    "moves": [
      {
        "name": "Scorching Dive",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Ground Slam",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 5,
    "name": "Gronckle (Meatlug)",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/05/Meatlug_Season_3.png",
    "moves": [
      {
        "name": "Stomp",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Wing Shield",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Fireball",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Defensive Curl",
        "damage": 0,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 6,
    "name": "Hideous Zippleback (Barf & Belch)",
    "type": "Poison",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/b/b1/Barf_and_Belch_HTTYD2.png",
    "moves": [
      {
        "name": "Twin Flame Breath",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Gas Cloud",
        "damage": 70,
        "type": "Special"
      },
      {
        "name": "Sonic Boom",
        "damage": 50,
        "type": "Special"
      },
      {
        "name": "Double Bite",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 7,
    "name": "Terrible Terror",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/74/Terrible_Terror_HTTYD.png",
    "moves": [
      {
        "name": "Fire Breath",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Rapid Flight",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Claw Slash",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 8,
    "name": "Thunderdrum",
    "type": "Electric",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/79/Thunderdrum_Season_3.png",
    "moves": [
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Tremor Stomp",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Tail Smash",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Thunder Clap",
        "damage": 75,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 9,
    "name": "Scauldron",
    "type": "Water",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f0/Scauldron_HTTYD2.png",
    "moves": [
      {
        "name": "Water Blast",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Wing Slam",
        "damage": 50,
        "type": "Physical"
      },
      {
        "name": "Acid Spray",
        "damage": 70,
        "type": "Special"
      },
      {
        "name": "Tail Lash",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 10,
    "name": "Skrill",
    "type": "Electric",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/3/32/Skrill.png",
    "moves": [
      {
        "name": "Stealth Glide",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Claw Slash",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Thunder Roar",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Shockwave",
        "damage": 75,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 11,
    "name": "Changewing",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/eb/Changewing.png",
    "moves": [
      {
        "name": "Fire Blast",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Claw Swipe",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Wing Slash",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 12,
    "name": "Whispering Death",
    "type": "Earth",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/0b/Whispering_Death.png",
    "moves": [
      {
        "name": "Sandstorm",
        "damage": 70,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Earthquake",
        "damage": 80,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 13,
    "name": "Red Death",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/7f/Red_Death.png",
    "moves": [
      {
        "name": "Fire Blast",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Ground Pound",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Tail Smash",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 14,
    "name": "Bewilderbeast",
    "type": "Ice",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/1/19/Bewilderbeast.png",
    "moves": [
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Wing Buffet",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Thunder Roar",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Ground Pound",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 15,
    "name": "Stormcutter (Cloudjumper)",
    "type": "Wind",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/6f/Cloudjumper.png",
    "moves": [
      {
        "name": "Feather Flurry",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Wing Buffet",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Claw Swipe",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 16,
    "name": "Eruptodon",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/2/29/Eruptodon_HTTYD2.png",
    "moves": [
      {
        "name": "Rock Throw",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Heat Spin",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Flame Wave",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 17,
    "name": "Deathgripper",
    "type": "Ice",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/ee/Deathgripper.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Ice Shards",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Ice Claw",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Tail Slash",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 18,
    "name": "Seashocker",
    "type": "Electric",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/2/2e/Seashocker.png",
    "moves": [
      {
        "name": "Sonic Boom",
        "damage": 60,
        "type": "Special"
      },
      {
        "name": "Thunder Strike",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Stun Attack",
        "damage": 0,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 19,
    "name": "Snaptrapper",
    "type": "Earth",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f9/Snaptrapper.png",
    "moves": [
      {
        "name": "Spin Attack",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Bite",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 20,
    "name": "Typhoomerang",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/c/cf/Typhoomerang.png",
    "moves": [
      {
        "name": "Boomerang Slash",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 21,
    "name": "Timberjack",
    "type": "Wood",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/6b/Timberjack_Season_4.png",
    "moves": [
      {
        "name": "Leaf Storm",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Branch Throw",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Earthquake",
        "damage": 80,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 22,
    "name": "Boneknapper",
    "type": "Bone",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/87/Boneknapper_S3.png",
    "moves": [
      {
        "name": "Roar Stun",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 23,
    "name": "Scuttleclaw",
    "type": "Insect",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/3/34/Scuttleclaw.png",
    "moves": [
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 24,
    "name": "Snafflefang",
    "type": "Toothless",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/7/7d/Snafflefang_S3.png",
    "moves": [
      {
        "name": "Stealth Attack",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 25,
    "name": "Raincutter",
    "type": "Water",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e0/Raincutter.png",
    "moves": [
      {
        "name": "Water Spin",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 26,
    "name": "Hobblegrunt",
    "type": "Mud",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/69/Hobblegrunt.png",
    "moves": [
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Earthquake",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 27,
    "name": "Shovelhelm",
    "type": "Armor",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/a/af/Shovelhelm.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Armor Bash",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 28,
    "name": "Hotburple",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/1/18/Hotburple.png",
    "moves": [
      {
        "name": "Flame Shield",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 29,
    "name": "Smothering Smokebreath",
    "type": "Smoke",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/5d/Smothering_Smokebreath.png",
    "moves": [
      {
        "name": "Earthquake",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Smoke Bomb",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Camouflage",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 30,
    "name": "Speed Stinger",
    "type": "Insect",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f7/Speed_Stinger.png",
    "moves": [
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 31,
    "name": "Gronckle",
    "type": "Rock",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/57/Gronckle.png",
    "moves": [
      {
        "name": "Rock Throw",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Molten Burst",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 32,
    "name": "Hideous Zippleback",
    "type": "Electric",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/a/a6/Hideous_Zippleback.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Dual Fire Blast",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Electric Shock",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 33,
    "name": "Monstrous Nightmare",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/c/c3/Monstrous_Nightmare.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Flame Spin",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 34,
    "name": "Scauldron",
    "type": "Water",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e0/Scauldron.png",
    "moves": [
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Wing Slash",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Steam Burst",
        "damage": 75,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 35,
    "name": "Thunderdrum",
    "type": "Electric",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e4/Thunderdrum.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Sonic Boom",
        "damage": 60,
        "type": "Special"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 36,
    "name": "Terrible Terror",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/fb/Terrible_Terror.png",
    "moves": [
      {
        "name": "Flame Spin",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Stealth Attack",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Camouflage",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Sonic Screech",
        "damage": 50,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 37,
    "name": "Triple Stryke",
    "type": "Electric",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/85/Triple_Stryke.png",
    "moves": [
      {
        "name": "Camouflage",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Electric Shock",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Zap Stun",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 38,
    "name": "Thunderpede",
    "type": "Electric",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/4/4b/Thunderpede.png",
    "moves": [
      {
        "name": "Electric Wave",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 39,
    "name": "Whispering Death (Adult)",
    "type": "Earth",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/0b/Whispering_Death.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Stealth Approach",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Fire Breath",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Roar",
        "damage": 45,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 40,
    "name": "Night Fury (Toothless)",
    "type": "Wind",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/5d/Toothless.png",
    "moves": [
      {
        "name": "Camouflage",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Evasive Roll",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Tail Swipe",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Sonic Screech",
        "damage": 60,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 41,
    "name": "Grim Gnasher",
    "type": "Dark",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/c/cd/Grim_Gnasher.png",
    "moves": [
      {
        "name": "Jaw Snap",
        "damage": 80,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Ferocious Roar",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Earthquake",
        "damage": 75,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 42,
    "name": "Submaripper",
    "type": "Water",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/8a/Submaripper.png",
    "moves": [
      {
        "name": "Water Jet",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Earthquake",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Underwater Slash",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 43,
    "name": "Small Shadow Wing",
    "type": "Shadow",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e5/Small_Shadow_Wing.png",
    "moves": [
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 44,
    "name": "Large Shadow Wing",
    "type": "Shadow",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/fb/Large_Shadow_Wing.png",
    "moves": [
      {
        "name": "Earthquake",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Eclipse",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Tail Spin",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 45,
    "name": "Fire Night Terror",
    "type": "Fire",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/6/6e/Fire_Night_Terror.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 46,
    "name": "Sandbuster",
    "type": "Sand",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/e/e0/Sandbuster.png",
    "moves": [
      {
        "name": "Dust Cloud",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Dive Bomb",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Sand Toss",
        "damage": 75,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 47,
    "name": "Foreverwing",
    "type": "Wind",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/f/f0/Foreverwing.png",
    "moves": [
      {
        "name": "Wing Slash",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Whirlwind",
        "damage": 80,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 48,
    "name": "Sword Stealer",
    "type": "Blade",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/5/55/Sword_Stealer.png",
    "moves": [
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Parry",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Earthquake",
        "damage": 75,
        "type": "Special"
      },
      {
        "name": "Quick Bite",
        "damage": 60,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 49,
    "name": "Chimeragon",
    "type": "Hybrid",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/0/07/Chimeragon.png",
    "moves": [
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Earthquake",
        "damage": 75,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 50,
    "name": "Egg Biter",
    "type": "Earth",
    "imageUrl": "https://vignette.wikia.nocookie.net/howtotrainyourdragon/images/8/81/Egg_Biter.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Egg Toss",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 40,
        "type": "Status"
      },
      {
        "name": "Tail Whip",
        "damage": 55,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 51,
    "name": "Small Shadow Wing",
    "type": "Shadow",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/34/Small_Shadow_Wing.png",
    "moves": [
      {
        "name": "Eclipse Blast",
        "damage": 100,
        "type": "Special"
      },
      {
        "name": "Shadow Slash",
        "damage": 85,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 40,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 52,
    "name": "Large Shadow Wing",
    "type": "Shadow",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/b2/Large_Shadow_Wing.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Shadow Slash",
        "damage": 90,
        "type": "Physical"
      },
      {
        "name": "Eclipse Blast",
        "damage": 105,
        "type": "Special"
      },
      {
        "name": "Phantom Strike",
        "damage": 100,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 53,
    "name": "Fire Night Terror",
    "type": "Fire",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/3d/Fire_Night_Terror.png",
    "moves": [
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Blaze Dive",
        "damage": 100,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 54,
    "name": "Foreverwing",
    "type": "Ice",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f2/Foreverwing.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Frozen Shield",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Stomp",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 55,
    "name": "Sword Stealer",
    "type": "Steel",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f7/Sword_Stealer.png",
    "moves": [
      {
        "name": "Piercing Thrust",
        "damage": 95,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Counterattack",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Sword Slash",
        "damage": 85,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 56,
    "name": "Chimeragon",
    "type": "Dragon",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/bc/Chimeragon_Riders_of_Berk.png",
    "moves": [
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Flame Charge",
        "damage": 95,
        "type": "Special"
      },
      {
        "name": "Poison Sting",
        "damage": 70,
        "type": "Special"
      },
      {
        "name": "Claw Swipe",
        "damage": 75,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 57,
    "name": "Egg Biter",
    "type": "Beast",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/36/Egg_Biter.png",
    "moves": [
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Beak Strike",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Wing Flap",
        "damage": 50,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 40,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 58,
    "name": "Prickleboggle",
    "type": "Poison",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f1/Prickleboggle_Book_of_Dragons.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 55,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Backstab",
        "damage": 95,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 45,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 59,
    "name": "Luminous Krayfin",
    "type": "Light",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/68/Krayfin.png",
    "moves": [
      {
        "name": "Light Beam",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Radiant Strike",
        "damage": 95,
        "type": "Special"
      },
      {
        "name": "Quick Bite",
        "damage": 50,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 60,
    "name": "Crimson Goregutter",
    "type": "Fire",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/3e/Crimson_Goregutter_Titans_Uprising.png",
    "moves": [
      {
        "name": "Berserk Slash",
        "damage": 85,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Blood Surge",
        "damage": 100,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 61,
    "name": "Death Song",
    "type": "Sound",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/68/Death_Song_Dragons_Rise_of_Berk.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 50,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Vibrating Claws",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Stomp",
        "damage": 70,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 62,
    "name": "Snow Wraith",
    "type": "Ice",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/b3/Snow_Wraith_Rob.png",
    "moves": [
      {
        "name": "Tail Whip",
        "damage": 40,
        "type": "Physical"
      },
      {
        "name": "Ice Breath",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Blizzard Wing",
        "damage": 90,
        "type": "Special"
      },
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 63,
    "name": "Night Terror",
    "type": "Shadow",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/8/86/Night_Terror_Titans_Uprising.png",
    "moves": [
      {
        "name": "Wing Slash",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 40,
        "type": "Physical"
      },
      {
        "name": "Phantom Strike",
        "damage": 95,
        "type": "Special"
      },
      {
        "name": "Shadow Claw",
        "damage": 85,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 64,
    "name": "Catastrophic Quaken",
    "type": "Earth",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/e/e6/Catastrophic_Quaken.png",
    "moves": [
      {
        "name": "Tremor Burst",
        "damage": 100,
        "type": "Special"
      },
      {
        "name": "Stomp",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 40,
        "type": "Physical"
      },
      {
        "name": "Shockwave",
        "damage": 85,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 65,
    "name": "Eruptodon",
    "type": "Fire",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/63/Eruptodon_Rob.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 60,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Fireball",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Magma Blast",
        "damage": 195,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 66,
    "name": "Submaripper",
    "type": "Water",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/c/c0/Submaripper_Rescue_Riders.png",
    "moves": [
      {
        "name": "Tidal Wave",
        "damage": 105,
        "type": "Special"
      },
      {
        "name": "Water Jet",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 45,
        "type": "Physical"
      },
      {
        "name": "Bubble Blast",
        "damage": 80,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 67,
    "name": "Singetail",
    "type": "Sound",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f2/Singetail_Book_of_Dragons.png",
    "moves": [
      {
        "name": "Vibrato Blast",
        "damage": 95,
        "type": "Special"
      },
      {
        "name": "Quick Bite",
        "damage": 50,
        "type": "Physical"
      },
      {
        "name": "Stomp",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Harmonic Roar",
        "damage": 100,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 68,
    "name": "Triple Stryke",
    "type": "Electric",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/b/b2/Triple_Stryke_Titans_Uprising.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 50,
        "type": "Physical"
      },
      {
        "name": "Wing Slam",
        "damage": 65,
        "type": "Physical"
      },
      {
        "name": "Shock Wave",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 69,
    "name": "Dramillion",
    "type": "Fire",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/c/c6/Dramillion_Book_of_Dragons.png",
    "moves": [
      {
        "name": "Ember Claws",
        "damage": 80,
        "type": "Physical"
      },
      {
        "name": "Fire Blast",
        "damage": 85,
        "type": "Special"
      },
      {
        "name": "Flame Charge",
        "damage": 100,
        "type": "Special"
      },
      {
        "name": "Lava Wave",
        "damage": 95,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 70,
    "name": "Grim Gnasher",
    "type": "Dark",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/e/e4/Grim_Gnasher_Titans_Uprising.png",
    "moves": [
      {
        "name": "Jaw Snap",
        "damage": 85,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Tail Whip",
        "damage": 45,
        "type": "Physical"
      },
      {
        "name": "Quick Bite",
        "damage": 50,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 71,
    "name": "Cavern Crasher",
    "type": "Earth",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/2/2f/Cavern_Crasher_Artwork.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 120,
        "type": "Physical"
      },
      {
        "name": "Tail Whip",
        "damage": 100,
        "type": "Physical"
      },
      {
        "name": "Rock Throw",
        "damage": 180,
        "type": "Physical"
      },
      {
        "name": "Stone Shield",
        "damage": 0,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 72,
    "name": "Fireworm Queen",
    "type": "Fire",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/e/e7/Fireworm_Queen_Artwork.png",
    "moves": [
      {
        "name": "Heat Wave",
        "damage": 180,
        "type": "Special"
      },
      {
        "name": "Burning Sting",
        "damage": 165,
        "type": "Special"
      },
      {
        "name": "Quick Bite",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Fire Breath",
        "damage": 140,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 73,
    "name": "Snowtail",
    "type": "Ice",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f7/Snowtail_Artwork.png",
    "moves": [
      {
        "name": "Chill Claws",
        "damage": 120,
        "type": "Physical"
      },
      {
        "name": "Wing Slash",
        "damage": 80,
        "type": "Physical"
      },
      {
        "name": "Freeze Blast",
        "damage": 180,
        "type": "Special"
      },
      {
        "name": "Frostbite",
        "damage": 140,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 74,
    "name": "Snifflehide",
    "type": "Poison",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/6b/Snifflehide_Artwork.png",
    "moves": [
      {
        "name": "Quick Bite",
        "damage": 75,
        "type": "Physical"
      },
      {
        "name": "Nose Swipe",
        "damage": 95,
        "type": "Physical"
      },
      {
        "name": "Smokescreen Cloak",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 75,
    "name": "Hobgobbler",
    "type": "Poison",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/a/aa/Hobgobbler_Artwork.png",
    "moves": [
      {
        "name": "Headbutt",
        "damage": 120,
        "type": "Physical"
      },
      {
        "name": "Slam",
        "damage": 110,
        "type": "Physical"
      },
      {
        "name": "Gas Cloud",
        "damage": 140,
        "type": "Special"
      },
      {
        "name": "Stomp",
        "damage": 95,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 76,
    "name": "Vinetail",
    "type": "Poison",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/d/d2/Vinetail_Artwork.png",
    "moves": [
      {
        "name": "Vine Wrap",
        "damage": 130,
        "type": "Special"
      },
      {
        "name": "Stomp",
        "damage": 90,
        "type": "Physical"
      },
      {
        "name": "Vine Lash",
        "damage": 125,
        "type": "Physical"
      },
      {
        "name": "Poison Sting",
        "damage": 140,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 77,
    "name": "Featherhide",
    "type": "Wind",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/7/7a/Featherhide_Artwork.png",
    "moves": [
      {
        "name": "Silent Pounce",
        "damage": 110,
        "type": "Physical"
      },
      {
        "name": "Wing Shield",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Feather Storm",
        "damage": 170,
        "type": "Special"
      },
      {
        "name": "Echo Burst",
        "damage": 130,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 78,
    "name": "Mist Twister",
    "type": "Wind",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/f/f3/Mist_Twister_Artwork.png",
    "moves": [
      {
        "name": "Mist Cloud",
        "damage": 120,
        "type": "Special"
      },
      {
        "name": "Tail Whip",
        "damage": 70,
        "type": "Physical"
      },
      {
        "name": "Tail Spin",
        "damage": 95,
        "type": "Physical"
      },
      {
        "name": "Vortex Pulse",
        "damage": 140,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 79,
    "name": "Gembreaker",
    "type": "Earth",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/c/c2/Gembreaker_Artwork.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 120,
        "type": "Physical"
      },
      {
        "name": "Roar",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Stone Skin",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Crystal Bite",
        "damage": 140,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 80,
    "name": "Sky Torcher",
    "type": "Fire",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/6/67/Sky_Torcher_Artwork.png",
    "moves": [
      {
        "name": "Wing Slash",
        "damage": 85,
        "type": "Physical"
      },
      {
        "name": "Sky Flame",
        "damage": 140,
        "type": "Special"
      },
      {
        "name": "Ash Cloud",
        "damage": 0,
        "type": "Status"
      },
      {
        "name": "Fire Cyclone",
        "damage": 160,
        "type": "Special"
      }
    ],
    "level": 1,
    "xp": 0
  },
  {
    "id": 81,
    "name": "Fault Ripper",
    "type": "Earth",
    "imageUrl": "https://static.wikia.nocookie.net/howtotrainyourdragon/images/3/3c/Fault_Ripper_Artwork.png",
    "moves": [
      {
        "name": "Wing Slam",
        "damage": 90,
        "type": "Physical"
      },
      {
        "name": "Tail Slam",
        "damage": 100,
        "type": "Physical"
      },
      {
        "name": "Ground Quake",
        "damage": 140,
        "type": "Physical"
      },
      {
        "name": "Rock Barrage",
        "damage": 110,
        "type": "Physical"
      }
    ],
    "level": 1,
    "xp": 0
  }
];

module.exports = dragons;