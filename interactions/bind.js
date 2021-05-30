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

module.exports = {
  name: "bind",
  pattern: /bind/i,
  execute(interaction, Client) {
    Servers.create({
      serverId: interaction.guild_id,
      channelId: interaction.channel_id
    })
      .then(created => {
        Client.api
          .interactions(interaction.id, interaction.token)
          .callback.post({
            data: {
              type: 4,
              data: {
                content: "Phantoms Abyss Catacombs bound to this channel!"
              }
            }
          });
      })
      .catch(error => {
        if (error.name === "SequelizeUniqueConstraintError") {
          Servers.update(
            { channelId: interaction.channel_id },
            { where: { serverId: interaction.guild_id } }
          )
            .then(updated => {
              Client.api
                .interactions(interaction.id, interaction.token)
                .callback.post({
                  data: {
                    type: 4,
                    data: {
                      content: "Bound channel updated!"
                    }
                  }
                });
            })
            .catch(error => {
              console.log(error);
              Client.api
                .interactions(interaction.id, interaction.token)
                .callback.post({
                  data: {
                    type: 4,
                    data: {
                      content:
                        "There was an error updating the bound channel. It has been logged."
                    }
                  }
                });
            });
        } else {
          console.log(error);
          Client.api
            .interactions(interaction.id, interaction.token)
            .callback.post({
              data: {
                type: 4,
                data: {
                  content:
                    "There was an error binding to this channel. It has been logged."
                }
              }
            });
        }
      });
  },
  addInteraction: {
    name: "bind",
    description:
      "Bind the bot to a certain channel. This is required for the bot to function.."
  }
};
