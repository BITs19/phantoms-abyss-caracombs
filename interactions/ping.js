const fs = require("fs");

module.exports = {
  name: "ping",
  pattern: /ping/i,
  execute: async function(interaction, Client) {
    /*console.log(interaction.member.user.id);
    console.log(
      (await (await Client.guilds.fetch(interaction.guild_id)).members.fetch(
        interaction.member.user.id
      )).id
    );*/
    try {
      const jsonString = fs.readFileSync(
        "https://cdn.glitch.com/778ebb69-2cd4-4967-9ee6-0f93ce3868f9%2Fpacman.json?v=1622834537975"
      );
      const json = JSON.parse(jsonString);
      Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "Pong!"
          }
        }
      });
    } catch (err) {
      console.log(err);
      Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "There was an error. It has been logged!"
          }
        }
      });
    }
  },
  addInteraction: {
    name: "ping",
    description:
      'Respond with "Pong!" To test if the bot is currently listening.'
  }
};
