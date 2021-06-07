//const fs = require("fs");
//const Maze = require("../util/getMazeTable.js");
const replyInteraction = require("../util/replyInteraction.js");

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
      /*Maze.sync();
      const jsonString = fs.readFileSync("/app/assets/pacman.json");
      const json = JSON.parse(jsonString);
      for (let c of json) {
        if (c.north == -1) c.north = null;
        if (c.south == -1) c.south = null;
        if (c.east == -1) c.east = null;
        if (c.west == -1) c.west = null;
      }
      console.log(json[0]);
      Maze.bulkCreate(json);*/
      /*Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "Pong!"
          }
        }
      });*/
      replyInteraction("Pong!");
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
