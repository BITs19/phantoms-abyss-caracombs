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

const Ghosts = sequelize.define("ghosts", {
  serverId: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  playerId: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  roomId: {
    type: Sequelize.INTEGER(4),
    allowNull: false,
    defaultValue: 406
  },
  direction: {
    type: Sequelize.STRING(5),
    allowNull: false,
    defaultValue: "west"
  },
  movement: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  subId: {
    type: Sequelize.INTEGER(1),
    allowNull: false
  }
});
