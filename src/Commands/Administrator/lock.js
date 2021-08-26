const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["lock"],
      description: "lock all channels.",
      category: "\uD83D\uDD14Administrator",
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["ADMINISTRATOR"],
      options: [
          {
            type: undefined,
            name: undefined,
            description: undefined,
            required: false,
            choices: undefined,
            options: undefined
          }
        ]
    });
  }
  async run(message, args) {
    const unlocked_locked = args[0];
    if ("true" === unlocked_locked) {
      let role = message.channel.guild.roles.cache.get(message.guild.id);
      console.log(role);
      message.channel.guild.channels.cache.forEach(async (text_channel) => {
        await text_channel.updateOverwrite(role, {
          SEND_MESSAGES: false,
        });
      });
      console.log("successfully locked the channels")
      return message.channel.send("locked");
      
    }
      if ("false" === unlocked_locked) {
        let role = message.channel.guild.roles.cache.get(message.guild.id)
        message.channel.guild.channels.cache.forEach(async (text_channel) => {
          await text_channel.updateOverwrite(role, {
            SEND_MESSAGES: true,
          });
          console.log("successfully unlocked the channels")
      }) ; return message.channel.send("unlocked");
    }
  }
  }
;
