const Ghosts = require("./getGhostsTable.js");
const PickedPellets = require("./getPickedPellets.js");

module.exports = async function(userId, serverId) {
  Ghosts.sync();
  let serverPlayerGhosts = await Ghosts.findAll({
    where: { playerId: userId, serverId: serverId }
  });
};
