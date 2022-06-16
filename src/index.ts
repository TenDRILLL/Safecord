import { Client, GatewayIntentBits } from "discord.js";
import * as createEvents from "./automation/createEvents";
import 'dotenv/config';
import Enmap from "enmap";
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

bot["db"] = new Enmap(
    {
        name: "configurations"
    }
);

createEvents.exec(bot);

bot.login(process.env.token)
    .catch((e)=>{
        console.log(e);
        process.exit();
    });