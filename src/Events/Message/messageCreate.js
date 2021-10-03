const Event = require("../../Structures/Event");
const config = require("../../config.json");
const mongoose = require("mongoose");
const Guild = require("../../Database/models/Guild");
const { MessageEmbed } = require("discord.js");

// Line 83 to 125 credit to ShinoTheShino

module.exports = class extends Event {
  async run(message) {
    if (/*!message.guild || */ message.author.bot) return;
    // checking the dbc
    if ((message.channel.type = "DM")) {
      console.log(message.content);
    }

    const b = await Guild.findOne({ guildID: message.guild.id }, (b, c) => {
      if ((b && console.error(b), !c)) {
        const b = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          guildName: message.guild.name,
          prefix: config.prefix,
          moderatorRoleID: null,
          welcomechannelID: null,
          logchannelID: null,
          antiRaidMode: false,
          messageBulkDeleteMode: false,
          messageDeleteMode: false,
          messageUpdateMode: false,
          PersonalizedWelcomeMessage: null,
        });
        return (
          b
            .save()
            .then((a) => console.log(a))
            .catch((a) => console.error(a)),
          message.channel
            .send(
              "This server was not in our database! We have now added and you should be able to use bot commands."
            )
            .then((a) => a.delete({ timeout: 1e4 }))
        );
      }
    });
    //*anti ping-spam auto-mod
    /*const mRegex = /<@!?(\d+?)>/g;
    const m = a.content.match(mRegex);
    // !: need to know how to get rid of "Cannot read property 'length' of null" error here
    if(null === m.length){a.channel.send("no ping")}
    if (m.length > 2) {
      // TODO: VVVV need to know what consequences i need to put there VVVV
      a.channel.send(`i detected ${m.length} ping`);
    }*/
    // * mentions , bot , bot role and moderator role
    const c = { ignoreEveryone: !0 };
    `<@!${message.guild.me.id}>` === message.content &&
      message.channel.send(`My commands are Slash commands now.`),
      message.mentions.has("775530518485270559", c) &&
        message.channel.send(`Role mentioned , what's up?`);

    const d = b.moderatorRoleID;
    const e = b.logchannelID;
    if (
      message.mentions.has(d, c) &&
      (message.client.channels.cache.get(e).send(
        new MessageEmbed()
          .setTitle("Moderator Mentioned")
          .setThumbnail(a.guild.iconURL({ dynamic: !0 }))
          .setDescription([
            `**Person who mentioned**: ${message.member}`,
            `**Channel**: ${message.channel}`,
            `**Content**: ${message.content}`,
          ])
          .addField("\u200B", `[Click here to see the message](${message.url})`)
      ),
      !e && !d)
    )
      return;

    //*command (something) detection

    // TODO : Do i really need that ? //*everything under that has been moved to interactionCreate
    // if (!this.client.application?.owner) await this.client.application?.fetch();

    if (
      message.content.toLowerCase() === "!deploy" &&
      message.author.id === this.client.application?.owner.id
    ) {};
    const command = this.client.commands.find(cmd => cmd.name == this.client.commands.CommandName)
    if(!command){return}
  
      command.run(message , args);
    }
  }

    
  

