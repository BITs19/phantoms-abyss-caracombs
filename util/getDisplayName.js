module.exports = async function(Client, userId, interaction) {
  const guild = await Client.guilds.fetch(interaction.guild_id);
  const member = await guild.members.fetch(userId);
  return member.displayName;
};
