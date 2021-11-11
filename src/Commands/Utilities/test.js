const { SlashCommandBuilder } = require("@discordjs/builders");
const emoji = require("../../Structures/JSONs/emoji.json")
const {MessageAttachment} = require("discord.js")
//**DONE  */
module.exports = {
	data: new SlashCommandBuilder().setName("test").setDescription("test embeds."),

	async run(interaction) {
//const attachment = new MessageAttachment('https://tenor.com/view/love-you-gif-20502539.gif ');
const embed = new MessageEmbed()
.setTitle(`yo , this is a title ${emoji[":blobyes:"]}`)
.setDescription(`Description! ${emoji[":blobyes:"]}`)
.addField(`this is a field ${emoji[":blobyes:"]}` , `this is the value lol ${emoji[":blobyes:"]}`)
.setFooter(`this is a footer ${emoji[":blobyes:"]}`)
//.setImage('attachment://love-you-gif-20502539.gif')

interaction.reply({embeds : [embed] , /*files : [attachment]*/})

//interaction.channel.messages.fetch({ limit: 10 })
  //.then(messages => console.log(`Received ${messages.size} messages`,messages.map((message) => `${message.content}`)))
  //.catch(console.error);
}}