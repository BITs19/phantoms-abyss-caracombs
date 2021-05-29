const fs = require("fs");
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
module.exports = commandFiles