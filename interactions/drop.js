const Players = require("../util/getPlayerTable.js");
const Servers = require("../util/getServersTable.js");
const Maze = require("../util/getMazeTable.js");
const PickedPellets = require("../util/getPickedPellets.js");
const replyInteraction = require("../util/replyInteraction.js");
const Ghosts = require("../util/getGhostsTable.js");

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
      if (option % 3 == 0) {
        PickedPellets.drop();
        outString += "PickedPellets, ";
      }
      if (option % 11 == 0) {
        Ghosts.drop();
        outString += "Ghosts, ";
      }
      if (outString === "") outString = "No ";
      outString += "tables dropped!";
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

