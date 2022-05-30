import {ButtonStyle} from "discord.js";

export default class CaptchaConfig {
    role: string;
    button: object;
    message: string;
    description: string;
    language: string;
    enabled: boolean;

    resolveStyle(): ButtonStyle;
}