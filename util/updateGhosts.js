const Ghosts = require("./getGhostsTable.js");
const PickedPellets = require("./getPickedPellets.js");
const Players = require("./getPlayerTable.js");
const Maze = require("./getMazeTable.js");

module.exports = async function(userId, serverId) {
  Ghosts.sync();
  Players.sync();
  Maze.sync();
  const player = await Players.findOne({
    where: { id: userId, serversId: serverId }
  });
  const playerRoom = await Maze.findOne({ where: { id: player.roomId } });
  let serverPlayerGhosts = await Ghosts.findAll({
    where: { playerId: userId, serverId: serverId }
  });
  const pelletsCount = await PickedPellets.count({
    where: { serverID: serverId }
  });
  let scatter;
  if (player.level < 2) {
    if (
      player.timer <= 7 ||
      (player.timer > 27 && player.timer <= 34) ||
      (player.timer > 54 && player.timer <= 59) ||
      (player.timer > 79 && player.timer <= 84)
    )
      scatter = true;
    else scatter = false;
  } else if (player.level < 5) {
    if (
      player.timer <= 7 ||
      (player.timer > 27 && player.timer <= 34) ||
      (player.timer > 54 && player.timer <= 59) ||
      player.timer == 1089
    )
      scatter = true;
    else scatter = false;
  } else {
    if (
      player.timer <= 5 ||
      (player.timer > 25 && player.timer <= 30) ||
      (player.timer > 50 && player.timer <= 55) ||
      player.timer == 1089
    )
      scatter = true;
    else scatter = false;
  }
  for (let ghost of serverPlayerGhosts) {
    console.log(ghost.subId);
    let targetId = null;
    let targetRow = null;
    let targetCol = null;
    switch (ghost.subId) {
      case 0:
        if (scatter) targetId = 26;
        else targetId = player.roomId;
        break;
      case 1:
        if (player.timer >= 1) {
          ghost.active = true;
          if (scatter) targetId = 3;
          else {
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
                break;
            }
          }
        }
        break;
      case 2:
        if (scatter) targetId = 1008;
        else {
          if (pelletsCount > 30) {
            ghost.active = true;
            let 
          }
        }
        break;
    }
  }
};
