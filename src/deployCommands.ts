import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { readdirSync } from "fs";
import { ApplicationCommandData } from "discord.js";
import { Command } from "./classes/Command";
import * as config from "./config.json";

const token = process.env.token ?? config.token;
const applicationId = process.env.applicationId ?? config.applicationId;
const commands: ApplicationCommandData[] = [];

readdirSync("./commands").forEach(f => {
    if(!f.endsWith(".js")) return;
    const js = require(`./commands/${f}`);
    if(!(js instanceof Command) || !(js.getSlashObject())) return;
    commands.push(js.getSlashObject());
});

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(applicationId as string), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);