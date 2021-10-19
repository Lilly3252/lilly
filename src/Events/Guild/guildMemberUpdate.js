const Event = require("../../Structures/Event.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Guild = require("../../Database/models/Guild");
module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  async run(member) {}
};
