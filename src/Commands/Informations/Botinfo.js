const { MessageEmbed, version: djsversion } = require("discord.js"),
  { version } = require("../../../package.json");
  const { SlashCommandBuilder } = require('@discordjs/builders'),
  { utc } = require("moment"),
  os = require("os"),
  ms = require("ms");
//**DONE  */
module.exports = {
data : new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('information of the bot.')
  ,
  async run(interaction) {
    const b = os.cpus()[0],
      embed = new MessageEmbed()
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setColor(interaction.guild.me.displayHexColor || "BLUE")
      .addField("General", [
          `**❯ Client:** ${interaction.client.user.tag} (${interaction.client.user.id})`,
          `**❯ Commands:** ${interaction.client.commands.size}`,
          `**❯ Servers:** ${interaction.client.guilds.cache.size.toLocaleString()} `,
          `**❯ Users:** ${interaction.client.guilds.cache.reduce((c, a) => c + a.memberCount, 0).toLocaleString()}`,
          `**❯ Channels:** ${interaction.client.channels.cache.size.toLocaleString()}`,
          `**❯ Creation Date:** ${utc(interaction.client.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}`,
          `**❯ Node.js:** ${process.version}`,
          `**❯ Version:** v${version}`,
          `**❯ Discord.js:** v${djsversion}`,
          "\u200B",
        ].join("\n"))
        .addField("System", [
          `**❯ Platform:** ${process.platform}`,
          `**❯ Uptime:** ${ms(1e3 * os.uptime(), { long: !0 })}`,
          `**❯ CPU:**`,
          `\u3000 Cores: ${os.cpus().length}`,
          `\u3000 Model: ${b.model}`,
          `\u3000 Speed: ${b.speed}MHz`,
          `**❯ Memory:**`,
          `\u3000 Total: ${interaction.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
          `\u3000 Used: ${interaction.client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
        ].join("\n"))
        
        .addField("OpenSource Code",
          `[Click here](https://github.com/Lilly3252/LillyBot)`,
          !0
        )
        .addField("OpenSource Code (Dev version)",
          `[Click here](https://github.com/Lilly3252/Lilly-dev)`,
          !0
        )
        .setTimestamp();
      
    await interaction.reply({embeds: [embed]});
  }
};
