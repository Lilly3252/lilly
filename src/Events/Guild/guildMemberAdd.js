const Event = require("../../Structures/Event.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const Guild = require("../../Database/models/Guild.js");
module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: false });
  }
  async run(member) {
    if (!member.guild) return;
    const created_account = `${moment(member.user.createdTimestamp).format("LL")} (${moment(
      member.user.createdTimestamp
    ).fromNow()})`
    const c = await Guild.findOne({ guildID: member.guild.id });
    const welcomechannel = c.welcomechannelID;
    
    const welcomeEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
      .addField("Information", [
        `**❯ Username:** ${member.user}`,
        `**❯ Created at:** ${created_account}`,
      ].join("\n"))
      .setFooter({ text: "User joined" })
      .setTimestamp(new Date())
     
    if (!welcomechannel || welcomechannel === null) return;
    member.client.channels.cache.get(welcomechannel).send({ embeds: [welcomeEmbed] });
  }
}
