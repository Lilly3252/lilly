const Event = require("../../Structures/Event");


**THIS STILL NEEDS TO BE CLEANED UP!!!**


module.exports = class interactionCreate extends Event {
  async run(interaction, message) {
    if (!interaction.isCommand()) return;

    console.log(interaction);
    console.log(
      `${interaction.commandName} command was used by ${interaction.user.username} in ${interaction.guildId} , in channel : ${interaction.channelId} `);
    if (!this.client.application?.owner) await this.client.application?.fetch();

    {
      const commands = [...this.client.commands.values()].map((command) => ({
        name: command.name,
        description: command.description?.trim(), //  (command.description.substr(0, 97) + command.description.length > 97 ? '...' : '') : 'No description!',
        options: command.options || [],
      }));

      await this.client.application.commands.set(commands);

    const i = this.client.commands.get(commands);
    //this.client.commands.get(this.client.aliases.get(g.toLowerCase()));

    //* verification for commands if owner only , guild , if nsfw command or if args are required

    if (i) {
      if (i.ownerOnly && !this.client.utils.checkOwner(message.author.id))
        return interaction.reply(
          "Sorry, this command can only be used by the bot owners."
        );
      if (i.guildOnly && !message.guild)
        return interaction.reply(
          "Sorry, this command can only be used in a discord server."
        );
      if (i.nsfw && !message.channel.nsfw)
        return interaction.reply(
          "Sorry, this command can only be ran in a NSFW marked channel."
        );
      if (i.args && !h.length)
        return interaction.reply(
          `Sorry, this command requires arguments to function. Usage: ${
            i.usage
              ? `${this.client.prefix + i.name} ${i.usage}`
              : "This command doesn't have a usage format"
          }`
        );

      //* permission verification
      if (message.guild) {
        const b = i.userPerms
          ? this.client.defaultPerms.add(i.userPerms)
          : this.client.defaultPerms;
        if (b) {
          const c = message.channel.permissionsFor(a.member).missing(b);
          if (c.length)
            return interaction.reply(
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
      i.run(interaction, h);
    }
  }}}
