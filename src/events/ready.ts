import {readdirSync} from "fs";
import { Command } from "../classes/Command";
import { Event } from "../classes/Event";
import * as Database from "../automation/databaseManager";
class Ready extends Event{
    constructor() {
        super("ready",true);
    }

    exec(bot){
        console.log("Ready event, loading commands...");
        bot.commands = new Map();
        readdirSync("./commands").forEach(f => {
            if(!f.endsWith(".js")) return;
            const js = require(`../commands/${f}`);
            if(!(js instanceof Command)) return;
            bot.commands.set(js.getName(),js);
            console.log(`${js.getName()} loaded`);
        });
        console.log("\nLoading Guild Configurations...");
        bot.guilds.fetch().then(() => {
            Database.startConnection().then(()=>{
                bot.guilds.cache.forEach(guild =>{
                    Database.getConfiguration(guild.id)
                        .then(config => {
                            bot.db.set(guild.id,config);
                        }).catch(e => {
                        console.log(e);
                    });
                });
            });
        });
    }
}
module.exports = new Ready();