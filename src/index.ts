/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config"
//import { PrismaClient } from '@prisma/client'
//export const prisma = new PrismaClient({ errorFormat: 'pretty' })
import LillyClient from "./structures/lillyClient.js";
const client = new LillyClient();
import process from "node:process";


//prisma.$connect()
client.start();
console.log("im connected with db!");

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (err, origin) => {
    console.error('uncaughtException:', err, origin)
});

process.on('warning', (warning) => {
    console.warn(warning.name);
    console.warn(warning.message);
    console.warn(warning.stack);
});


