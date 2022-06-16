import {ButtonStyle} from "discord.js";

export default class CaptchaConfig {
    role: string;
    button: {
        name: string;
        color: string;
        emoji: string;
    };
    message: string;
    description: string;
    post: string;
    disable: boolean;
}