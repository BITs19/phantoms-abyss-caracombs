const Ghosts = require("./getGhostsTable.js");
const PickedPellets = require("./getPickedPellets.js");
const Players = require("./getPlayerTable.js");
const Maze = require("./getMazeTable.js");

module.exports = async function(userId, serverId) {
  Ghosts.sync();
  Players.sync();
  Maze.sync();
  const player = await Players.findOne({
    where: { id: userId, serverId: serverId }
  });
  const playerRoom = await Maze.findOne({ where: { id: player.roomId } });
  let serverPlayerGhosts = await Ghosts.findAll({
    where: { playerId: userId, serverId: serverId }
  });
  for (let ghost of serverPlayerGhosts) {
    let targetId = null;
    let targetRow = null;
    let targetCol = null;
    switch (ghost.subId) {
      case 0:
        targetId = player.roomId;
        break;
      case 1:
        if (player.timer >= 1) {
          switch (player.direction) {
            case "south":
              targetRow = playerRoom.row + 4;
              targetCol = playerRoom.col;
              break;
            case "east":
              targetRow = playerRoom.row;
              targetCol = playerRoom.col + 4;
              break;
            case "west":
              targetRow = playerRoom.row;
              targetCol = playerRoom.col - 4;
              break;
            case "north":
              //replicating bug in original game
              targetRow = playerRoom.row - 4;
              targetCol = playerRoom.col - 4;
          }
          ghost.active = true;
        }
    }
  }
};
