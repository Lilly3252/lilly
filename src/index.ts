require("dotenv").config();
import { Lillyclient } from './structure/Lillyclient';
const client = new Lillyclient();
client.login(process.env.TOKEN);
