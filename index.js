const LillyClient = require('./Structures/MenuDocsClient');
const config = require('../config.json');

const client = new LillyClient(config);
client.start();