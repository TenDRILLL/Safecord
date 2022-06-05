# CAPTCHA-Bot
A Discord Bot that allows you to give a GuildMember a Role after they complete a ModalInteraction "CAPTCHA".

Checklist:
- [x] Modal captcha
- - [x] Random code in title *"${code}"*
- - [x] Store code in modal id
- [x] Setup command
- - [x] Define role to be given
- - [x] Define message to be sent with button
- - [x] Define Button text & color
- - [x] ~~Define Language~~ -> Will be made automatic.
- - [x] Enable/Disable
- - [x] Allow sending

Example config.json file:
```json
{
  "token": "thisisnotavalidtokenbruh.please.gogenerateyourowntokenthankyouverymuch",
  "applicationId": "123456789012345678"
}
```
Obviously replace the values with your own, got from a New Application, which you can create in the [Discord Developer Portal](https://discord.com/developers/applications).