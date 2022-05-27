module.exports.exec = (bot) => {
    const { readdirSync } = require("node:fs");
    const eventFiles = readdirSync(`${__dirname}/../events`).filter(x => x.endsWith(".js"));
    eventFiles.forEach(name => {
        const file = require(`../events/${name}`);
        if (!(file instanceof require("../classes/Event"))) return;
        bot[file.isRunOnce() ? "once" : "on"](file.getName(), (...args) => file.exec(...args, bot));
    });
}