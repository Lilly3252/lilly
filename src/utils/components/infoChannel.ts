import {
  BaseGuildTextChannel,
  ChannelType,
  ContainerBuilder,
  PermissionsBitField,
  SectionBuilder,
  TextDisplayBuilder,
  ThumbnailBuilder,
} from "discord.js";
import i18next from "i18next";

export async function channelInfo(channel: BaseGuildTextChannel, language: string | undefined):Promise<ContainerBuilder> {
  const containers = new ContainerBuilder();
  
const thumbnail = new ThumbnailBuilder().setURL(channel.guild.iconURL()!)
containers.addSectionComponents((section)=> section.setThumbnailAccessory(thumbnail))

  const ChannelInfoHeader = new TextDisplayBuilder().setContent("## Channel Information!");

  containers.addTextDisplayComponents(ChannelInfoHeader)

  const InformationHeader = new TextDisplayBuilder().setContent("Information");
  containers.addTextDisplayComponents(InformationHeader);

  const ChannelInformations = new TextDisplayBuilder().setContent(
    i18next.t("command.utility.info.channel.value", {
      id: channel.id,
      name: channel.name,
      nsfw: channel.nsfw,
      slowmode: channel.rateLimitPerUser ? channel.rateLimitPerUser + " Seconds" : "None",
      private: channel.permissionsFor(channel.guild.id)?.has(PermissionsBitField.Flags.ViewChannel) ? "False" : "True",
      topic: channel.topic ? channel.topic : "no topic",

      lng: language,
    })
  );
  containers.addTextDisplayComponents(ChannelInformations);

  const FooterHeader = new TextDisplayBuilder().setContent(
    `-# Type: ${ChannelType ? ChannelType[channel.type].replace(/([a-z])([A-Z])/g, "$1 $2") : "Cannot provide this information."}`
  );
  containers.addTextDisplayComponents(FooterHeader);


  return containers;
}
