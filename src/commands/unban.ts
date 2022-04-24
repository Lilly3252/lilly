import { CommandInteraction, Permissions } from "discord.js";
import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";
import SYSTEM from "./../structure/messageSystem.json";

export class UnbanCommand extends Command {
  public constructor(context: Command.Context) {
    super(context, {
      description: "Unban someone",
      chatInputCommand: {
        register: true,
      },
    });
  }
  public registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option: SlashCommandStringOption) =>
        option.setName("id").setDescription("put a id").setRequired(true)
      )
      .addStringOption((option: SlashCommandStringOption) =>
        option
          .setName("reason")
          .setDescription("reason to unban")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder);
  }

  public async chatInputRun(interaction: CommandInteraction<"cached">) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["BAN_MEMBERS"],
        ephemeral: true,
      });
    }
    if (!interaction.guild.me) {
      return;
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"],
        ephemeral: true,
      });
    }
    let banned_person = interaction.options.getString("id");
    if (!Number(banned_person))
      return interaction.reply({
        content: SYSTEM.ERROR.ADMIN.NO_USER_ID,
        ephemeral: true,
      });
    let d = interaction.options.getString("reason") as string;
    interaction.guild.bans.fetch().then(async (b) => {
      if (b.size == 0)
        return interaction.reply({
          content: SYSTEM.ERROR.ADMIN.NO_USER_BANNED,
          ephemeral: true,
        });

      let e = b.find((a) => a.user.id == banned_person);
      return e
        ? void (await interaction.guild.members
            .unban(e.user, d)
            .catch((a) => console.log(a)),
          interaction.reply({
            content: `**${e.user}** has been unban`,
            ephemeral: true,
          }))
        : interaction.reply({
            content: "this user is not banned",
            ephemeral: true,
          });
    });
  }
}
