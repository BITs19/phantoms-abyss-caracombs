let interactions = [];
const commandFiles = require("./util/getInteractions.js");

for (const file of commandFiles) {
  let command = require(`./interactions/${file}`);
  interactions.push(command);
}

const Sequelize = require("sequelize");
const { Op } = require("sequelize");
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

module.exports = async function(interaction, Client) {
  Client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 5,
      data: {
        content: "Thinking..."
      }
    }
  });
  await Servers.sync();
  let record = await Servers.findOne({
    where: {
      serverId: interaction.guild_id
    },
    attributes: ["channelId"]
  });
  //console.log(record);

  if (record && record.channelId === interaction.channel_id) {
    //return msg.channel.send("pong");
    //console.log("command identified");

    let tokens = interaction.data;
    //console.log(interaction.data);
    // if (!commands.has(command)) return;

    //console.log("");

    for (const c of interactions) {
      //console.log(c);

      if (c.pattern.test(interaction.data.name)) {
        try {
          c.execute(interaction, Client);

          //console.log("command executed");
        } catch (error) {
          console.log(error);

          //msg.reply("There was an error executing that command :(");
        } finally {
          break;
        }
      }
    }
  } else if (interaction.data.name === "bind") {
    const Bind = require("./interactions/bind.js");
    Bind.execute(interaction, Client);
  }
};
