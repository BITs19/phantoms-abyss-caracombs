module.exports = {
  name: "join",
  pattern: /join/i,
  execute(interaction, Client) {
    Client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Pong!"
        }
      }
    });
  },
  addInteraction: {
    name: "join",
    description: "Begin your adventure in the Phantom's Abyss Catacombs!!"
  }
};
