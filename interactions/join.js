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
});

const Servers = sequelize.define("Servers", {
  serverId: {
    type: Sequelize.STRING(25),
    primarykey: true,
    allowNull: false,
    unique: true
  },
  channelId: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  prefix: {
    type: Sequelize.STRING(5),
    allowNull: false,
    defaultValue: "!"
  }
});

module.exports = {
  name: "join",
  pattern: /join/i,
  execute(interaction, Client) {
    Players.create({id: interaction.member.user.id})
    Client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Pong!"
        }
      }
    });
  },
  addInteraction: {
    name: "join",
    description: "Begin your adventure in the Phantom's Abyss Catacombs!!"
  }
};
