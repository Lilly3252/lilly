const LillyClient = require("../src/Structures/LillyClient");
const config = require("./config.json");
const client = new LillyClient(config);
const mongoose = require("mongoose");




mongoose.connect(config.mongooseLink,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);
console.log("im connected !");

client.start();
