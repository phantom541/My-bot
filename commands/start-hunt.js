module.exports = {
    name: 'start-hunt',
    description: 'Initiate your dragonbound saga.',
    async execute({ reply, player }) {
        if (player.progression.adventureStarted) {
            return reply('❌ You have already started your hunt!');
        }

        player.progression.adventureStarted = true;
        await reply('🐉 *Welcome to the world of DragonBound!* 🐉\n\nYou are now ready to hunt and train dragons. Use `%spawn` (if you are an owner) or wait for wild dragons to appear to begin your collection!');
    }
};
