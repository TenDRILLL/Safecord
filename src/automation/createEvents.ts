import { readdirSync } from "node:fs";
import { Event } from "../classes/Event";
export function exec(bot){
    const eventFiles = readdirSync(`${__dirname}/../events`).filter(x => x.endsWith(".js"));
    eventFiles.forEach(name => {
        const file = require(`../events/${name}`);
        if(!(file instanceof Event)) return;
        bot[file.isRunOnce() ? "once" : "on"](file.getName(), (...args) => file.exec(...args, bot));
    });
}