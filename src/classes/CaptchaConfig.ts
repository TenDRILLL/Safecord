import {ButtonStyle} from "discord.js";
class CaptchaConfig {
    private readonly role: string;
    private readonly button: object;
    private readonly message: string;
    private readonly description: string;
    private readonly language: string;
    private readonly enabled: boolean;

    constructor(configObject){
        this.role = configObject.role ?? null;
        this.button = configObject.button ?? {name: "Captcha", color: "PRIMARY", emoji: null};
        this.message = configObject.message ?? "Click the button to open server verification window.";
        this.description = configObject.description ?? "Hello and welcome to our server! Please complete the captcha below.";
        this.language = configObject.language ?? "en-us";
        this.enabled = configObject.enabled ?? true;
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

module.exports = CaptchaConfig;