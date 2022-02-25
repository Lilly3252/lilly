const Event = require("../../Structures/Event.js");
const Guild = require("../../Database/models/Guild");

module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: false });
  }
  async run(oldMember, newMember) {
    if (!oldMember.guild) return
    const LogChannel = await Guild.findOne({ guildID: oldMember.guild.id}) 
console.log(`OLD MEMBER:`+ oldMember.isCommunicationDisabled()
)
if (newMember.isCommunicationDisabled()){
    
}
    };
};