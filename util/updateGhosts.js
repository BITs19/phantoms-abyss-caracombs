const Ghosts = require("./getGhostsTable.js");
const PickedPellets = require("./getPickedPellets.js");
const Players = require("./getPlayerTable.js");

module.exports = async function(userId, serverId) {
  Ghosts.sync();
  Players.sync();
  const player = await Players.findOne({
    where: { id: userId, serverId: serverId }
  });
  let serverPlayerGhosts = await Ghosts.findAll({
    where: { playerId: userId, serverId: serverId }
  });
  for (let ghost of serverPlayerGhosts) {
    let targetId;
    switch (ghost.subId) {
      case 0:
        targetId = player.roomId;
        break;
      case 1:
        if (player.timer >= 1) {
          ghost.active = true;
        }
    }
  }
};
