const Players = require("../util/getPlayerTable.js");
const Servers = require("../util/getServersTable.js");
const Maze = require("../util/getMazeTable.js");
const replyInteraction = require("../util/replyInteraction.js");

module.exports = {
  name: "Drop",
  pattern: /\bdrop\b/i,
  execute: function(interaction, Client) {
    if (interaction.member.user.id != "272162236632530944")
      return replyInteraction(
        Client,
        interaction,
        "You must be Michael to use this command!"
      );
    /*return Client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content: "You must be Michael to execute this command!"
            }
          }
        });*/
    if (interaction.data.options[0].name === "option") {
      let outString = "";
      const option = interaction.data.options[0].value;
      if (option % 2 == 0) {
        Servers.drop();
        outString += "Servers, ";
      }
      if (option % 7 == 0) {
        Players.drop();
        outString += "Players, ";
      }
      if (option % 5 == 0) {
        Maze.drop();
        outString += "Maze, ";
      }

      if (outString === "") outString = "No ";
      outString += "tables dropped!";
      /*Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: outString
          }
        }
      });*/
      replyInteraction(Client, interaction, outString);
    }
  },
  addInteraction: {
    name: "drop",
    description:
      "Drops all tables in the database. Can only be executed by Michael",
    options: [
      {
        type: 4,
        name: "option",
        description: "The code for which tables to drop.",
        required: true
      }
    ]
  }
};
