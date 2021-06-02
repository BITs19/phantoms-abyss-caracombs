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
    allowNull: false
  }
});

module.exports = {
  name: "join",
  pattern: /join/i,
  execute(interaction, Client) {
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
