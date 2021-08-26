const mongoose = require("mongoose");
//** not used at this moment. */
const wordfilterschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  Words: Map,
});
