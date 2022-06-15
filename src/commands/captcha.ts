const CModal = require("../classes/CaptchaModal");
import { Command } from "../classes/Command";
class Captcha extends Command{
    constructor() {
        super("captcha",undefined);
    }
    btnRun(interaction,bot){
        const config = bot.db.get(interaction.guild.id);
        interaction.showModal(new CModal(config.description).getModal());
    }

    msRun(interaction,bot){
        const givenCode = interaction.fields.getTextInputValue("code");
        const correctCode = interaction.customId.split("-")[1];
        if(givenCode.toLowerCase() === correctCode){
            const configuration = bot.db.get(interaction.guild.id);
            interaction.member.roles.add(configuration.role).then(()=>{
                interaction.reply({content: "Verification successful.", ephemeral: true});
            }).catch(e => {
                interaction.reply({content: `Error: ${e.message}`, ephemeral: true});
            });
        }
    }
}
module.exports = new Captcha();