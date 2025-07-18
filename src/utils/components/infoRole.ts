import { InfoCommand } from "#slashyInformations/index.js";
import { ArgsParam } from "@yuudachi/framework/types";
import {  codeBlock, ContainerBuilder, Role, TextDisplayBuilder } from "discord.js";
import i18next from "i18next";

export async function roleInfo(
  args: ArgsParam<typeof InfoCommand>["role"],
  role: Role,
  language: string | undefined
): Promise<ContainerBuilder> {
  const containers = new ContainerBuilder().setAccentColor(role.color);

  const infoHeaders = new TextDisplayBuilder().setContent("Role Information");
  containers.addTextDisplayComponents(infoHeaders);
  const info = new TextDisplayBuilder().setContent(
    i18next.t("command.utility.info.role.value", {
      name: `${role}`,
      role_id: role.id,
      color: role.hexColor,
      hoisted: role.hoist,
      mentionable: role.mentionable,
      lng: language,
    })
  );
  containers.addTextDisplayComponents(info);

  if (args.verbose) {
    const formatPermission = (str:string) => str.replace(/([a-z])([A-Z])/g, "$1 $2");

    const firstArray = role.permissions.toArray().slice(0, 20);
    const secondArray = role.permissions.toArray().slice(20);
    
    // Calculate the maximum length for the first column
    const maxLength = Math.max(...firstArray.map(str => formatPermission(str).length));
    
    // Create a padding function
    const padRight = (str:string, len:number) => str.padEnd(len);
    
    // Format and align the output
    const output = firstArray.map((item, index) => {
        const col1 = padRight(formatPermission(item), maxLength);
        const col2 = secondArray[index] ? formatPermission(secondArray[index]) : '';
        return `${col1}`.padEnd(25)+`${col2}`; 
    }).join('\n');
    
    const otherInfoHeaders = new TextDisplayBuilder().setContent("Other Information");
    containers.addTextDisplayComponents(otherInfoHeaders);
    const otherInfo = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.role.other", {
        position: role.position,
        permissions: 
        codeBlock(output),
        lng: language,
      }),
    );
    containers.addTextDisplayComponents(otherInfo);
}
  return containers;
}
