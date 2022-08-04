# Safecord
A Discord Bot that allows you to give a GuildMember a Role after they complete a ModalInteraction "CAPTCHA".

[Invite the Bot](https://discord.com/api/oauth2/authorize?client_id=979707790962601995&permissions=268487680&scope=bot%20applications.commands)

Checklist:
- [x] Modal captcha
- - [x] Random code in title *"${code}"*
- - [x] Store code in modal id
- [x] Setup command
- - [x] Define role to be given
- - [x] Define message to be sent with button
- - [x] Define Button text & color
- - [x] Enable/Disable
- - [x] Allow sending
- [ ] Add translations and automatically apply it based off of locale.

Example .env file:
```dotenv
token="thisisnotavalidtokenbruh.please.gogenerateyourowntokenthankyouverymuch"
applicationId="123456789012345678"
db_host="example.xyz"
db_user="safecord"
db_password="Passw0rd!"
db_database="database_name_here"
```
Obviously replace the values with your own, got from a New Application, which you can create in the [Discord Developer Portal](https://discord.com/developers/applications).
