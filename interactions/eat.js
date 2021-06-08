const replyInteraction = require("../util/replyInteraction.js");

module.exports = {
  name: "eat",
  pattern: /\beat\b/i,
  execute: function(interaction, Client) {
    
  },
  addInteraction: {
    name: "eat",
    description: "Eat something in the room."
  }
};
