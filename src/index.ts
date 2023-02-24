/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from 'dotenv';
config();
import LillyClient from './structures/lillyClient.js';
const client = new LillyClient();
import process from 'node:process';
import mongoose from 'mongoose';


mongoose.connect(process.env.MONGOOSE_URI!);
mongoose.set('strictQuery',true);

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
