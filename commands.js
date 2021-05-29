let commands = [];
let Sequelize = require("sequelize");

module.exports = async function(msg, Client) {
  if (msg.content.startsWith("!")) {
    return msg.channel.send("pong");
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
