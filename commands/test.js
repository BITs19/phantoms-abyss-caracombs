module.exports = {
  pattern: /test/i,
  execute: async function(msg, tokens, Client) {
    const i = require("../interactions/updateInteractions.js");
    Client.api
      .applications(Client.user.id)
      .guilds("848285615194636369")
      .commands.post({
        data: i.addInteraction
      });
    msg.channel.send("done");
  }
};
