import {ButtonStyle} from "discord.js";

const { ApplicationCommandOptionType, ActionRowBuilder,
    ButtonBuilder } = require("discord.js");
const CConfig = require("../classes/CaptchaConfig");
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
        *  -> role ROLE:role
        *  -> button STRING:name STRING:color:AUTOCOMPLETE, STRING:emoji:OPTIONAL
        *  -> message STRING:message
        *  -> description STRING:description
        *  -> locale STRING:set:AUTOCOMPLETE
        *  -> enabled BOOLEAN:enabled
        *  -> send CHANNEL:channel
        * */
    }

    cmdRun(interaction,bot){
        let configuration;

        if(!(bot.db.has(interaction.guild.id))){
            configuration = new CConfig({});
            bot.db.set(interaction.guild.id, configuration);
        } else {
            configuration = bot.db.get(interaction.guild.id);
        }

        if(interaction.options.get("channel")){
            if(configuration.role === null) return interaction.reply({content: "❌ ERROR: `No role set.`"});
            const button = new ButtonBuilder()
                .setLabel(configuration.button.name)
                .setCustomId(`captcha-${interaction.guild.id}`);
            if(configuration.button.emoji === null){
                button.setStyle(this.resolveStyle(configuration.button.color));
            } else {
                button.setEmoji(configuration.button.emoji);
            }
            return interaction.options.get("channel").channel.send({
                content: configuration.message,
                components: [
                    new ActionRowBuilder().setComponents([button])
                ]
            }).then(()=>{
                interaction.reply({content: "Sent."});
            });
        }

        if(interaction.options.get("role")){
            const role = interaction.options.get("role").role;
            if(configuration.role === role.id) return interaction.reply({content: "❌ ERROR: `New role cannot be the same as the old role.`"});
            bot.db.set(interaction.guild.id, role.id, "role");
            return interaction.reply({content: `Role set to: ${role.name}.`});
        }

        if(interaction.options.get("message")){
            const message = interaction.options.get("message").value;
            bot.db.set(interaction.guild.id, message, "message");
            return interaction.reply({content: `Message set.`});
        }
    }

    resolveStyle(style){
        switch(style){
            case "Grey":
                return ButtonStyle.Secondary;
            case "Green":
                return ButtonStyle.Success;
            case "Red":
                return ButtonStyle.Danger;
            case "Blurple":
            default:
                return ButtonStyle.Primary;
        }
    }
}
module.exports = new setup();