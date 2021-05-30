const getInteractions = require("../util/getInteractions.js");

const interactions = [];

for (const file of getInteractions) {
  let command = require(`./${file}`);
  interactions.push(command);
}

module.exports = {
  name: "Update Interactions",
  execute: async function(interaction, Client) {
    for (const i of interactions) {
      
    }
  },
  addInteraction: {
    name: "update_interactions",
    description: "Update the slash commands for this bot."
  }
};
