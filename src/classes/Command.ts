import {
    ApplicationCommandData,
    AutocompleteInteraction,
    CommandInteraction,
    ModalSubmitInteraction,
    SelectMenuInteraction,
    ButtonInteraction
} from "discord.js";
import { Client } from "../types/classes";

export default abstract class Command {
    private readonly name: string;
    private readonly slashObject?: ApplicationCommandData;

    constructor(name: string, slashObject?: ApplicationCommandData){
        this.name = name;
        this.slashObject = slashObject;
    }

    getName(): string { return this.name; }
    getSlashObject(): ApplicationCommandData | undefined { return this.slashObject; }

    cmdRun(bot: Client, interaction: CommandInteraction){ return console.log(`${this.name} ran, but cmdRun method wasn't overridden.`); }
    btnRun(bot: Client, interaction: ButtonInteraction){ return console.log(`${this.name} ran, but btnRun method wasn't overridden.`); }
    slmRun(bot: Client, interaction: SelectMenuInteraction){ return console.log(`${this.name} ran, but slmRun method wasn't overridden.`); }
    acRun(bot: Client, interaction: AutocompleteInteraction){ return console.log(`${this.name} ran, but acRun method wasn't overridden.`); }
    msRun(bot: Client, interaction: ModalSubmitInteraction){ return console.log(`${this.name} ran, but msRun method wasn't overridden.`); }
}