module.exports = {
  name: "ping",
  pattern: /ping/i,
  execute: async function(interaction, Client) {
    console.log(interaction.member.user.id);
    console.log(await Client.users.fetch(interaction.user.id));
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
