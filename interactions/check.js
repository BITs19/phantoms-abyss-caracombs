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
    if (!record)
      return Client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content: "That person isn't a player!"
              //embeds: [embed]
            }
          }
        });
    const guild = await Client.guilds.fetch(interaction.guild_id);
    const member = await guild.members.fetch(userId);
    const avatar = (await Client.users.fetch(userId)).avatarURL();
    let embed = new Discord.MessageEmbed()
      //.setAuthor(member.displayName, avatar)
      .setThumbnail(avatar)
      .setTitle(member.displayName)
      .addFields([
        {
          name: "Level",
          value: record.level
        },
        {
          name: "Score",
          value: record.score
        },
        {
          name: "Lives",
          value: record.lives
        }
      ]);
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
