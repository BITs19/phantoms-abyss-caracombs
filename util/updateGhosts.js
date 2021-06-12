const Ghosts = require("./getGhostsTable.js");
const PickedPellets = require("./getPickedPellets.js");
const Players = require("./getPlayerTable.js");
const Maze = require("./getMazeTable.js");

module.exports = async function(userId, serverId) {
  Ghosts.sync();
  Players.sync();
  Maze.sync();
  const player = await Players.findOne({
    where: { id: userId, serversId: serverId },
    attributes: ["level", "ghostTimer", "roomId", "direction"]
  }); 
  const playerRoom = await Maze.findOne({
    where: { id: player.roomId },
    attributes: ["row", "col"]
  });
  let serverPlayerGhosts = await Ghosts.findAll({
    where: { playerId: userId, serverId: serverId }
  });
  const pelletsCount = await PickedPellets.count({
    where: { serverID: serverId }
  });
  let scatter;
  if (player.level < 2) {
    if (
      player.ghostTimer <= 7 ||
      (player.ghostTimer > 27 && player.ghostTimer <= 34) ||
      (player.ghostTimer > 54 && player.ghostTimer <= 59) ||
      (player.ghostTimer > 79 && player.ghostTimer <= 84)
    )
      scatter = true;
    else scatter = false;
  } else if (player.level < 5) {
    if (
      player.ghostTimer <= 7 ||
      (player.ghostTimer > 27 && player.ghostTimer <= 34) ||
      (player.ghostTimer > 54 && player.ghostTimer <= 59) ||
      player.ghostTimer == 1089
    )
      scatter = true;
    else scatter = false;
  } else {
    if (
      player.ghostTimer <= 5 ||
      (player.ghostTimer > 25 && player.ghostTimer <= 30) ||
      (player.ghostTimer > 50 && player.ghostTimer <= 55) ||
      player.ghostTimer == 1089
    )
      scatter = true;
    else scatter = false;
  }
  for (let ghost of serverPlayerGhosts) {
    console.log(ghost.subId);
    let targetId = null;
    let targetRow = null;
    let targetCol = null;

    /*This huge switch statement establishes the information needed
    for each ghost to decide which direction it needs to go
    
    case 0 -> red
    case 1 -> pink
    case 2 -> blue
    case 3 -> orange */
    switch (ghost.subId) {
      case 0:
        if (scatter) targetId = 26;
        else targetId = player.roomId;
        break;
      case 1:
        if (player.ghostTimer >= 1) {
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
            let twoSpotsInFrontOfPlayerRow;
            let twoSpotsInFrontOfPlayerColumn;
            switch (player.direction) {
              case "south":
                twoSpotsInFrontOfPlayerRow = playerRoom.row + 2;
                twoSpotsInFrontOfPlayerColumn = playerRoom.col;
                break;
              case "east":
                twoSpotsInFrontOfPlayerRow = playerRoom.row;
                twoSpotsInFrontOfPlayerColumn = playerRoom.col + 2;
                break;
              case "west":
                twoSpotsInFrontOfPlayerRow = playerRoom.row;
                twoSpotsInFrontOfPlayerColumn = playerRoom.col - 2;
                break;
              case "north":
                //replicating bug in original game
                twoSpotsInFrontOfPlayerRow = playerRoom.row - 2;
                twoSpotsInFrontOfPlayerColumn = playerRoom.col - 2;
                break;
            }
            const red = await Ghosts.findone({
              where: { playerId: userId, serverId: serverId, subId: 0 },
              attributes: ["roomId"]
            });
            const redRoom = await Maze.findOne({
              where: { id: red.roomId },
              attributes: ["row", "col"]
            });
            const rowDif = twoSpotsInFrontOfPlayerRow - redRoom.row;
            const colDif = twoSpotsInFrontOfPlayerColumn - redRoom.col;
            targetRow = twoSpotsInFrontOfPlayerRow + rowDif;
            targetCol = twoSpotsInFrontOfPlayerColumn + colDif;
          }
        }
        break;
      case 3:
        const orangeRoom = await Maze.findOne({
          where: { id: ghost.roomId },
          attributes: ["row", "col"]
        });
        const orangeRowDif = orangeRoom.row - playerRoom.row;
        const orangeColDif = orangeRoom.col - playerRoom.col;
        const dist = Math.sqrt(
          orangeRowDif * orangeRowDif + orangeColDif * orangeColDif
        );
        if (scatter || dist < 8) targetId = 981;
        else targetId = player.roomId;
        break;
    }

    //now each ghost has the info it needs to decide which way to go.

    const ghostRoom = Maze.findOne({ where: { id: ghost.roomId } });
    let options = [];
    //these if statements are ordered such that lower indecies in options are at a higher preference
    if (ghost.direction != "south" && ghostRoom.north != null)
      options.push(ghostRoom.north);    
    if (ghost.direction != "east" && ghostRoom.west != null)
      options.push(ghostRoom.west);
    if (ghost.direction != "north" && ghostRoom.south != null)
      options.push(ghostRoom.south);
    if (ghost.direction != "west" && ghostRoom.east != null)
      options.push(ghostRoom.east);
    
    //if there is only one option, not further decision needs to be made;
    if(options.length == 1){
      ghost.roomId = options[0];
      ghost.save();
      continue;
    }else{
      if(targetRow != null){
        const targetRoom = await Maze.findOne({where: {id: targetId}, attributes: ["row", "col"]});
        targetRow = targetRoom.row;
        targetCol = targetRoom.col;
      }
    }
  }
};
