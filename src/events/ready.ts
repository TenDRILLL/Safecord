class Ready extends require("../classes/Event"){
    constructor() {
        super("ready",true);
    }

    exec(bot){
        console.log("Ready!");
    }
}
module.exports = new Ready();