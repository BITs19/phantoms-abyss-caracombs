module.exports = {
  name: "Drop",
  pattern: /\bdrop\b/i,
  execute: function(interaction, Client) {
    if (interaction.user.id != "272162236632530944")
      return Client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content: "You must be Michael to execute this command!"
            }
          }
        });
    if(interaction.data.options[0].name === "option"){
      let outString = "";
      const option = interaction.data.options[0].value;
      if(option % 2 == 0){
        }
      }
  },
  addInteraction: {
    name: "drop",
    description:
      "Drops all tables in the database. Can only be executed by Michael",
    options: [
      {
        type: 4,
        name: "option",
        description: "The code for which tables to drop.",
        required: true
      }
    ]
  }
};
