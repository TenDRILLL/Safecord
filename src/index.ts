const { Client, GatewayIntentBits } = require("discord.js");
const Enmap = require("enmap");
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});
const { token } = require("./config.json");
bot.db = new Enmap(
    {
        name: "configurations"
    }
);

require("./automation/createEvents").exec(bot);

bot.login(token)
    .catch((e)=>{
        console.log(e);
        process.exit();
    });