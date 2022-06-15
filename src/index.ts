import { Client, GatewayIntentBits } from "discord.js";
import Enmap from "enmap";
import { token } from "./config.json";
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

const botToken = process.env.token ?? token;
bot["db"] = new Enmap(
    {
        name: "configurations"
    }
);

require("./automation/createEvents").exec(bot);

bot.login(botToken)
    .catch((e)=>{
        console.log(e);
        process.exit();
    });