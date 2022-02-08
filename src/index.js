const LillyClient = require("../src/Structures/LillyClient.js");
const config = require("./config.json");
const client = new LillyClient(config);
const mongoose = require("mongoose");

mongoose.connect(config.mongooseLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.start();
console.log("im connected with mongoose!");