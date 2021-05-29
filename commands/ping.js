module.exports = {
  name: "Ping",
  pattern: /ping/i,
  execute: function(msg) {
    msg.channel.send("Pong!");
  }
};
