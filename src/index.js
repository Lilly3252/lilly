require("dotenv").config();
const LillyClient = require("../src/Structures/LillyClient.js");
const config = require("./config.json");
const client = new LillyClient(config);
const mongoose = require("mongoose");
const process = require ("node:process");
mongoose.connect(process.env.MONGOOSE_URI /*?? config.mongooseLink*/, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.start();
console.log("im connected with mongoose!");

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
  if (error.codeName === "AtlasError"){
    console.log("Unhandled promise rejection: You forgot to enter the uri for mongoose..")
  }
});
process.on('uncaughtException', (err , origin) => {
  console.error('uncaughtException:' , err , origin)
});
process.on('warning', (warning) => {
  console.warn(warning.name);    
  console.warn(warning.message); 
  console.warn(warning.stack);   
});


