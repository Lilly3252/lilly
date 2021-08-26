const Command = require("../../Structures/Command");
const RoleEmoji = require("../../Database/models/role-emoji");
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      
      description:
        "setting up your roles if you want to make a reaction role.",
      category: "🔔Administrator",
      usage: "+<Role> & <Emoji>",
      userPerms: ["ADMINISTRATOR"],
      options: [
          {
            type: "ROLE",
            name: "role",
            description: "roleID",
            required: true
          }
        ]
    });
  }
  async run(message, args) {
    const settings = await RoleEmoji.findOne(
      {
        guildID: message.guild.id,
      },
      (err, data) => {
        if (err) console.error(err);
        if (!data) {
          const roleId = args[0];
          const emoji = args[1];
          if (roleId) {
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
              if (emoji) {
                const newRoleEmojiDoc = new RoleEmoji({
                  id: role.id,
                  character: emoji,
                });
                newRoleEmojiDoc
                  .save()
                  .then((savedDoc) =>
                    message.channel.send(
                      `Made the **${role.name}** role public and assigned it the emoji: ${emoji}`
                    )
                  )
                  .catch((err) => console.log(err));
              } else {
                return message.reply(
                  "You did not mention an emoji to assign this role to."
                );
              }
            } else {
              return message.reply("Enter a valid guild role id.");
            }
          } else {
            return message.reply("You did not mention the role id.");
          }
        }
      }
    );
  }
};
