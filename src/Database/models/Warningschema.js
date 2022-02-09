const { model, Schema, models } = require("mongoose");
//** not used at this moment. */
const warningSchema = new Schema({
  user_id: { type: String, required: true },
  guild_id: { type: String, required: true },
  reason: { type: String, default: "No Reason Given" },
  date: { type: Number, default: () => Date.now() }
});

module.exports = models.Warning || model("Warning", warningSchema);
