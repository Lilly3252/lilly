const Event = require("../../Structures/Event");
const config = require("../../config.json");
const mongoose = require("mongoose");
const Guild = require("../../Database/models/Guild");
const { MessageEmbed } = require("discord.js");

// Line 83 to 125 credit to ShinoTheShino

**THIS STILL NEEDS TO BE CLEANED UP!!!**

module.exports = class extends Event {
  async run(a) {
    // ! a is message here !

    if (/*!a.guild || */ a.author.bot) return;
    // checking the dbc
    if(a.channel.type = "DM"){
      
      console.log(a.content)
    }
    
    const b = await Guild.findOne({ guildID: a.guild.id }, (b, c) => {
      if ((b && console.error(b), !c)) {
        const b = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildID: a.guild.id,
          guildName: a.guild.name,
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
          a.channel
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
    `<@!${a.guild.me.id}>` === a.content &&
      a.channel.send(`My commands are Slash commands now.`),
      a.mentions.has("775530518485270559", c) &&
        a.channel.send(`Role mentioned , what's up?`);

    const d = b.moderatorRoleID;
    const e = b.logchannelID;
    if (
      a.mentions.has(d, c) &&
      (a.client.channels.cache.get(e).send(
        new MessageEmbed()
          .setTitle("Moderator Mentioned")
          .setThumbnail(a.guild.iconURL({ dynamic: !0 }))
          .setDescription([
            `**Person who mentioned**: ${a.member}`,
            `**Channel**: ${a.channel}`,
            `**Content**: ${a.content}`,
          ])
          .addField("\u200B", `[Click here to see the message](${a.url})`)
      ),
      !e && !d)
    )
      return;

    //*command (something) detection

    // TODO : Do i really need that ?
    if (!this.client.application?.owner) await this.client.application?.fetch();

    if (
      (a.content.toLowerCase() === "!deploy" &&
        a.author.id === this.client.application?.owner.id)
    ) {
      // remove the || true when done lol
      // const data = {
      // 	name: 'ping',
      // 	description: 'Replies with Pong!',
      // };

      /*const commands = [
      {
        name: 'ping',
        description: 'Pong!',
      },
      {
        name: 'say',
        description: 'Repeats your message',
        options: [
          {
            type: 'STRING',
            name: 'message',
            description: 'What to say',
            required: true,
          },
          {
            type: 'BOOLEAN',
            name: 'backwards',
            description: 'Whether to say !sdrawkcab ti',
            required: false,
          }
        ],
      }
    ];
    //**That section belows has been moved to Util.js command load section 
      const commands = [...this.client.commands.values()].map((command) => ({
        name: command.name,
        description: command.description?.trim(), //  (command.description.substr(0, 97) + command.description.length > 97 ? '...' : '') : 'No description!',
        options: command.options || [],
      }));

      await this.client.application.commands.set(commands);
      console.log(`registered ${commands.length} slash commands!`);
      */
      // const guild = await this.client.guilds.fetch('751501408213401650', { force: true }); // that's the id of the test server
      // await guild.commands.set(commands);
      // console.log(command);
    }
    //const f = b.prefix;
    //if (!a.content.startsWith(f)) return;
    //const [g, ...h] = a.content.slice(f.length).trim().split(/ +/g);

    const i =
    this.client.commands.get(commands)
    //this.client.commands.get(this.client.aliases.get(g.toLowerCase()));

    //* verification for commands if owner only , guild , if nsfw command or if args are required

    if (i) {
      if (i.ownerOnly && !this.client.utils.checkOwner(a.author.id))
        return a.reply(
          "Sorry, this command can only be used by the bot owners."
        );
      if (i.guildOnly && !a.guild)
        return a.reply(
          "Sorry, this command can only be used in a discord server."
        );
      if (i.nsfw && !a.channel.nsfw)
        return a.reply(
          "Sorry, this command can only be ran in a NSFW marked channel."
        );
      if (i.args && !h.length)
        return a.reply(
          `Sorry, this command requires arguments to function. Usage: ${
            i.usage
              ? `${this.client.prefix + i.name} ${i.usage}`
              : "This command doesn't have a usage format"
          }`
        );

        //* permission verification
      if (a.guild) {
        const b = i.userPerms
          ? this.client.defaultPerms.add(i.userPerms)
          : this.client.defaultPerms;
        if (b) {
          const c = a.channel.permissionsFor(a.member).missing(b);
          if (c.length)
            return a.reply(
              `You are missing ${this.client.utils.formatArray(
                c.map(this.client.utils.formatPerms)
              )} permissions, you need them to use this command!`
            );
        }
        const c = i.botPerms
          ? this.client.defaultPerms.add(i.botPerms)
          : this.client.defaultPerms;
        if (c) {
          const b = a.channel.permissionsFor(this.client.user).missing(c);
          if (b.length)
            return a.reply(
              `I am missing ${this.client.utils.formatArray(
                b.map(this.client.utils.formatPerms)
              )} permissions, I need them to run this command!`
            );
        }
      }
    i.run(a, h);
  }
};
};
