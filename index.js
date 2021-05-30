console.log("beginning");
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("I'm in");
}

const commandHandler = require("./commands.js");

client.on("message", msg => {
  commandHandler(msg, client);
});

client.ws.on("INTERACTION_CREATE", async interaction => {
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: "hello world!"
      }
    }
  });
});