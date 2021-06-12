//const fs = require("fs");
//const Maze = require("../util/getMazeTable.js");
const replyInteraction = require("../util/replyInteraction.js");
const Players = require("../util/getPlayerTable.js");

module.exports = {
  name: "ping",
  pattern: /ping/i,
  execute: async function(interaction, Client) {
    try {
      //If I need to do something once, I tend to put it in here, hence the try/catch
      replyInteraction(Client, interaction, "Pong!");
    } catch (err) {
      console.log(err);
      replyInteraction(
        Client,
        interaction,
        "There was an error executing that command. It has been logged."
      );
    }
  },
  addInteraction: {
    name: "ping",
    description:
      'Respond with "Pong!" To test if the bot is currently listening.'
  }
};
