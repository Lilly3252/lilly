const Command = require("../../Structures/Command");
const mongoose = require("mongoose");
const tagSchema = require("../../Database/models/tags");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: "tags!!!!!",
      category: "📝Utilities",
      usage: "<Add>+<name> + <content> / <Remove> + <name>",
      
    });
  }

  async run(message, args) {
    const name = args[1];
    const content = args[2];
    //add tag to DB
    if (args[0] === "add") {
      if (!name) {
        return interaction.reply(
          "You need a name , without that i can't save!"
        );
      }
      if (!content) {
        return interaction.reply(
          "You wanna make a tag without content? seriously?"
        );
      }
      await tagSchema.findOne(
        {
          guildID: message.guild.id,
        },
        async (err) => {
          if (err) console.error(err);
          if (args[1] === tagSchema.Name) {
            return interaction.reply(
              "This tag has the same name as another one."
            );
          }
          if (args[1] !== tagSchema.Name) {
            const newtag = new tagSchema({
              _id: mongoose.Types.ObjectId(),
              guildID: message.guild.id,
              Tag:{
                  Name: args[1],
                  Content: args[2]
              } ,
            });
            newtag.save().then(() => interaction.reply("tag saved"));
          }
        }
      );
    }
    // delete tag from DB
    else if (args[0] === "remove" || "del" || "delete") {
      if (!name) {
        return interaction.reply(
          "You need a name , without that i can't delete!"
        );
      } else
        tagSchema.findOneAndDelete({
          guildID: message.guild.id,
        });
    }
  }
};
