import {
    ModalBuilder,
    ActionRowBuilder,
    ModalActionRowComponentBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";

class CaptchaModal {
    private readonly code: string;
    private readonly modal: ModalBuilder;

    constructor(description){
        this.code = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
        this.modal = new ModalBuilder()
            .setCustomId(`captcha-${this.code}`)
            .setTitle(description)
            .setComponents([
                new ActionRowBuilder<ModalActionRowComponentBuilder>().setComponents([
                    new TextInputBuilder()
                        .setCustomId(`code`)
                        .setRequired(true)
                        .setMinLength(5)
                        .setMaxLength(5)
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder(this.code)
                        .setLabel(`Code: ${this.code}`)
                ])
            ]);
    }

    getModal(){
        return this.modal;
    }
}

module.exports = CaptchaModal;