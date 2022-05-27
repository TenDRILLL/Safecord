export default class Event {
    name: string;
    runOnce: boolean;

    constructor(
        name: string, //The name for the event, provided so the filenames don't have to match the event names.
        runOnce: boolean //If the event should only be run once.
    );

    getName(): string; //Used to get the eventName property.
    isRunOnce(): boolean; //Used to get the runOnce property.
    exec(): void; //Method which should contain what the event should execute.
}