import {readdirSync} from "fs";

class Ready extends require("../classes/Event"){
    constructor() {
        super("ready",true);
    }

    exec(bot){
        console.log("Ready event, loading commands...");
        bot.commands = new Map();
        readdirSync("./commands").forEach(f => {
            if(!f.endsWith(".js")) return;
            const js = require(`../commands/${f}`);
            if(!(js instanceof require("../classes/Command"))) return;
            bot.commands.set(js.getName(),js);
            console.log(`${js.getName()} loaded`);
        });
        console.log("\nLoading languages...");
        require("../automation/translator").loadLanguages();
        console.log("\nLoading Guild Configurations...");
        bot.guilds.fetch().then(() => {
            bot.db.defer.then(()=>{
                console.log(`Captcha-Bot operational, observing ${bot.db.size} configurations in ${bot.guilds.cache.size} guilds.`);
            });
        });
    }
}
module.exports = new Ready();