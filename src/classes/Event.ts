class Event {
    private readonly name: string;
    private readonly runOnce: boolean;

    constructor(name,once) {
        this.name = name;
        this.runOnce = once;
    }
    getName(){return this.name;}
    isRunOnce(){return this.runOnce;}
    exec(){return console.log(`${this.name} ran, but exec method wasn't overridden.`);}
}

module.exports = Event;