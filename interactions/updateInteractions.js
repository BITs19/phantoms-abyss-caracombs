const getInteractions = require("../util/getInteractions.js");

module.exports = {
  name: "Update Interactions",
  pattern: /update_interactions/i,
  execute: async function(interaction, Client) {
    //console.log(interactions);
    const interactions = [];
    for (const file of getInteractions) {
      let command = require(`./${file}`);
      interactions.push(command);
    }

    for (const i of interactions) {
      console.log(`Adding ${i.name}`);
      Client.api
        .applications(Client.user.id)
        .guilds(interaction.guild_id)
        .commands.post({
          data: i.addInteraction
        })
        .catch(error => {
        console.log(error)
          Client.api
            .interactions(interaction.id, interaction.token)
            .callback.post({
              data: {
                type: 4,
                data: {
                  content: `There was an error updating ${i.name}. It has been logged`
                }
              }
            });
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
