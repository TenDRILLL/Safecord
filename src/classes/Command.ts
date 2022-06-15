import { ApplicationCommandData } from "discord.js";
export class Command {
    private readonly name: string;
    private readonly slashObject: ApplicationCommandData;

    constructor(name, slashObject){
        this.name = name;
        this.slashObject = slashObject;
    }

    getName(){ return this.name; }
    getSlashObject(){ return this.slashObject; }

    cmdRun(interaction, bot){ return console.log(`${this.name} ran, but cmdRun method wasn't overridden.`); }
    btnRun(interaction, bot){ return console.log(`${this.name} ran, but btnRun method wasn't overridden.`); }
    slmRun(interaction, bot){ return console.log(`${this.name} ran, but slmRun method wasn't overridden.`); }
    acRun(interaction, bot){ return console.log(`${this.name} ran, but acRun method wasn't overridden.`); }
    msRun(interaction, bot){ return console.log(`${this.name} ran, but msRun method wasn't overridden.`); }
}