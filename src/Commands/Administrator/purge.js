const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      description: "Deletes messages .",
      category: "\uD83D\uDD14Administrator",
      usage: `<number>`,
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["ADMINISTRATOR"],
      options: [
          {
            type: "NUMBER",
            name: "number",
            description: "number of messages to be deleted",
            required: true
          }
        ]
    });
  }
  async run(a, b) {
    const c = b[0];
    if (!c) return interaction.reply("Please provide a number");
    if (isNaN(c) || 100 < c)
      return interaction.reply("amount must be a valid number and below 100");
    try {
      await a.channel.bulkDelete(+c).then(() => {
        a.channel
          .send(`Deleted ${b[0]} messages.`)
          .then((a) => a.delete({ timeout: 2e3 }, !0));
      });
    } catch {
      return interaction.reply(
        "An error occurred when deleting the messages, make sure they are not older than 14days"
      );
    }
  }
};
