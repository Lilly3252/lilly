const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  RoleEmoji = require("../../Database/models/role-emoji");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      description: "Create a RoleReaction Menu.Saved through database.",
      category: "\uD83D\uDD14Administrator",
      usage: ``
    });
  }
  async run(a) {
    const b = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("Select a reaction to get the role it represents:"),
      c = a.guild.roles.cache.sort((a, b) => a.position - b.position);
    RoleEmoji.find({}, async (d, e) => {
      if (d) console.log(d);
      else if (e)
        if (e.length) {
          e.forEach((a) => {
            const d = c.find((b) => b.id === a.id);
            d && b.addField(d.name, a.character, !0);
          });
          const d = await a.channel.send(b);
          e.forEach((a) => {
            d.react(a.character);
          });
          const f = d.createReactionCollector((a, b) => !b.bot);
          f.on("collect", async (b, c) => {
            const d = await a.guild.members.fetch(c),
              f = e.find((a) => a.character === b.emoji.name);
            if (f) {
              const c = a.guild.roles.cache.find((a) => a.id === f.id);
              c
                ? d.roles.cache.has(c.id)
                  ? (d.roles.cache.has(c.id) && d.roles.remove(c),
                    b.users.remove(d.id))
                  : d.roles.add(c)
                : a.channel.send(`The role with id ${f.id} has been deleted.`);
            } else b.remove();
          });
        } else
          a.channel.send(
            "This server has no public roles, contact the staff to get a role."
          );
    });
  }
};
