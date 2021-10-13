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
		/*  let member = reaction.message.guild.members.cache.get(user.id);
    ReactionModel.findOne(
      {
        Guild: reaction.message.guild.id,
        ReactionAndRole: reaction.emoji.toString(),
        MessageID: reaction.message.id,
      },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          if (member.roles.cache.has(data.Role)) {
            member.roles.remove(data.Role);
          } else {
          }
        }
      }
    );
    */
	}
};
