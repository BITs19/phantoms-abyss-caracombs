let commands = [];
const commandFiles = require("./util/getCommands.js");

for (const file of commandFiles) {
  let command = require(`./commands/${file}`);
  commands.push(command);
}

let Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "database",
  process.env.DBUSERNAME,
  process.env.SERVER_PASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite"
  }
);

module.exports = async function(msg, Client) {
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
