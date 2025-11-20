const allItems = require('../items');

module.exports = {
  name: 'forge',
  description: 'Use a material to permanently boost a dragon\'s stats.',
  async execute(context) {
    const { sock, from, msg, player, args, savePlayer } = context;

    // Command usage: %forge <party_id> <item_id>
    if (args.length < 2) {
      return sock.sendMessage(from, { text: 'You must specify the party ID of the dragon and the material you want to use. Example: `%forge 1 steel_scale`' }, { quoted: msg });
    }

    const partyIndex = parseInt(args[0]) - 1;
    if (isNaN(partyIndex) || !player.party[partyIndex]) {
      return sock.sendMessage(from, { text: 'Invalid party ID.' }, { quoted: msg });
    }

    const itemId = args[1];
    const item = allItems[itemId];

    if (!item || item.type !== 'material') {
      return sock.sendMessage(from, { text: 'You can only forge with items of type "material".' }, { quoted: msg });
    }

    if (!player.inventory[itemId] || player.inventory[itemId] < 1) {
      return sock.sendMessage(from, { text: `You do not have any ${item.name}.` }, { quoted: msg });
    }

    const dragon = player.party[partyIndex];

    // Consume the item
    player.inventory[itemId] -= 1;
    if (player.inventory[itemId] <= 0) {
      delete player.inventory[itemId];
    }

    // Apply stat boost
    let boostMessage = '';
    switch(itemId) {
      case 'steel_scale':
        dragon.bonus_defense = (dragon.bonus_defense || 0) + 5;
        boostMessage = `Your ${dragon.name}'s defenses were permanently bolstered! New Bonus Defense: ${dragon.bonus_defense}`;
        break;
      case 'fire_essence':
        dragon.bonus_attack = (dragon.bonus_attack || 0) + 5;
        boostMessage = `Your ${dragon.name}'s attack power was permanently increased! New Bonus Attack: ${dragon.bonus_attack}`;
        break;
      default:
        // Return the item if it has no effect
        player.inventory[itemId] = (player.inventory[itemId] || 0) + 1;
        return sock.sendMessage(from, { text: 'This material has no forge effect.'}, { quoted: msg });
    }

    savePlayer();

    await sock.sendMessage(from, { text: boostMessage }, { quoted: msg });
  },
};
