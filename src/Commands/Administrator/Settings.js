const { SlashCommandBuilder } = require("@discordjs/builders");
const Embed = require("./../../Structures/messageEmbeds");
const Guild = require("../../Database/models/Guild");
const SYSTEM = require("./../../Structures/messageSystem.json");
const { PermissionsBitField } = require("discord.js");
(mongoose = require("mongoose")),
  (module.exports = {
    data: new SlashCommandBuilder()
      .setName("settings")
      .setDescription("show or add settings")
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
          .addStringOption((option) =>
            option.setName("id").setDescription("Enter a ID")
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("modlog")
          .setDescription("set the Mod Log channel")
          .addStringOption((option) =>
            option.setName("id").setDescription("Enter a ID")
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
      ),
    async run(interaction) {
      if (
        !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
      ) {
        return interaction.reply(
          SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["ADMINISTRATOR"]
        );
      }

      const guild_db = await Guild.findOne({
        guildID: interaction.guild.id,
      }).then(async (guild) => {
        if (!guild) {
          await Guild.create({
            _id: mongoose.Types.ObjectId(),
            guildID: interaction.guild.id,
            guildName: interaction.guild.name,
            prefix: "l!",
            moderatorRoleID: null,
            welcomechannelID: null,
            logchannelID: null,
            antiRaidMode: false,
            messageDeleteMode: false,
            messageUpdateMode: false,
            messageBulkDeleteMode: false,
            PersonalizedWelcomeMessage: null,
          });
          return Guild.findOne({ guildID: interaction.guild.id });
        } else {
          return guild;
        }
      });
      if (interaction.options.getSubcommand() === "showsettings") {
        interaction.reply({
          embeds: [Embed.SettingEmbed(interaction, guild_db)],
          ephemeral: true,
        });
      }
      //**SUB COMMANDS */
      if (interaction.options.getSubcommand() === "anti-raid") {
        const choices = interaction.options.getBoolean("choice");
        true === choices &&
          (await guild_db.updateOne({ antiRaidMode: true }),
          interaction.reply({
            content: "\u2705 AntiRaid Mode enable.",
            ephemeral: true,
          })),
          false === choices &&
            (await guild_db.updateOne({ antiRaidMode: false }),
            interaction.reply({
              content: "\u274C AntiRaid Mode disable.",
              ephemeral: true,
            }));
      }
      // MessageUpdate event
      if (interaction.options.getSubcommand() === "messageupdates") {
        const choices = interaction.options.getBoolean("choice");
        true === choices &&
          (await guild_db.updateOne({ messageUpdateMode: true }),
          interaction.reply({
            content: "\u2705 MessageUpdate has been enable.",
            ephemeral: true,
          })),
          false === choices &&
            (await guild_db.updateOne({ messageUpdateMode: false }),
            interaction.reply({
              content: "\u274C MessageUpdate has been disable.",
              ephemeral: true,
            }));
      }
      //MessageDelete Event
      if (interaction.options.getSubcommand() === "messagedelete") {
        const choices = interaction.options.getBoolean("choice");
        true === choices &&
          (await guild_db.updateOne({ messageDeleteMode: true }),
          interaction.reply({
            content: "\u2705 MessageDelete has been enable.",
            ephemeral: true,
          })),
          false === choices &&
            (await guild_db.updateOne({ messageDeleteMode: false }),
            interaction.reply({
              content: "\u274C MessageDelete has been disable.",
              ephemeral: true,
            }));
      }
      //MessageDeleteBulk Event
      if (interaction.options.getSubcommand() === "messagedeletebulk") {
        const choices = interaction.options.getBoolean("choice");
        true === choices &&
          (await guild_db.updateOne({ messageBulkDeleteMode: true }),
          interaction.reply({
            content: "\u2705 messageDeleteBulk has been enable.",
            ephemeral: true,
          })),
          false === choices &&
            (await guild_db.updateOne({ messageBulkDeleteMode: false }),
            interaction.reply({
              content: "\u274C MessageDeleteBulk has been disable.",
              ephemeral: true,
            }));
      }
      //WelcomeChannel Setup
      if (interaction.options.getSubcommand() === "welcomechannel") {
        const e = interaction.options.getString("id");
        isNaN(e) && "false" === e
          ? await guild_db.updateOne({ welcomechannelID: null })
          : (await guild_db.updateOne({ welcomechannelID: e }),
            interaction.reply({
              content: `✅ Welcome Channel has been set to ${e}`,
              ephemeral: true,
            }));
      }
      //ModLog channelID setup
      if (interaction.options.getSubcommand() === "modlog") {
        const f = interaction.options.getString("id");
        isNaN(f) &&
          "false" === i &&
          (await guild_db.updateOne({ logchannelID: null })),
          isNaN(f) && "false" !== i
            ? interaction.reply({
                content:
                  "\u274C You need to give me a channelID to set this setting.",
                ephemeral: true,
              })
            : await guild_db.updateOne({ logchannelID: f }).then(() =>
                interaction.reply({
                  content: `✅ ModLog Channel has been set to ${f}`,
                  ephemeral: true,
                })
              );
      }
      //ModRole ID Setup
      if (interaction.options.getSubcommand() === "modrole") {
        const h = interaction.options.getRole("role");
        h == null || h == undefined
          ? await guild_db.updateOne({ moderatorRoleID: null })
          : (await guild_db.updateOne({ moderatorRoleID: h.id }),
            interaction.reply({
              content: `✅ ModRole has been set to ${h}`,
              ephemeral: true,
            }));
      }
      // WelcomeMessage Setup
      //**Need to be tested */
      if (interaction.options.getSubcommand() === "welcomemessage") {
        const i = interaction.options.getString("input").slice(1).join(` `);
        isNaN(i) && "false" === i
          ? await guild_db.updateOne({ PersonalizedWelcomeMessage: null })
          : (await guild_db.updateOne({ PersonalizedWelcomeMessage: i }),
            interaction.reply({
              content: `✅ Welcome Message has been set to ${i}`,
              ephemeral: true,
            }));
      }
    },
  });
