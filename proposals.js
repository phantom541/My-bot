// proposals.js
// A persistent store for marriage proposals.

const fs = require('fs');
const path = './proposals.json';

let proposals = new Map();

function loadProposals() {
  if (fs.existsSync(path)) {
    const raw = fs.readFileSync(path);
    const data = JSON.parse(raw);
    proposals = new Map(data);
  }
}

function saveProposals() {
  const data = Array.from(proposals.entries());
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// Load proposals on startup
loadProposals();

// Clean up expired proposals
setInterval(() => {
    let changed = false;
    for (const [id, proposal] of proposals.entries()) {
        if (Date.now() > proposal.timestamp + (5 * 60 * 1000)) {
            proposals.delete(id);
            changed = true;
        }
    }
    if (changed) saveProposals();
}, 60 * 1000);


module.exports = {
  get: () => proposals,
  set: (id, data) => {
    proposals.set(id, data);
    saveProposals();
  },
  delete: (id) => {
    proposals.delete(id);
    saveProposals();
  }
};
