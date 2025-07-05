import { ArgsParam, InteractionType,CommandMethodParameters,ComponentMethod,ComponentMethodParameters,CommandMethod,ComponentPayload,CacheType,CommandPayload, Runtime } from "@yuudachi/framework/types";

export type EmojifyOptions = {
  mode: boolean;
  padStart?: boolean;
  separator?: string;
  space?: number;
};
export interface Tag {
  keywords: string[];
  content: string;
}
export interface PollArgs {
  duration: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3?: string;
  answer4?: string;
  answer5?: string;
  answer6?: string;
  answer7?: string;
  answer8?: string;
  answer9?: string;
  answer10?: string;
}
export interface Quest {
  questName: string;
  description: string;
  reward: string;
  expiryDate?: Date;
  progress?: number;
  completed: boolean;
}
export type RawCommandParam<M extends CommandMethod = CommandMethod.ChatInput> = InteractionParam<
    M,
    InteractionType.ApplicationCommand,
    Runtime.Raw,
    "raw"
>;
export type RawArgsParam<C extends CommandPayload,M extends CommandMethod = CommandMethod.ChatInput> = ArgsParam<
    C,
    M,
    InteractionType.ApplicationCommand,
    Runtime.Raw,
    "raw"
>
