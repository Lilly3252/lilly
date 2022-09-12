export const name = 'guildMemberAdd';
export const once = false;
export const run = async (member) => {
    if (!member.guild)
        return;
    /*const created_account = `${moment(member.user.createdTimestamp).format("LL")} (${moment(
      member.user.createdTimestamp
    ).fromNow()})`
    const c = await Guild.findOne({ guildID: member.guild.id });
    const welcomechannel = c.welcomechannelID;
    if(welcomechannel.isTextBased()){
    const welcomeEmbed = new EmbedBuilder()
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
    }*/
};
//# sourceMappingURL=guildMemberAdd.js.map