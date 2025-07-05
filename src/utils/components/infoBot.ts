import { InfoCommand } from "#slashyInformations/index.js";
import { formatBytes } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import {
  ButtonStyle,
  ClientApplication,
  TimestampStyles,
  time,
  ButtonBuilder,
  ContainerBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
} from "discord.js";
import i18next from "i18next";
import ms from "ms";
import os from "os";
import * as Package from "../../../package.json" with { type: "json" };

const b = os.cpus()[0];

export async function botInfo(
  application: ClientApplication,
  interaction: InteractionParam,
  args: ArgsParam<typeof InfoCommand>,
  language: string | undefined
) {
  const containers = new ContainerBuilder();


  const BotInfoHeader = new TextDisplayBuilder().setContent("## Bot Information!");
  containers.addTextDisplayComponents(BotInfoHeader);

  const InformationHeader = new TextDisplayBuilder().setContent("Information");
  containers.addTextDisplayComponents(InformationHeader);

  const BotInformations = new TextDisplayBuilder().setContent(
    i18next.t("command.utility.info.bot.info", {
      owner: `${application.owner} (${application.owner?.id})`,
      servers: interaction.client.guilds.cache.size.toLocaleString(),
      users: interaction.client.guilds.cache.reduce((c, a) => c + a.memberCount, 0).toLocaleString(),
      channels: interaction.client.channels.cache.size.toLocaleString(),
      create_date: time(interaction.client.user.createdAt, TimestampStyles.RelativeTime),
      node: process.version,
      ts: `v${Package.default.dependencies["typescript"].replace("^", "")}`,
      djs: `v${Package.default.dependencies["discord.js"].replace("^", "")}`,
      lng: language,
    })
  );
  containers.addTextDisplayComponents(BotInformations);

  if (args.bot.verbose) {

    containers.addSeparatorComponents((separator) => separator.setSpacing(SeparatorSpacingSize.Small));

    const SystemHeader = new TextDisplayBuilder().setContent("## System");
    containers.addTextDisplayComponents(SystemHeader);

    const SystemInformation = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.bot.system", {
        platform: process.platform,
        uptime: ms(1e3 * process.uptime(), { long: true }),
        cores: os.cpus().length,
        model: b.model.replace("(R) Core(TM)", ""),
        speed: b.speed,
        total_memory: formatBytes(process.memoryUsage().heapTotal),
        used_memory: formatBytes(process.memoryUsage().heapUsed),
        lng: language,
      })
    );
    containers.addTextDisplayComponents(SystemInformation);

    containers.addActionRowComponents((row) =>
      row.addComponents(
        new ButtonBuilder()
          .setLabel("Open Source Here")
          .setStyle(ButtonStyle.Link)
          .setURL("https://github.com/Lilly3252/lilly")
      )
    );
  }

  return containers 
}
