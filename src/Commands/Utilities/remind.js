const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");
const { shorten } = require("../../Structures/Util");

module.exports = {
	data: new SlashCommandBuilder().setName("remind").setDescription("remind something for you."),
	async run(interaction, { time }) {
		interaction.reply("this command is not complete , try again later!");
		// * make this work
		/*const exists = await this.client.timers.exists(
      interaction.channel.id,
      interaction.author.id
    );
    if (exists)
      return interaction.reply(
        "🕰️ Only one reminder can be set per channel per user."
      );
    const timeMs = time.startDate.getTime() - Date.now();
    if (timeMs > 0x7fffffff)
      return interaction.reply(
        "🕰️ Reminders have a maximum length of ~24.84 days."
      );
    const display = moment().add(timeMs, "ms").fromNow();
    const title = time.eventTitle ? shorten(time.eventTitle, 500) : "something";
    await this.client.timers.setTimer(
      interaction.channel.id,
      timeMs,
      interaction.author.id,
      title
    );
    return interaction.reply(
      `🕰️ Okay, I will remind you **"${title}"** ${display}.`
    );
	*/
	}
};
