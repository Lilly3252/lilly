import process from 'node:process';

import LillyClient from '#structures/lillyClient.js';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const client = new LillyClient();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOOSE_URI!);

client.start();
console.log('im connected with db!');

process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (err, origin) => {
	console.error('uncaughtException:', err, origin);
});

process.on('warning', (warning) => {
	console.warn(warning.name);
	console.warn(warning.message);
	console.warn(warning.stack);
});
