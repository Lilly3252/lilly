const Command = require("./../../Structures/Command");
const emoji = require("../../Structures/JSONs/emoji.json");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      
      category: `📝Utilities`,
     
    });
    this.ownerOnly = true;
  }

  // eslint-disable-next-line no-unused-vars
  async run(message) {
    let argsresult;
    let mChannel = message.mentions.channels.first();

    message.delete();
    if (mChannel) {
      argsresult = args.slice(1).join(" ");
      mChannel.send(argsresult);
    } else {
      argsresult = args.join(" ");
      message.channel.send(argsresult);
    }
  }
};

