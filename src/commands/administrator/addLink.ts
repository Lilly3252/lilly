import { ChatInputCommandInteraction , PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand , links } from '#type/index.js';
import settingSchema from '#database/guildSettings.js';


export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('addlinks')
	.setDescription('Add suspicious URL into DB')
	.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
	.addStringOption((option) => option.setName('url').setDescription('URL to put'));

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const URL = interaction.options.getString('url') as unknown as links;
	const guild_db = await settingSchema.findOne({ guildID: interaction.guild.id });
	const httpLinks = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
	const nonHTTPlinks = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    if(URL?.domains.match(httpLinks || nonHTTPlinks)){
       guild_db?.urlLinks.set(URL.domains , URL)
        interaction.reply({content:`Link ${URL} has been successfully added`,ephemeral:true})
    }else{
        await interaction.reply({content: `Cannot successfully insert ${URL} into DB , please try again.` , ephemeral:true})
    }


};
