import {
    ApplicationCommandOptionType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";
import { getConfiguration, saveConfiguration } from "../automation/databaseManager";
import { Command } from "../classes/Command";
import CaptchaConfig from "../../types/CaptchaConfig";
class setup extends Command{
    constructor(){
        super(
            "setup",
            {
                name: "setup",
                description: "Setup the Captcha Modal.",
                options: [
                    {
                        name: "role",
                        description: "Setup the Role to be given upon a successful Captcha.",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "role",
                                description: "Role to be given.",
                                type: ApplicationCommandOptionType.Role,
                                required: true
                            }
                        ]
                    }, {
                        name: "button",
                        description: "Setup the Button that will open the Captcha Modal.",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "name",
                                description: "Button's label.",
                                type: ApplicationCommandOptionType.String,
                                required: true
                            }, {
                                name: "color",
                                description: "Button's color.",
                                type: ApplicationCommandOptionType.String,
                                autocomplete: true,
                                required: true
                            }, {
                                name: "emoji",
                                description: "Button's emoji (can be custom and animated).",
                                type: ApplicationCommandOptionType.String,
                                required: false
                            }
                        ]
                    }, {
                        name: "message",
                        description: "Message that is sent with the Button to open Captcha Modal.",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "message",
                                description: "Message to be sent.",
                                type: ApplicationCommandOptionType.String,
                                required: true
                            }
                        ]
                    }, {
                        name: "disable",
                        description: "Disable the Button that opens the Captcha Modal.",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "disable",
                                description: "Disable the button?",
                                type: ApplicationCommandOptionType.Boolean,
                                required: true
                            }
                        ]
                    }, {
                        name: "send",
                        description: "Channel to send the Captcha Message and Button on.",
                        type: ApplicationCommandOptionType.Subcommand,
                        options: [
                            {
                                name: "channel",
                                description: "The channel that the Captcha Message and Modal will be sent.",
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
        *  -> locale STRING:set:AUTOCOMPLETE
        *  -> disable BOOLEAN:disable
        *  -> send CHANNEL:channel
        * */
    }

    async cmdRun(interaction,bot){
        let configuration = await getConfiguration(interaction.id) as CaptchaConfig;

        if(interaction.options.get("channel")){
            if(configuration.post !== "null"){
                const msg = await interaction.guild.channels.cache.get(configuration.post.split("/")[1])
                    .messages.fetch({message: configuration.post.split("/")[2], force: true}).catch(e => console.log(e));
                if(msg) return interaction.reply({content: `You already have a Captcha post [here](<https://discord.com/channels/${configuration.post}>).`});
                configuration.post = "null";
                return saveConfiguration(interaction.guild.id, configuration);
            }
            if(configuration.role === "null") return interaction.reply({content: "❌ ERROR: `No role set.`"});
            if(!(interaction.options.get("channel").channel.isText())) return interaction.reply({content: `❌ ERROR: \`${interaction.options.get("channel").channel.name} is not a text channel.\``});
            const button = new ButtonBuilder()
                .setLabel(configuration.button.name)
                .setCustomId(`captcha-${interaction.guild.id}`)
                .setStyle(this.resolveStyle(configuration.button.color));
            if(configuration.button.emoji !== "null"){
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
            }).then((sent)=>{
                interaction.reply({content: "Sent."});
                configuration.post = `${interaction.guild.id}/${sent.channel.id}/${sent.id}`;
                return saveConfiguration(interaction.guild.id, configuration);
            });
        }

        if(interaction.options.get("role")){
            const role = interaction.options.get("role").role;
            if(configuration.role === role.id) return interaction.reply({content: "❌ ERROR: `New role cannot be the same as the old role.`"});
            configuration.role = role.id;
            saveConfiguration(interaction.guild.id, configuration);
            interaction.reply({content: `Role set to: ${role.name}.`});
            return this.updateCaptcha(interaction,configuration,bot);
        }

        if(interaction.options.get("message")){
            const message = interaction.options.get("message").value;
            configuration.message = message;
            saveConfiguration(interaction.guild.id, configuration);
            interaction.reply({content: `Message set to:
${configuration.message}`});
            return this.updateCaptcha(interaction,configuration,bot);
        }

        if(interaction.options.get("disable")){
            const disable = interaction.options.get("disable").value;
            if(configuration.disable === disable) return interaction.reply({content: `❌ ERROR: \`Button is already set to ${disable ? "disabled" : "enabled"}\`.`});
            configuration.disable = disable;
            saveConfiguration(interaction.guild.id, configuration);
            interaction.reply({content: `Button ${disable ? "disabled" : "enabled"}.`});
            return this.updateCaptcha(interaction,configuration,bot);
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
                configuration.button.emoji = "null";
            }
            if(!(["Gray", "Green", "Red", "Blurple"].includes(color))){
                return interaction.reply({content: `❌ ERROR: \`${color} is not a valid color.\``});
            }
            configuration.button.name = name;
            configuration.button.color = color;
            saveConfiguration(interaction.guild.id, configuration);
            interaction.reply({content: `Following properties were set:
Name: ${name}
Color: ${color}${emoji !== "" ? `
Emoji: ${emoji}` : ""}`});
            return this.updateCaptcha(interaction,configuration,bot);
        }
    }

    acRun(interaction){
        const focus = interaction.options.getFocused(true);
        if(focus.name === "color") {
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

    updateCaptcha(interaction,configuration,bot){
        if(configuration.post === "null") return;
        interaction.guild.channels.cache.get(configuration.post.split("/")[1])
            .messages.fetch({message: configuration.post.split("/")[2], force: true}).then(message => {
            const button = new ButtonBuilder()
                .setLabel(configuration.button.name)
                .setCustomId(`captcha-${interaction.guild.id}`)
                .setStyle(this.resolveStyle(configuration.button.color))
                .setDisabled(configuration.disable);
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
            message.edit({
                content: configuration.message,
                components: [
                    new ActionRowBuilder().setComponents([button])
                ]
            });
        }).catch(() => {
            console.log("Post information invalid, resetting it.");
            bot.db.set(interaction.guild.id, "null", "post");
        });
    }
}
module.exports = new setup();