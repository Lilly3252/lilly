const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83D\uDD14Administrator",
      description: "Unban someone",
      usage: "[userID]",
      userPerms: ["ADMINISTRATOR"],
      options: [
        {
          type: "USER",
          name: 'member',
          description: 'userID to unban.',
          required: true
        }
      ]
    });
  }
  async run(a, b) {
    let c = b[0];
    if (!b[0]) return interaction.reply("Please give me a userID!");
    if (isNaN(b[0])) return interaction.reply("That ID is not a number !");
    let d = b.slice(1).join(" ");
    d || (d = "No reason given"),
      a.guild.fetchBans().then(async (b) => {
        if (0 == b.size)
          return interaction.reply(
            "No one can be unban because there is no user ban in this guild!"
          );
        let e = b.find((a) => a.user.id == c);
        return e
          ? void (await a.guild.members
              .unban(e.user, d)
              .catch((a) => console.log(a)),
            interaction.reply(`**${e.user}** has been unban`))
          : interaction.reply("this user is not banned");
      });
  }
};
