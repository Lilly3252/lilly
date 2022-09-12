/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import type { SlashCommand } from "../../structures/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { prisma } from "../../index.js";
import * as Embed from "../../structures/messageEmbeds.js";

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("settings")
    .setDescription("show or add settings")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommand((subcommand) =>
        subcommand
            .setName("showsettings")
            .setDescription("Show settings you have")
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("anti-raid")
            .setDescription("set anti-raid ON or OFF")
            .addBooleanOption((option) =>
                option.setName("choice").setDescription("Select a boolean")
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("welcomechannel")
            .setDescription("set the welcome channel")
            .addChannelOption((option) =>
                option
                    .setName("channel")
                    .setDescription("Select a channel.")
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("modlog")
            .setDescription("set the Mod Log channel")
            .addChannelOption((option) =>
                option
                    .setName("channel")
                    .setDescription("Select a channel.")
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("modrole")
            .setDescription("set the Mod Role channel")
            .addRoleOption((option) =>
                option.setName("role").setDescription("Enter a Role")
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("messagedelete")
            .setDescription("set the DeleteMessages event ON or OFF")
            .addBooleanOption((option) =>
                option.setName("choice").setDescription("Select a boolean")
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("messagedeletebulk")
            .setDescription("set the messageDeleteBulk event ON or OFF")
            .addBooleanOption((option) =>
                option.setName("choice").setDescription("Select a boolean")
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("messageupdates")
            .setDescription("set the MessageUpdates event ON or OFF")
            .addBooleanOption((option) =>
                option.setName("choice").setDescription("Select a boolean")
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("welcomemessage")
            .setDescription("set the WelcomeMessage for your guild")
            .addStringOption((option) =>
                option.setName("message").setDescription("Enter a message")
            )
    )

export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    const guild_db = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } })
        .then(async (guild) => {
            if (!guild) {
                await prisma.guild.create({
                    data: {
                        guildID: interaction.guild.id,
                        name: interaction.guild.name,
                        moderatorRole: null,
                        logChannelID: null,
                        welcomeChannelID: null,
                        personalizedWelcomeMessage: null,
                        antiRaidMode: false,
                        messageDeleteMode: false,
                        messageBulkDeleteMode: false,
                        messageUpdateMode: false
                    }
                })
            }
            return prisma.guild.findFirst({ where: { guildID: interaction.guild.id } })
        })
    if (interaction.options.getSubcommand() === "showsettings") {
        interaction.reply({
            embeds: [Embed.SettingEmbed(interaction, guild_db!)],
            ephemeral: true,
        });
    }
    //**SUB COMMANDS */
    if (interaction.options.getSubcommand() === "anti-raid") {
        const choices = interaction.options.getBoolean("choice");
        if (choices === true) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { antiRaidMode: true } }),
                interaction.reply({
                    content: "\u2705 AntiRaid Mode enable.",
                    ephemeral: true,
                })
        } else {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { antiRaidMode: false } }),
                interaction.reply({
                    content: "\u274C AntiRaid Mode disable.",
                    ephemeral: true,
                })
        }
    }
    // MessageUpdate event
    if (interaction.options.getSubcommand() === "messageupdates") {
        const choices = interaction.options.getBoolean("choice");
        if (choices === true) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { messageUpdateMode: true } }),
                interaction.reply({
                    content: "\u2705 MessageUpdate has been enable.",
                    ephemeral: true,
                })
        } else {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { messageUpdateMode: false } }),
                interaction.reply({
                    content: "\u274C MessageUpdate has been disable.",
                    ephemeral: true,
                })
        }
    }
    //MessageDelete Event
    if (interaction.options.getSubcommand() === "messagedelete") {
        const choices = interaction.options.getBoolean("choice");
        if (choices === true) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { messageDeleteMode: true } }),
                interaction.reply({
                    content: "\u2705 MessageDelete has been enable.",
                    ephemeral: true,
                })
        } else {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { messageDeleteMode: false } }),
                interaction.reply({
                    content: "\u274C MessageDelete has been disable.",
                    ephemeral: true,
                })
        }
    }
    //MessageDeleteBulk Event
    if (interaction.options.getSubcommand() === "messagedeletebulk") {
        const choices = interaction.options.getBoolean("choice");
        if (choices === true) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { messageBulkDeleteMode: true } }),
                interaction.reply({
                    content: "\u2705 messageDeleteBulk has been enable.",
                    ephemeral: true,
                })
        } else {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { messageBulkDeleteMode: false } }),
                interaction.reply({
                    content: "\u274C MessageDeleteBulk has been disable.",
                    ephemeral: true,
                })
        }
    }
    //WelcomeChannel Setup
    if (interaction.options.getSubcommand() === "welcomechannel") {
        const e = interaction.options.getChannel("channel")!;
        if (e.isTextBased()) {
            prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { welcomeChannelID: e.id } })
            return void interaction.reply({
                content: `✅ Welcome Channel has been set to ${e}`,
                ephemeral: true,
            })
        }
        else {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { welcomeChannelID: null } })
            return void interaction.reply({
                content: `✅ Welcome Channel has been removed`,
                ephemeral: true,
            })
        }
    }
    //ModLog channelID setup
    if (interaction.options.getSubcommand() === "modlog") {
        const f = interaction.options.getChannel("channel")!;
        if (f.isTextBased()) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { logChannelID: f.id } }).then(() =>
                interaction.reply({
                    content: `✅ ModLog Channel has been set to ${f}`,
                    ephemeral: true,
                }))
        }
        else {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { logChannelID: null } })
            return void interaction.reply({
                content: `✅ ModLog Channel has been removed`,
                ephemeral: true,
            })
        }
    }
    //ModRole ID Setup
    if (interaction.options.getSubcommand() === "modrole") {
        const h = interaction.options.getRole("role")!;
        if (h.permissions.has(PermissionFlagsBits.Administrator)) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { moderatorRole: h.id } }),
                interaction.reply({
                    content: `✅ ModRole has been set to ${h.name}`,
                    ephemeral: true,
                })
        }
        else {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { moderatorRole: null } })
            return void interaction.reply({
                content: `✅ ModRole has been removed`,
                ephemeral: true,
            })
        }
    }
    // WelcomeMessage Setup
    //**Need to be tested */
    if (interaction.options.getSubcommand() === "welcomemessage") {
        const i = interaction.options.getString("input");
        if (i) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { personalizedWelcomeMessage: i } })
            return void interaction.reply({
                content: `✅ Welcome Message has been set to ${i}`,
                ephemeral: true,
            })
        } else if (i === null) {
            await prisma.guild.update({ where: { guildID: interaction.guild.id }, data: { personalizedWelcomeMessage: null } })
            return void interaction.reply({
                content: `✅ Welcome Message has been deleted`,
                ephemeral: true,
            })
        }

    }
};