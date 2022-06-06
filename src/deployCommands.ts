const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require("fs");
const { CommandApplicationData } = require("discord.js");
// @ts-ignore
const token = process.env.token ?? require("./config.json").token;
const applicationId = process.env.applicationId ?? require("./config.json").applicationId;
const commands: typeof CommandApplicationData[] = [];

readdirSync("./commands").forEach(f => {
    if(!f.endsWith(".js")) return;
    const js = require(`./commands/${f}`);
    if(!(js instanceof require("./classes/Command"))) return;
    if(!(js.getSlashObject())) return;
    commands.push(js.getSlashObject());
});

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(applicationId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);