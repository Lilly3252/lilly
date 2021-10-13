const Event = require("../../Structures/Event");
const { MessageReaction, User } = require("discord.js");

/**
 *  * TO-DO : do i really need this?
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */
module.exports = class extends Event {
	async run(reaction, user) {
		/*if (user.bot) return;
    let member = reaction.message.guild.members.cache.get(user.id);
    ReactionModel.findOne(
      {
        Guild: reaction.message.guild.id,
        Reaction: reaction.emoji.toString(),
        MessageID: reaction.message.id,
        Role:ReactionModel.schema.obj.ReactionsAndRole.Role
      },
      
      async (err, data) => {
        if (err) throw err;
        if (data) {
          if (!member.roles.cache.has(ReactionModel.ReactionsAndRole.Role)) {
            member.roles.add(ReactionModel.Role);
          } else {
          }
        }
      }
    );
    //console.log(ReactionModel)
    */
	}
};
