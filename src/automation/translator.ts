const languages = new Map();

module.exports.loadLanguages = () => {
    const { readdirSync } = require("node:fs");
    readdirSync("./automation/languages").forEach(async language => {
        languages.set(language.split(".")[0], require(`./languages/${language}`));
    });
    console.log(`${languages.size} languages loaded.`);
}

//For autocompletion, returns an array of objects {name: langcode, value: langcode}.
module.exports.getLanguageCodes = (startsWith = "") => {
    const codes = Array.from(languages.keys());
    if(startsWith === "") return codes.map(x => ({name: x, value: x}));
    return codes.filter(x => x.toLowerCase().startsWith(startsWith.toLowerCase())).map(x => ({name: x, value: x}));
}

module.exports.getTranslation = (language,line) => {
    if(!(languages.has(language))) return "Invalid language selected.";
    const translations = languages.get(language);
    if(line in translations) return translations[line];
    return "Translation doesn't exist.";
}