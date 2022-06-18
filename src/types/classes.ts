import { Client as BaseClient, Collection } from "discord.js";
import Command from "../classes/Command";
import { readdirSync } from "fs";

export class Client extends BaseClient {
    public commands = new Collection<string, Command>();
    public db = new Collection<string, ConfigObject>();

    createCommands(): void {
        readdirSync("./commands").forEach(f => {
            if(!f.endsWith(".js")) return;
            const js = require(`../commands/${f}`);
            if(!(js instanceof Command)) return;
            this.commands.set(js.getName(),js);
            console.log(`${js.getName()} loaded`);
        });
    }
}