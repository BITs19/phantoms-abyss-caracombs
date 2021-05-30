const fs = require("fs");
const commandFiles = fs
  .readdirSync("./interactions")
  .filter(file => file.endsWith(".js"));
module.exports = commandFiles