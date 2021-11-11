const { model, Schema, models } = require("mongoose");

const MuteSchema = new Schema({
  user_id: { type: String, required: true },
  guild_id: { type: String, required: true },
  reason: { type: String, default: "No Reason Given" },
  time: { type: String }
});

module.exports = models.MuteSchema || model("MuteSchema", MuteSchema);
