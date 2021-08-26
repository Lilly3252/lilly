const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
//** not used at this moment. */

const roleEmojiSchema = new Schema({
  guildID: String,
  id: String,
  character: String,
});

const RoleEmoji = model("role-emoji", roleEmojiSchema);
module.exports = RoleEmoji;
