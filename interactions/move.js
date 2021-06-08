const replyInteraction = require("../util/replyInteraction.js");
const Players = require("../util/getPlayerTable.js");
const Maze = require("../util/getMazeTable.js");
const Room = require("./room.js");

module.exports = {
  name: "move",
  pattern: /\bmove\b/i,
  execute: async function(interaction, Client) {
    Players.sync();
    Maze.sync();

    const player = await Players.findOne({
      where: {
        id: interaction.member.user.id,
        serversId: interaction.guild_id
      }
    });

    if (!player) {
      return replyInteraction(
        Client,
        interaction,
        "You are not a player in this server. Use /join to start your adventure"
      );
    }

    const oldRoom = await Maze.findOne({
      where: {
        id: player.roomId
      }
    });

    let newRoomId;

    switch (interaction.data.options[0].value.toUpperCase()) {
      case "NORTH":
        break;
      case "SOUTH":
        break;
      case "EAST":
        break;
      case "WEST":
        break;
      default:
        return replyInteraction(
          Client,
          interaction,
          `Invalid direction: ${interaction.data.options[0].value}`
        );
    }

    Room.execute(interaction, Client);
    //replyInteraction(Client, interaction, "Boo");
  },
  addInteraction: {
    name: "move",
    description: "Move in a cardinal direction",
    options: [
      {
        type: 3,
        name: "direction",
        description:
          "The direction to move. Must be from; North, East, South, or West ",
        required: true
      }
    ]
  }
};
