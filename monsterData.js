const monsters = [
    {
        "id": 1001,
        "name": "Goblin Scout",
        "hp": 500,
        "atk": 100,
        "def": 50,
        "spd": 80,
        "type": "Earth",
        "imageUrl": "https://images.unsplash.com/photo-1666705520192-418fb959244e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxHb2JsaW4lMjBTY291dCUyMGZhbnRhc3klMjBhcnR8ZW58MHx8fHwxNzU2NjU0MzU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Quick Stab",
                "damage": 120
            },
            {
                "name": "Rock Throw",
                "damage": 100
            }
        ]
    },
    {
        "id": 1002,
        "name": "Goblin Brute",
        "hp": 800,
        "atk": 150,
        "def": 80,
        "spd": 40,
        "type": "Earth",
        "imageUrl": "https://images.unsplash.com/photo-1679584052578-803983ee84a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxHb2JsaW4lMjBCcnV0ZSUyMGZhbnRhc3klMjBhcnR8ZW58MHx8fHwxNzU2NjU0MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Heavy Club",
                "damage": 180
            },
            {
                "name": "Shoulder Charge",
                "damage": 140
            }
        ]
    },
    {
        "id": 1003,
        "name": "Cave Bat",
        "hp": 300,
        "atk": 80,
        "def": 30,
        "spd": 120,
        "type": "Wind",
        "imageUrl": "https://images.unsplash.com/photo-1710343320656-0a96820a49d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTY5NTB8MHwxfHNlYXJjaHwxfHxDYXZlJTIwQmF0JTIwZmFudGFzeSUyMGFydHxlbnwwfHx8fDE3NTY2NTQzNTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "moves": [
            {
                "name": "Leech Bite",
                "damage": 90
            },
            {
                "name": "Wing Flurry",
                "damage": 110
            }
        ]
    }
];

module.exports = monsters;