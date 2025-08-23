const fs = require('fs');
// The user's data is in a file that exports an array called 'dragons'.
// So I need to destructure it from the required module.
const dragons = require('./temp_dragon_data.js');

// Function to shuffle an array and return the first n elements
function getRandomMoves(moveset, n) {
  const shuffled = [...moveset].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const processedDragons = dragons.map(dragon => {
    // There are some inconsistencies in the provided data. Some have 'moves', some 'moveset'.
    // Some have 'imageUrl', some 'image'. I need to handle this.
    const moveset = dragon.moveset || dragon.moves;
    const imageUrl = dragon.imageUrl || dragon.image;

    // Also, some dragons have 'id' instead of 'dragonId'.
    const id = dragon.dragonId || dragon.id;

    if (!moveset) {
        console.warn(`Dragon ${dragon.name} has no moveset.`);
        return {
            id: id,
            name: dragon.name,
            type: dragon.type,
            imageUrl: imageUrl,
            moves: []
        };
    }

    return {
        id: id,
        name: dragon.name,
        type: dragon.type,
        imageUrl: imageUrl,
        moves: getRandomMoves(moveset, 4),
        level: 1,
        xp: 0
    };
});

// I need to filter out any dragons that might be null or undefined due to data inconsistencies
const finalDragons = processedDragons.filter(d => d);

// The user's data has some duplicates. I'll remove them.
const uniqueDragons = finalDragons.filter((dragon, index, self) =>
    index === self.findIndex((d) => (
        d.id === dragon.id
    ))
);


const fileContent = `const dragons = ${JSON.stringify(uniqueDragons, null, 2)};\n\nmodule.exports = dragons;`;

fs.writeFileSync('./dragonData.js', fileContent);

console.log('dragonData.js has been updated with the new dragon data and 4 random moves per dragon.');
