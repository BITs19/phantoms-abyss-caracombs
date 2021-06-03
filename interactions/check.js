const Players = require("../util/getPlayerTable.js");

module.exports = {
  name: "check",
  pattern: /\bcheck\b/i,
  execute: function(interaction, Client) {
    //console.log(interaction.data.options);
    let userId;
    if (interaction.data.options) {
      userId = interaction.data.options[0].value;
    }else{
      userId = 
      }
    Client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "check yourself!"
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
