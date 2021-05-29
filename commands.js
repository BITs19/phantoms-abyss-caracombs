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
    type: sequelize.STRING(25),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  channelId: {
    type: sequelize.STRING(25),
    allowNull: false
  },
  prefix: {
    type: sequelize.STRING(5),
    allowNull: false,
    default: "!"
  }
});

module.exports = async function(msg, Client) {
  await Servers.sync();
  let record = Servers.findOne({where: { [Op.and] :
 
  if (msg.content.startsWith("!")) {
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
  }
};
