import { Client, GatewayIntentBits } from "discord.js";
import * as createEvents from "./automation/createEvents";
import Enmap from "enmap";
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

const botToken = process.env.token;
bot["db"] = new Enmap(
    {
        name: "configurations"
    }
);

createEvents.exec(bot);

bot.login(botToken)
    .catch((e)=>{
        console.log(e);
        process.exit();
    });