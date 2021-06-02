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
  }
});

module.exports = {
  name: "Drop",
  pattern: /\bdrop\b/i,
  execute: function(interaction, Client) {
    if (interaction.member.user.id != "272162236632530944")
      return Client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content: "You must be Michael to execute this command!"
            }
          }
        });
    if (interaction.data.options[0].name === "option") {
      let outString = "";
      const option = interaction.data.options[0].value;
      if (option % 2 == 0) {
        Servers.drop();
        outString += "Servers, ";
      }
      if (option % 7 == 0) {
        Players.drop();
        outString += "Players, ";
      }

      if (outString === "") outString = "No ";
      outString += "tables dropped!";
      Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: outString
          }
        }
      });
    }
  },
  addInteraction: {
    name: "drop",
    description:
      "Drops all tables in the database. Can only be executed by Michael",
    options: [
      {
        type: 4,
        name: "option",
        description: "The code for which tables to drop.",
        required: true
      }
    ]
  }
};
