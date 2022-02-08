const Event = require("../../Structures/Event.js");
const mongoose = require("mongoose");
const Guild = require("../../Database/models/Guild");
const config = require("../../config.json");
module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: false });
  }
  run(oldGuild, newGuild) {
    /*const b = await Guild.findOne({ guildID: oldGuild.guild.id}) 
     b.updateOne({guildName: oldGuild.name})
    });
    b
      .save()
      .then((a) => console.log(a))
      .catch((a) => console.error(a)),
      console.log("I have updated a server! Updated on DB.");
*/
  }
};
