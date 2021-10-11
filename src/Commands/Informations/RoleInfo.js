const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
data : new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('information of a role.')
 ,
  async run(interaction, b) {
    const c = interaction.mentions.roles.first() || interaction.guild.roles.cache.get(b[0]),
      d = new MessageEmbed()
        .setTimestamp()
        .setColor(c.color)
        .setThumbnail(a.guild.iconURL({ dynamic: !0 }))
        .setDescription(`**Role information**`)
        .addField("Role", [
          `**❯ Name:** ${c.name}`,
          `**❯ Role ID:** ${c.id}`,
          `**❯ Color:** ${c.color}`,
          `**❯ Hoisted:** ${c.hoist}`,
          `**❯ Mentionable:** ${c.mentionable}`,
        ].join("\n"));
    interaction.reply({ embeds: [d] });
  }
};
