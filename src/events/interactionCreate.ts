class InteractionCreate extends require("../classes/Event"){
    constructor() {
        super("interactionCreate",false);
    }

    exec(interaction,bot){
        const cmd = bot.commands.get(
            interaction.commandName ?? interaction.customId.split("-")[0]
        );
        if(!cmd) return;
        switch(true){
            case interaction.isCommand():
                cmd.cmdRun(interaction,bot);
                break;
            case interaction.isButton():
                cmd.btnRun(interaction,bot);
                break;
            case interaction.isSelectMenu():
                cmd.slmRun(interaction,bot);
                break;
            case interaction.isAutocomplete():
                cmd.acRun(interaction,bot);
                break;
            case interaction.isModalSubmit():
                cmd.msRun(interaction,bot);
                break;
            default:
                return interaction.reply({content: "This interaction type isn't handled, strange.", ephemeral: true});
        }
    }
}
module.exports = new InteractionCreate();