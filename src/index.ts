import { GatewayIntentBits } from "discord.js";
import { Client } from "./types/classes";
import * as createEvents from "./automation/createEvents";
import 'dotenv/config';
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

createEvents.exec(bot);

bot.login(process.env.token)
    .catch((e)=>{
        console.log(e);
        process.exit();
    });