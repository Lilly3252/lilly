const LillyClient = require("../src/Structures/LillyClient");
const config = require("./config.json");
const client = new LillyClient(config);
const mongoose = require("mongoose");
const util = require("./Structures/Util")


mongoose.connect(config.mongooseLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.start();
console.log("im connected with mongoose!");
