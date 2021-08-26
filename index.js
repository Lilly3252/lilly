const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const LillyClient = require("../src/Structures/LillyClient");
const config = require("./config.json");
const client = new LillyClient(config);
const mongoose = require("mongoose");
const util = require("./Structures/Util")

const clientId = config.ClientID;
const commands = client.commands

const rest = new REST({ version: "9" }).setToken(config.token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log(
      `Successfully reloaded application (/) commands. ${commands.size} commands has been refreshed`
    );
  } catch (error) {
    console.error(error);
  }
})();

mongoose.connect(config.mongooseLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

client.start();
console.log("im connected with mongoose!");
