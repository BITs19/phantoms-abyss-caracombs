const Discord = require("discord.js");

module.exports = function(Client, interaction, message, embed) {
  new Discord.WebhookClient(Client.user.id, interaction.token).send(message, {
    embeds: embed
  });
};
