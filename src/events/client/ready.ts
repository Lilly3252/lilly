import { once } from "node:events";
import { createAudioPlayer } from '@discordjs/voice';
import { Client, Events } from "discord.js";
import { injectable } from "tsyringe";

//import { logger } from "@yuudachi/framework";
import type { Event } from "@yuudachi/framework/types";
import { player, playSong } from "#utils/index.js";




@injectable()
export default class implements Event {
	public name = "Client ready handling";

	public event = Events.ClientReady as const;

	public constructor(public readonly client: Client<true>) {}

	public async execute(): Promise<void> {
		await once(this.client, this.event);
		
		console.log("connected via console.logging instead of logger");
		try {
			await playSong(player, 'https://edmdnb.com:448/listen/japanese_edm/radio.mp3');
	
			console.log('Ready to play the song!');
		} catch (error) {
			
			console.error(error);
		}
		
	}
}
/*http://cast.streamlas.fr:1270/stream http://puma.streemlion.com:3550/stream - Waiting for authorisation letter*/