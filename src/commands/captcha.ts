import { CaptchaModal } from "../classes/CaptchaModal";
import Command from "../classes/Command";
class Captcha extends Command{
    constructor() {
        super("captcha");
    }
    btnRun(bot, interaction){
        const config = bot.db.get(interaction.guild.id);
        interaction.showModal(new CaptchaModal(config.description).getModal());
    }

    msRun(bot, interaction){
        const givenCode = interaction.fields.getTextInputValue("code");
        const correctCode = interaction.customId.split("-")[1];
        if(givenCode.toLowerCase() === correctCode){
            const configuration = bot.db.get(interaction.guild.id);
            const giveRole = interaction.guild.roles.cache.get(configuration.role);
            if(!(giveRole.manageable())) return interaction.reply({content: "❌ ERROR: `Role is either above me or my highest role.`", ephemeral: true});
            interaction.member.roles.add(configuration.role).then(()=>{
                interaction.reply({content: "Verification successful.", ephemeral: true});
            }).catch(e => {
                interaction.reply({content: `Error: ${e.message}`, ephemeral: true});
            });
        }
    }
}
module.exports = new Captcha();