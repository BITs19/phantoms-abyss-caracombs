const replyInteraction = require("../util/replyInteraction.js");
const Maze = require("../util/getMazeTable.js");
const Players = require("../util/getPlayerTable.js");
const PickedPellets = require("../util/getPickedPellets.js");

module.exports = {
  name: "eat",
  pattern: /\beat\b/i,
  execute: async function(interaction, Client) {
    Players.sync();
    const player = await Players.findOne({
      where: { id: interaction.member.user.id, serversId: interaction.guild_id }
    });
    if (!player) {
      return replyInteraction(
        Client,
        interaction,
        "Looks like you're not a player in this server. Use /join to begin your journey!"
      );
    }
    PickedPellets.sync();
    Maze.sync();

    const room = await Maze.findOne({ where: { id: player.roomId } });
    replyInteraction(Client, interaction, "foo");
  },
  addInteraction: {
    name: "eat",
    description: "Eat something in the room."
  }
};
