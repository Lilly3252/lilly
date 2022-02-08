const { SlashCommandBuilder } = require("@discordjs/builders");
//adding a module to read yaml file here
//NOTE TO SELF : add a .toml creation file for guildCreate event. Every guild will have its toml file

module.exports = {
  data: new SlashCommandBuilder().setName("tags").setDescription("tags."),
  /*.addStringOption((option) => option.setName("action").setDescription("Choose a action").setRequired(true)
        .addChoice("Create", "create").addChoice("Delete", "delete").addChoice("Modify", "modify").setRequired(true))
    .addStringOption((option) => option.setName("query").setDescription("Specify a tag name").setRequired(true))
    .addStringOption((option) => option.setName("message").setDescription("message to write").setRequired(true))
    */ async run(interaction) {
    interaction.reply("this command is not completed yet");
    /*
const action_name = interaction.options.getString("action");
const query = interaction.options.getString("query");
const message = interaction.options.getString("message");

const tagFiles = fs.readdirSync(`src/Tags/${folder}/`).filter((file) => file.endsWith(".toml"))
for (const file of tagFiles) {
      if(!file){
        fs.writeFile(`${interaction.guild.name}.toml`){ encoding: 'utf8' }
      }
  }

switch (action_name) {
      case "create":
      -> do we need a permission for creating this tag? (no,maybe)
      -> What do we need inside that command?
        -> declaring/get the name of the tag as strings
        -> declaring/get the content(message) of the tag as strings
        -> Check if theres a toml file 
        -> Check if the tags has a name and a message content.(it's required so i dont think i would need to check for that)
        -> write name and message content into file. (fs.writeFile)
        -> save?

      break;
      case "delete":
      -> do we need a permission for deleting this tag? (yes)
        -> What permission (role higher than bot or administrator / manage server permission)
      -> What do we need inside that command?
        -> check in toml file if theres a name with that string input
        -> preview the tag content in ephemeral
        -> decide if deleting yes or no ( with collector )
        -> if yes -> delete , if no -> cancel
        -> save?

      break;
      case "modify":
      -> do we need a permission for modify this tag? (yes)
        -> Check for permission or who did the tag ? (who did it)
      -> What do we need inside that command?
        -> check in toml file if theres a name with that string input
        -> preview the tag content in ephemeral
        -> decide if modifying yes or no ( with collector )
        -> if yes -> modify (with message collector and modify the previous message content with the new one)
        -> if no -> cancel
        -> save?

      break;
  }
*/
  },
};
