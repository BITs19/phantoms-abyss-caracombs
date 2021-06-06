const Maze = require("../util/getMazeTable.js");
const Players = require("../util/getPlayerTable.js");

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
              content: "You don't appear to be a player in this server!"
            }
          }
        });
    const room = await Maze.findOne({where: {id: player.roomId}})
    let embed = {
      title: "You look around the room"
      }
  },
  addInteraction: {
    name: "room",
    description: "Look around the room you're in."
  }
};
