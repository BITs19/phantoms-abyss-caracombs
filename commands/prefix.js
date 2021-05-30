const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "database",
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite"
  }
);

const Servers = sequelize.define("Servers", {
  serverId: {
    type: Sequelize.STRING(25),
    primarykey: true,
    allowNull: false,
    unique: true
  },
  channelId: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  prefix: {
    type: Sequelize.STRING(5),
    allowNull: false,
    defaultValue: "!"
  }
});

module.exports = {
  name: "Prefix",
  pattern: /prefix/i,
  execute: async function(msg, tokens) {
    if (!tokens[0])
      return msg.reply("Please specify a symbol to replace the current prefix");
    await Servers.sync();
    let record = await Servers.findOne({ where: { serverId: msg.guild.id } });
    if (!record) return msg.reply("Error: no entry found in server list");
    const prefix = tokens[0].charAt(0);
    const alphanumeric = /[a-z0-9 ]/i;
    if (alphanumeric.test(prefix))
      return msg.reply(
        `Prefix cannot be alphanumeric value or a space (${prefix})`
      );
    record.prefix = prefix;
    record = await record.save();
    msg.channel.send(
      `Prefix for this server successfully updated to '${record.prefix}'`
    );
  }
};
