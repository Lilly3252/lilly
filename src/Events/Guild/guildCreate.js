const Event = require("../../Structures/Event.js"),
  mongoose = require("mongoose"),
  Guild = require("../../Database/models/Guild"),
  config = require("../../config.json");
module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: !1 });
  }
  run(a) {
    const b = new Guild({
      _id: mongoose.Types.ObjectId(),
      guildID: a.id,
      guildName: a.name,
      prefix: config.prefix,
      moderatorRoleID: null,
      welcomechannelID: null,
      logchannelID: null,
      antiRaidMode: !1,
      messageDeleteMode: !1,
      messageUpdateMode: !1,
      messageBulkDeleteMode: !1,
      PersonalizedWelcomeMessage: null
    });
    b
      .save()
      .then((a) => console.log(a))
      .catch((a) => console.error(a)),
      console.log("I have joined a new server! Saved to DB.");
  }
};
