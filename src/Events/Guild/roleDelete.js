const Event = require("../../Structures/Event.js");
const RoleEmoji = require("../../Database/models/role-emoji");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }
  run(role) {
    //RoleEmoji.deleteOne({ id: role.id }, (err) => {
    //console.log(err);
    // });
  }
};
