let commands = [];
const commandFiles = require("./util/getCommands.js");

for (const file of commandFiles) {
  let command = require(`./commands/${file}`);
  commands.push(command);
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
    default: "!"
  }
});

module.exports = async function(msg, Client) {
  await Servers.sync();
  let record = Servers.findOne({
    where: {
      [Op.and]: [{ serverId: msg.guild.id }, { channelId: msg.channel.id }]
    },
    attributes: ["prefix"]
  });

  if (record && msg.content.startsWith(record.prefix)) {
    //return msg.channel.send("pong");
    //console.log("command identified");

    let tokens = msg.content.split(" ");

    let command = tokens.shift();

    command = command.substring(1).toUpperCase();

    // if (!commands.has(command)) return;

    // //console.log("commands has command ");

    for (const c of commands) {
      //console.log(c);

      if (c.pattern.test(command)) {
        try {
          c.execute(msg, tokens, Client);

          //console.log("command executed");
        } catch (error) {
          console.log(error);

          msg.reply("There was an error executing that command :(");
        } finally {
          break;
        }
      }
    }
  } else if (msg.content.startsWith("!bind")) {
    let created = await Servers.create({
      serverId: msg.guild.id,
      channelId: msg.channel.id
    });
    msg.channel.send("Phantom's Abyss Catacombs bound to this channel");
  }
};
