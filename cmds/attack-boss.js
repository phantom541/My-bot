const activeEvents = require('../activeEvents');

module.exports = {
  name: 'attack-boss',
  description: 'Attack the active world boss.',
  async execute(context) {
    const { sock, from, msg, player, sender } = context;

    const events = activeEvents.get();
    const boss = events.worldBoss;
    if (!boss) {
      return sock.sendMessage(from, { text: 'There is no world boss to attack right now.' }, { quoted: msg });
    }

    if (!player.party || player.party.length === 0) {
      return sock.sendMessage(from, { text: 'You need a dragon in your party to attack the boss!' }, { quoted: msg });
    }

    // Calculate total damage from the player's party
    let totalDamage = 0;
    player.party.forEach(dragon => {
      totalDamage += dragon.level * 10; // Simple damage calculation
      dragon.moves.forEach(move => {
        totalDamage += move.damage;
      });
    });

    // Boss takes damage
    boss.hp -= totalDamage;

    // Record player's contribution
    boss.participants[sender] = (boss.participants[sender] || 0) + totalDamage;
    activeEvents.save();

    let replyMessage = `You dealt *${totalDamage}* damage to the ${boss.name}!\n`;
    replyMessage += `The boss now has *${boss.hp > 0 ? boss.hp : 0}* HP remaining.`;

    await sock.sendMessage(from, { text: replyMessage }, { quoted: msg });

    // If boss is defeated
    if (boss.hp <= 0) {
      // This is handled by the %end-worldboss command for now to allow for a dramatic finish.
      // In a future update, this could trigger automatically.
      await sock.sendMessage(from, { text: `*The ${boss.name} has been defeated! The owner can now distribute rewards with \`%end-worldboss\`!*` });
    }
  },
};
