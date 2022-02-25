const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Guild = require("../../Database/models/Guild");
const Embed = require("./../../Structures/messageEmbeds")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nickname").setDescription("change guild member nickname.")
        .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true))
        .addStringOption((option) => option.setName("nickname").setDescription("New nickname").setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("reason for changing")),
    async run(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) {
            return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["CHANGE_NICKNAME"]);
        } if (!interaction.guild.me.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) {
            return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["CHANGE_NICKNAME"]);
        }
        const c = await Guild.findOne({ guildID: interaction.guild.id })
        const member = interaction.options.getMember("target");
        const nickname = interaction.options.getString("nickname");
        const reason = interaction.options.getString("reason");

        if(member.manageable){await member.setNickname(nickname).then(() => interaction.reply("nickname changed!"))}else{interaction.reply("That member is not manageable!") }
        

        const g = c.logchannelID;
        g && null !== g && interaction.client.channels.cache.get(g).send({ embeds: [Embed.AdminEmbed(interaction, member, reason)] });
    },
};
