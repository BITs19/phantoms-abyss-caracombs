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
      const jsonString = fs.readFileSync("/app/assets/pacman.json");
      const json = JSON.parse(jsonString);
      //console.log(json[0]);
      for (let c of json) {
        if(c.north == -1) c.north = null;
        if(c.south == -1) c.south = null;
        if(c.east == -1) c.east = null;
        if(c.west == -1) c.west = null;
      }
      
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
