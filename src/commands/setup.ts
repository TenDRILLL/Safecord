const { ApplicationCommandOptionType } = require("discord.js");
class setup extends require("../classes/Command"){
    constructor(){
        super(
            "setup",
            {
                name: "setup",
                description: "Setup the Captcha Modal.",
                options: [
                    {
                        name: "role",
                        description: "123",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "role",
                                description: "456",
                                type: ApplicationCommandOptionType.Role,
                                required: true
                            }
                        ]
                    }, {
                        name: "button",
                        description: "123",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "name",
                                description: "456",
                                type: ApplicationCommandOptionType.String,
                                required: true
                            }, {
                                name: "color",
                                description: "456",
                                type: ApplicationCommandOptionType.String,
                                autocomplete: true,
                                required: true
                            }, {
                                name: "emoji",
                                description: "456",
                                type: ApplicationCommandOptionType.String,
                                required: false
                            }
                        ]
                    }, {
                        name: "message",
                        description: "123",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "message",
                                description: "456",
                                type: ApplicationCommandOptionType.String,
                                required: true
                            }
                        ]
                    }, {
                        name: "description",
                        description: "123",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "description",
                                description: "456",
                                type: ApplicationCommandOptionType.String,
                                required: true
                            }
                        ]
                    }, {
                        name: "language",
                        description: "123",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "language",
                                description: "456",
                                type: ApplicationCommandOptionType.String,
                                autocomplete: true,
                                required: true
                            }
                        ]
                    }, {
                        name: "enabled",
                        description: "123",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "enabled",
                                description: "456",
                                type: ApplicationCommandOptionType.Boolean,
                                required: true
                            }
                        ]
                    }, {
                        name: "send",
                        description: "123",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "channel",
                                description: "456",
                                type: ApplicationCommandOptionType.Channel,
                                required: true
                            }
                        ]
                    }
                ]
            }
        );
        /* /setup
        *  -> role ROLE:set
        *  -> button STRING:name STRING:color:AUTOCOMPLETE, STRING:emoji:OPTIONAL
        *  -> message STRING:set
        *  -> description STRING:set
        *  -> locale STRING:set:AUTOCOMPLETE
        *  -> enabled BOOLEAN:set
        *  -> send CHANNEL:channel
        * */
    }

    cmdRun(interaction,bot){
        interaction.reply("Yes.");
    }
}
module.exports = new setup();