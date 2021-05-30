module.exports = {
  name: "ping",
  pattern: /ping/i, 
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
    name: "ping",
    description:
      'Respond with "Pong!" To test if the bot is currently listening.'
  }
};
