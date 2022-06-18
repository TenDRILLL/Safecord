import { Event } from "../classes/Event";
import {
    Interaction
} from "discord.js";
import { Client } from "../types/classes";
class InteractionCreate extends Event{
    constructor() {
        super("interactionCreate",false);
    }

    exec(bot: Client, interaction: Interaction){
        if(interaction.isCommand()){
            const cmd = bot.commands.get(interaction.commandName);
            if(cmd) return cmd.cmdRun(bot, interaction);
        } else {
            if(interaction.isButton()) {
                const cmd = bot.commands.get(interaction.customId.split("-")[0]);
                if(cmd) return cmd.btnRun(bot, interaction);
            }
            if(interaction.isSelectMenu()) {
                const cmd = bot.commands.get(interaction.customId.split("-")[0]);
                if(cmd) return cmd.slmRun(bot, interaction);
            }
            if(interaction.isAutocomplete()) {
                const cmd = bot.commands.get(interaction.commandName);
                if(cmd) return cmd.acRun(bot, interaction);
            }
            if(interaction.isModalSubmit()) {
                const cmd = bot.commands.get(interaction.customId.split("-")[0]);
                if(cmd) return cmd.msRun(bot, interaction);
            }
        }
        return console.log(`This interaction type [${typeof interaction}] isn't handled, strange.`);
    }
}
module.exports = new InteractionCreate();