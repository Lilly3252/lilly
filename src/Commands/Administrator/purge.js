const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["purge"],
      description: "Deletes messages .",
      category: "\uD83D\uDD14Administrator",
      usage: `<number>`,
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["ADMINISTRATOR"],
    });
  }
  async run(a, b) {
    const c = b[0];
    if (!c) return a.channel.send("Please provide a number");
    if (isNaN(c) || 100 < c)
      return a.channel.send("amount must be a valid number and below 100");
    try {
      await a.channel.bulkDelete(+c).then(() => {
        a.channel
          .send(`Deleted ${b[0]} messages.`)
          .then((a) => a.delete({ timeout: 2e3 }, !0));
      });
    } catch {
      return a.channel.send(
        "An error occurred when deleting the messages, make sure they are not older than 14days"
      );
    }
  }
};
