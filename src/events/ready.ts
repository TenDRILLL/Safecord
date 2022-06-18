import { Event } from "../classes/Event";
import * as Database from "../automation/databaseManager";
import {Client} from "../types/classes";
class Ready extends Event{
    constructor() {
        super("ready",true);
    }

    exec(bot: Client){
        bot.createCommands();
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
        }).catch(e => console.log(e));
    }
}
module.exports = new Ready();