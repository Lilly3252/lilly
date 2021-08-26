const Command = require("../../Structures/Command");
const { Util } = require("discord.js");
//const ytdl = require("ytdl-core");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      
      category: "🎧Music",
      description:`Play music using a youtube link and looping it`,
      usage:"<song number>",
      botPerms:['CONNECT','SPEAK'],
      
    });
  }

  // eslint-disable-next-line no-unused-vars
async run(message, args) {}}