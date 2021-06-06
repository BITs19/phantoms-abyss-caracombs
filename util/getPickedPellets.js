const Sequelize = require("sequelize");
//const { Op } = require("sequelize");
const sequelize = new Sequelize(
  "database",
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite"
  }
);

const PickedPellets = sequelize.define("pickedPellets", {
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  serverId: {
    type: Sequelize.STRING(25),
    allowNull: false,
    primaryKey: true
  }
});
