const getInteractions = require("../util/getInteractions.js");

const interactions = [];

for (const file of getInteractions) {
  let command = require(`./${file}`);
  interactions.push(command);
}

module.exports = {
  name: "Update Interactions",
  pattern: /update_interactions/i,
  execute: async function(interaction, Client) {
    for (const i of interactions) {
      console.log(`Adding ${i.name}`);
      await Client.api
        .applications(Client.user.id)
        .guilds(interaction.guild_id)
        .commands.post({
          data: i.addInteraction
        });
    }
    Client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Slash Commands Updated!"
        }
      }
    });
  },
  addInteraction: {
    name: "update_interactions",
    description: "Update the slash commands for this bot."
  }
};
