const Maze = require("../util/getMazeTable.js");
const Players = require("../util/getPlayerTable.js");
const PickedPellets = require("../util/getPickedPellets.js");
const { Sequelize, Op } = require("sequelize");
const getDisplayName = require("../util/getDisplayName.js");
//const Discord = require("discord.js");
const replyInteraction = require("../util/replyInteraction.js");

module.exports = {
  name: "room",
  pattern: /\broom\b/i,
  execute: async function(interaction, Client) {
    Maze.sync();
    Players.sync();
    PickedPellets.sync();
    const player = await Players.findOne({
      where: { id: interaction.member.user.id, serversId: interaction.guild_id }
    });
    if (!player)
      return replyInteraction(
        Client,
        interaction,
        "You don't appear to be a player in this server! Use /join start your adventure!"
      );
    //console.log(player.roomId);
    //console.log(player.datavalues);
    const room = await Maze.findOne({
      where: { id: player.roomId }
    });
    //console.log("here 1");

    let embed = {
      title: "You look around the room."
    };
    let description = "There are passages to the ";
    let directions = [];
    if (room.north) {
      directions.push("North");
    }
    if (room.south) {
      directions.push("South");
    }
    if (room.east) {
      directions.push("East");
    }
    if (room.west) {
      directions.push("West");
    }
    for (let i = 0; i < directions.length; i++) {
      if (i === directions.length - 1) description += "and ";
      description += directions[i];
      if (i != directions.length - 1) description += ", ";
      else description += ". ";
    }

    description += "You could /move in one of those directions.\n";

    const pellet = await PickedPellets.count({
      where: {
        roomId: player.roomId,
        serverId: player.serversId
      }
    });

    if (pellet === 0 && room.pellet) {
      description +=
        "\nThere is a floating, glowing, apple-sized object in center of the room. It looks delicious. You could probably /eat it.\n";
    }

    if (pellet === 0 && room.energizer) {
      description +=
        "\nThere is a floating, glowing, melon-sized object in center of the room, flashing a bright red and green. It looks delicious. You could probably /eat it.\n";
    }

    const others = await Players.findAll({
      where: {
        roomId: room.id,
        id: { [Op.not]: player.id }
      }
    });
    //console.log(others);

    if (others.length === 0) {
      description += "\nYou are alone.\n";
    } else {
      description += "\nYou see ";
      for (let i = 0; i < others.length; i++) {
        if (others.length > 1 && i === others.length - 1) description += "and ";
        description += await getDisplayName(Client, others[i].id, interaction);
        if (others.length > 2 && i != others.length - 1) description += ", ";
      }
      description += " in the same room as you. ";
      if (player.energized) {
        description +=
          "They are glowing a purple color. They look delicious. You could probably /eat them.";
      }
      description += "\n";
    }

    embed.description = description;

    replyInteraction(Client, interaction, "", [embed]);
  },
  addInteraction: {
    name: "room",
    description: "Look around the room you're in."
  }
};
