const Event = require("../../Structures/Event.js"),
  mongoose = require("mongoose"),
  Guild = require("../../Database/models/Guild"),
  config = require("../../config.json");
const fs = require("fs");

module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: false });
  }
  run(a) {
    const b = new Guild({
      _id: mongoose.Types.ObjectId(),
      guildID: a.id,
      guildName: a.name,
      moderatorRoleID: null,
      welcomechannelID: null,
      logchannelID: null,
      antiRaidMode: false,
      messageDeleteMode: false,
      messageUpdateMode: false,
      messageBulkDeleteMode: false,
      PersonalizedWelcomeMessage: null,
    });
    b
      .save()
      .then((a) => console.log(a))
      .catch((a) => console.error(a)),
      console.log("I have joined a new server! Saved to DB.");

  }
};
