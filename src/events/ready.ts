import {readdirSync} from "fs";

class Ready extends require("../classes/Event"){
    constructor() {
        super("ready",true);
    }

    exec(bot){
        console.log("Ready event, loading commands.");
        bot.commands = new Map();
        readdirSync("./commands").forEach(f => {
            if(!f.endsWith(".js")) return;
            const js = require(`../commands/${f}`);
            if(!(js instanceof require("../classes/Command"))) return;
            bot.commands.set(js.getName(),js);
        });
    }
}
module.exports = new Ready();