// groupSettings.js
const fs = require('fs');
const path = './groupSettings.json';

// Load group settings from file or create empty object
function loadGroupSettings() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
  }
  const raw = fs.readFileSync(path);
  return JSON.parse(raw);
}

// Save group settings to file
function saveGroupSettings(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// Get group settings or create new one
function getGroupSettings(groupId) {
  const settings = loadGroupSettings();
  if (!settings[groupId]) {
    settings[groupId] = {
      id: groupId,
      antilink: false,
      slot: false,
      wild: false,
      wildcard: false,
    };
    saveGroupSettings(settings);
  }
  return settings[groupId];
}

// Update group settings
function updateGroupSettings(groupSetting) {
  const settings = loadGroupSettings();
  settings[groupSetting.id] = groupSetting;
  saveGroupSettings(settings);
}

module.exports = {
  getGroupSettings,
  updateGroupSettings,
  loadGroupSettings,
};
