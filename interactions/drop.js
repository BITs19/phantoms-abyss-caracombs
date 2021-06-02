module.exports = {
  name: "Drop",
  pattern: /\bdrop\b/i,
  execute: function(interaction, Client) {
    if(interaction.user.id != "272162236632530944") return 
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
