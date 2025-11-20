// activeEvents.js
// A persistent store for global events like the world boss.

const fs = require('fs');
const path = './activeEvents.json';

let activeEvents = {
  worldBoss: null,
};

function loadEvents() {
  if (fs.existsSync(path)) {
    const raw = fs.readFileSync(path);
    activeEvents = JSON.parse(raw);
  }
}

function saveEvents() {
  fs.writeFileSync(path, JSON.stringify(activeEvents, null, 2));
}

// Load events on startup
loadEvents();

module.exports = {
  get: () => activeEvents,
  set: (events) => {
    activeEvents = events;
    saveEvents();
  },
  save: saveEvents,
};
