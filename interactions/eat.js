const replyInteraction = require("../util/replyInteraction.js");
const Maze = require("../util/getMazeTable.js");
const Players = require("../util/getPlayerTable.js");
const PickedPellets = require("../util/getPickedPellets.js");
const { Op } = require("sequelize");

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

    let playersInRoom = null;
    if (player.energized) {
      playersInRoom = await Players.findAll({
        where: { roomId: player.roomId, id: { [Op.not]: player.id } }
      });
    }

    const room = await Maze.findOne({ where: { id: player.roomId } });

    const pelletPicked = await PickedPellets.count({
      where: { roomId: room.id, serverId: interaction.guild_id }
    });

    if (pelletPicked == 0) {
      if (room.pellet) {
        await PickedPellets.create({
          roomId: room.id,
          serverId: interaction.guild_id
        });
        player.score += 10;
        player.save();
        return replyInteraction(
          Client,
          interaction,
          "You eat the object. It is delicious. You feel accomplished."
        );
      } else if (room.energizer) {
        await PickedPellets.create({
          roomId: room.id,
          serverId: interaction.guild_id
        });
        player.score += 50;
        player.energized = true;
        player.energizeTimer = 30;
        player.save();
      } else {
        return replyInteraction(
          Client,
          interaction,
          "There is nothing in this room to eat."
        );
      }
    }
    replyInteraction(Client, interaction, "foo");
  },
  addInteraction: {
    name: "eat",
    description: "Eat something in the room."
  }
};
