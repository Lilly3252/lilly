const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleinfo")
    .setDescription("information of a role.")
    .addMentionableOption((option) =>
      option.setName("mentionable").setDescription("Mention a role")
    ),
  async run(interaction) {
    const c = interaction.options.getMentionable("mentionable"),
      d = new MessageEmbed()
        .setTimestamp()
        .setColor(c.color)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`**Role information**`)
        .addField(
          "Role",
          [
            `**❯ Name:** ${c.name}`,
            `**❯ Role ID:** ${c.id}`,
            `**❯ Color:** ${c.color}`,
            `**❯ Hoisted:** ${c.hoist}`,
            `**❯ Mentionable:** ${c.mentionable}`,
          ].join("\n")
        );
    interaction.reply({ embeds: [d] });
  },
};
