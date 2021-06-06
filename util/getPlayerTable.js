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

const Players = sequelize.define("players", {
  id: {
    type: Sequelize.STRING(25),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  carrying: {
    type: Sequelize.INTEGER(1),
    defaultValue: null
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  lives: {
    type: Sequelize.INTEGER(1),
    defaultValue: 3
  },
  serversId: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 742
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  energized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Players;
