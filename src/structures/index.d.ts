import type { Collection, ChatInputCommandInteraction, AutocompleteInteraction,ContextMenuCommandInteraction, ModalSubmitInteraction, SlashCommandBuilder ,SlashCommandSubcommandsOnlyBuilder  } from 'discord.js';
import { ContextMenuCommandBuilder } from "discord.js"
import * as Util from "./util.js";
import type client from './lillyClient.js';

declare module "discord.js" {
  interface Client {
    utils: Util;
    commands: Collection<string, SlashCommand | ContextCommand>,
    event: Collection<string, event>
    modals: Collection<string, ModalCommand>
    contextCommand: Collection<string,ContextCommand>
  }
}

interface event {
  name: string;
  client: client;
  type: string;
  emitter: string;
  once: boolean;
  /**
     * @param args Arguments...
     */
  run(...args: unknown[]): Promise<void>;
}

interface SlashCommand {
  /**
   * Data as SlashCommandBuilder.
   */
  slashy:Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup" >|SlashCommandSubcommandsOnlyBuilder
  /** 
   * 
   * @param {CommandInteraction} interaction  The CommandInteraction object from the interactionCreate event or collector
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run(interaction: ChatInputCommandInteraction | AutocompleteInteraction): Promise<any>;
}
interface ModalCommand {
  /**
   * Custom id of the modal.
   */
  customId: string;
  /**
   * The method this command executes if called.
   * 
   * @param {ModalSubmitInteraction} interaction The CommandInteraction object from the interactionCreate event or collector.
   */
  run(interaction: ModalSubmitInteraction): Promise<void>;
}

interface ContextCommand {
  /**
   * The data as ContextCommand
   */
  context: ContextMenuCommandBuilder;
  /**
   * If the command is owner only.
   */
  ownerOnly?: boolean;

  /**
   * The method this command executes if called.
   * 
   * @param {ContextMenuInteraction} interaction The ContextMenuInteraction object from the interactionCreate event or collector.
   */
  run(interaction: ContextMenuCommandInteraction): Promise<void>;
}
