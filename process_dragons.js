const fs = require('fs');

// The files are not valid JSON, they are JS files.
// I will read them as text and extract the array.
const file1Content = fs.readFileSync('./temp_dragon_data.js', 'utf-8');
const file2Content = fs.readFileSync('./temp_dragon_data_2.js', 'utf-8');

function extractDragonsArray(content) {
    const startIndex = content.indexOf('[');
    const endIndex = content.lastIndexOf(']');
    const arrayString = content.substring(startIndex, endIndex + 1);
    // This is risky, but it's the only way to parse this "almost JSON" data.
    return eval(arrayString);
}

const dragons1 = extractDragonsArray(file1Content);
const dragons2 = extractDragonsArray(file2Content);

const allDragons = [...dragons1, ...dragons2];

// Function to shuffle an array and return the first n elements
function getRandomMoves(moveset, n) {
  const shuffled = [...moveset].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function processDragons(dragons) {
    return dragons.map(dragon => {
        const moveset = dragon.moveset || dragon.moves;
        const imageUrl = dragon.imageUrl || dragon.image;
        const id = dragon.dragonId || dragon.id;

        if (!moveset) {
            console.warn(`Dragon ${dragon.name} has no moveset.`);
            return {
                id: id,
                name: dragon.name,
                type: dragon.type,
                imageUrl: imageUrl,
                moves: [],
                level: 1,
                xp: 0
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
}

const processedDragons = processDragons(allDragons);

const uniqueDragons = processedDragons.filter((dragon, index, self) =>
    dragon && dragon.id && index === self.findIndex((d) => (
        d.id === dragon.id
    ))
);


const fileContent = `const dragons = ${JSON.stringify(uniqueDragons, null, 2)};\n\nmodule.exports = dragons;`;

fs.writeFileSync('./dragonData.js', fileContent);

console.log('dragonData.js has been updated with the new dragon data and 4 random moves per dragon.');
