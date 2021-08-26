const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83D\uDD14Administrator",
      description: "Echo your message to this channel or to another channel",
      usage: "[ChannelMention] <message>",
      userPerms: ["ADMINISTRATOR"],
      options:[
        {
          type: 'STRING',
          name: "say",
          description: 'What to say',
          required: true,
        }]
    });
  }
  async run(a, b) {
    let c,
      d = a.mentions.channels.first();
    a.delete(),
      d
        ? ((c = b.slice(1).join(" ")), d.send(c))
        : ((c = b.join(" ")), a.channel.send(c));
  }
};
