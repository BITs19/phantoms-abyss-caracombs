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

const Maze = sequelize.define("maze", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  row: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  col: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  north: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  south: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  east: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  west: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  passable: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  pellet: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  energizer: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = Maze;
