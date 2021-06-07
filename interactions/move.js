const replyInteraction = require("../util/replyInteraction.js");
const Players = require(

module.exports = {
  name: "move",
  pattern: /\bmove\b/i,
  execute: async function(interaction, Client) {},
  addInteraction: {
    name: "move",
    description: "Move in a cardinal direction",
    options: [
      {
        type: 3,
        name: "direction",
        description:
          "The direction to move. Must be from; North, East, South, or West ",
        required: true
      }
    ]
  }
};
