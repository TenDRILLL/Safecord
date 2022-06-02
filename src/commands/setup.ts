const { ApplicationCommandOptionType, ActionRowBuilder,
    ButtonBuilder, ButtonStyle } = require("discord.js");
const CConfig = require("../classes/CaptchaConfig");
const Translator = require("../automation/translator");
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
            if(!(interaction.options.get("channel").channel.isText())) return interaction.reply({content: `❌ ERROR: \`${interaction.options.get("channel").channel.name} is not a text channel.\``});
            const button = new ButtonBuilder()
                .setLabel(configuration.button.name)
                .setCustomId(`captcha-${interaction.guild.id}`)
                .setStyle(this.resolveStyle(configuration.button.color));
            if(configuration.button.emoji !== null){
                let emoji = configuration.button.emoji;
                if(/(\d{17,19})/.test(emoji)){
                    emoji = bot.emojis.resolve(emoji);
                    if(emoji){
                        button.setEmoji(emoji);
                    }
                } else {
                    button.setEmoji(configuration.button.emoji);
                }
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

        if(interaction.options.get("language")){
            const language = interaction.options.get("language").value;
            if(configuration.language === language) return interaction.reply({content: "❌ ERROR: `New language cannot be the same as the old language.`"});
            if(!(Translator.checkIfValidLanguage(language))) return interaction.reply({content: "❌ ERROR: `Invalid language.`"});
            bot.db.set(interaction.guild.id, language, "language");
            return interaction.reply({content: `Language set.`});
        }

        if(interaction.options.get("enabled")){
            const enabled = interaction.options.get("enabled").value;
            if(configuration.enabled === enabled) return interaction.reply({content: `❌ ERROR: \`Button is already set to ${enabled ? "enabled" : "disabled"}\`.`});
            bot.db.set(interaction.guild.id, enabled, "enabled");
            return interaction.reply({content: `Button ${enabled ? "enabled" : "disabled"}.`});
        }

        if(interaction.options.getSubcommand() === "button"){
            const name = interaction.options.get("name").value;
            let color = interaction.options.get("color").value;
            let emoji = "";
            if(interaction.options.get("emoji")){
                emoji = interaction.options.get("emoji").value;
                const discordEmojiRgx = /<a?:(\w{2,32}):(\d{17,19})>/;
                const unicodeEmojiRgx = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
                if(discordEmojiRgx.test(emoji)){
                    let id = emoji.split(":")[2].slice(0,-1);
                    let emojiTest = bot.emojis.resolve(id);
                    if(emojiTest){
                        configuration.button.emoji = id;
                    } else {
                        return interaction.reply({content: `❌ ERROR: \`Emoji provided is from a server I am not on.\``});
                    }
                } else if(unicodeEmojiRgx.test(emoji)){
                    configuration.button.emoji = emoji;
                } else {
                    return interaction.reply({content: `❌ ERROR: \`${emoji} is not a valid Emoji.\``});
                }
            } else if(configuration.button.emoji){
                configuration.button.emoji = null;
            }
            if(!(["Gray", "Green", "Red", "Blurple"].includes(color))){
                return interaction.reply({content: `❌ ERROR: \`${color} is not a valid color.\``});
            }
            configuration.button.name = name;
            configuration.button.color = color;
            bot.db.set(interaction.guild.id,configuration.button, "button");
            interaction.reply({content: `Following properties were set:
Name: ${name}
Color: ${color}${emoji !== "" ? `
Emoji: ${emoji}` : ""}`});
        }
    }

    acRun(interaction){
        const focus = interaction.options.getFocused(true);
        if(focus.name === "language"){
            interaction.respond(Translator.getLanguageCodes(focus.value));
        } else if(focus.name === "color") {
            interaction.respond(["Gray", "Green", "Red", "Blurple"].filter(x => x.toLowerCase().startsWith(focus.value.toLowerCase())).map(x => ({name: x, value: x})));
        } else {
            interaction.respond([]);
        }
    }

    resolveStyle(style){
        switch(style){
            case "Gray":
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