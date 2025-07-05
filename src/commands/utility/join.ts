import type { PollCommand } from "#slashyInformations/index.js";
import { JoinCommand } from "#slashyInformations/utility/join.js";

import { connectToChannel } from "#utils/functions.js";
import { player } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam } from "@yuudachi/framework/types";



export default class extends Command<typeof JoinCommand> {
  public override async chatInput(interaction: InteractionParam,args:ArgsParam<typeof JoinCommand>): Promise<void> {
   
        
        if (!interaction.member?.voice.channel) {
            await interaction.reply('Join a voice channel then try again!');
   
            return;
        }
        
        try {
            
            const connection = await connectToChannel(interaction.member.voice.channel);
            
            connection.subscribe(player);
            
   
            await interaction.reply({content:"playing now!"});
           
        } catch (error) {
            console.error(error);
        }
    
  }
}
