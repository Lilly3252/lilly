require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const config = require("./config.json");
const fs = require("fs");

const commands = [];
const modules = ["Administrator", "Fun", "Informations", "Utilities"]; // subfolder of Command folder

modules.forEach((folder) => {
  const commandFiles = fs
    .readdirSync(`src/Commands/${folder}/`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./Commands/${folder}/${file}`);

    commands.push(command.data.toJSON());
  }
});

const clientId = process.env.CLIENT_ID ?? config.ClientID;
const guildId = process.env.GUILD_ID ?? config.GuildID;
const rest = new REST({ version: "10" }).setToken(
  process.env.TOKEN ?? config.token
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded application (/) commands. ${commands.length} commands has been refreshed`
    );
  } catch (error) {
    console.error(error);
  }
})();
