const Maze = require("../util/getMazeTable.js");
const Players = require("../util/getPlayerTable.js");
const PickedPellets = require("../util/getPickedPellets.js");

module.exports = {
  name: "room",
  pattern: /\broom\b/i,
  execute: async function(interaction, Client) {
    const player = await Players.findOne({
      where: { id: interaction.member.user.id, serversId: interaction.guild_id }
    });
    if (!player)
      return Client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content:
                "You don't appear to be a player in this server!\nUse /join to start your journey!"
            }
          }
        });
    const room = await Maze.findOne({ where: { id: player.roomId } });
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
    
    const pellet = PickedPellets.findOne({where: {roomId: player.roomId, serverId: player.servers

    embed.description = description;

    return Client.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data: {
            embeds: [embed]
          }
        }
      });
  },
  addInteraction: {
    name: "room",
    description: "Look around the room you're in."
  }
};
