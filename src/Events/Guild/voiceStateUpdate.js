const Event = require("../../Structures/Event.js");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false,
    });
  }
  run(oldState,newState) {
    console.log(`${oldState.member.id} (${oldState.member.user.tag}) on ${oldState.channelId} Named : ${oldState.channel ? oldState.channel.name : null } been moved to ${newState.channelId} Named : ${newState.channel ?newState.channel.name :null }`);
  }
};