const Discord = require("discord.js");

const Players = require("../util/getPlayerTable.js");

module.exports = {
  name: "check",
  pattern: /\bcheck\b/i,
  execute: async function(interaction, Client) {
    //console.log(interaction.data.options);
    let userId;
    if (interaction.data.options) {
      userId = interaction.data.options[0].value;
    } else {
      userId = interaction.member.user.id;
    }
    const record = await Players.findOne({ where: { id: userId } });
    const member = interaction.member;
    const avatar = (await Client.users.fetch(member.user.id)).avatarURL();
    let embed = new Discord.MessageEmbed()
      .setAuthor(member.nick, avatar)
      .setThumbnail(avatar);
    Client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          //content: "",
          embeds: [embed]
        }
      }
    });
  },
  addInteraction: {
    name: "check",
    description: "Check the status of a player.",
    options: [
      {
        type: 9,
        name: "player",
        description: "Player to check. If left blank, will check you",
        required: false
      }
    ]
  }
};
