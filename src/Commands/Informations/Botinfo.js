const { MessageEmbed, version: djsversion } = require("discord.js"),
  { version } = require("../../../package.json"),
  Command = require("../../Structures/Command"),
  { utc } = require("moment"),
  os = require("os"),
  ms = require("ms");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["info", "bot"],
      description: "Displays information about the bot.",
      category: `⁉️Informations`,
      usage: "",
    });
  }
  run(a) {
    const b = os.cpus()[0],
      c = new MessageEmbed()
        .setThumbnail(this.client.user.displayAvatarURL())
        .setColor(a.guild.me.displayHexColor || "BLUE")
        .addField("General", [
          `**❯ Client:** ${this.client.user.tag} (${this.client.user.id})`,
          `**❯ Commands:** ${this.client.commands.size}`,
          `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
          `**❯ Users:** ${this.client.guilds.cache
            .reduce((c, a) => c + a.memberCount, 0)
            .toLocaleString()}`,
          `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
          `**❯ Creation Date:** ${utc(this.client.user.createdTimestamp).format(
            "Do MMMM YYYY HH:mm:ss"
          )}`,
          `**❯ Node.js:** ${process.version}`,
          `**❯ Version:** v${version}`,
          `**❯ Discord.js:** v${djsversion}`,
          "\u200B",
        ])
        .addField("System", [
          `**❯ Platform:** ${process.platform}`,
          `**❯ Uptime:** ${ms(1e3 * os.uptime(), { long: !0 })}`,
          `**❯ CPU:**`,
          `\u3000 Cores: ${os.cpus().length}`,
          `\u3000 Model: ${b.model}`,
          `\u3000 Speed: ${b.speed}MHz`,
          `**❯ Memory:**`,
          `\u3000 Total: ${this.client.utils.formatBytes(
            process.memoryUsage().heapTotal
          )}`,
          `\u3000 Used: ${this.client.utils.formatBytes(
            process.memoryUsage().heapUsed
          )}`,
        ])
        .addField(
          "Facebook page",
          `[Click here](https://www.facebook.com/LillyBot-106668441293049/)`,
          !0
        )
        .addField(
          "OpenSource Code",
          `[Click here](https://github.com/Lilly3252/LillyBot)`,
          !0
        )
        .setTimestamp();
    a.channel.send(c);
  }
};
