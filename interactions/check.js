module.exports = {
  name: "check",
  pattern: /\bcheck\b/i,
  execute: function(interaction, Client) {
    console.log(interaction.data.options);
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
