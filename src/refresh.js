const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("./config.json");
const fs = require("fs");

const commands = [];
const modules = ["Administrator", "Fun", "Informations", "Utilities"]; // subfolder of Command folder

modules.forEach((folder) => {
 
      const commandFiles = fs
        .readdirSync(`src/Commands/${folder}/`)
        .filter((file) => file.endsWith(".js"));
    
      for (const file of commandFiles) {
        //console.log(file)
        const command = require(`./Commands/${folder}/${file}`);
        //console.log(command)
        commands.push(command.data.toJSON());
        
      }
    });

const clientId = config.ClientID;
const guildId = config.GuildID;
const rest = new REST({ version: "9" }).setToken(config.token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded application (/) commands. ${commands.length} commands has been refreshed`
    );
  } catch (error) {
    console.error(error);
  }
})();
