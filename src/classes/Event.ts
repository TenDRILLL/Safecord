import { Client } from "../types/classes";

export class Event {
    private readonly name: string;
    private readonly runOnce: boolean;

    constructor(name: string, once: boolean) {
        this.name = name;
        this.runOnce = once;
    }
    getName(): string {return this.name;}
    isRunOnce(): boolean {return this.runOnce;}
    exec(bot: Client, ...args: unknown[]): void {return console.log(`${this.name} ran, but exec method wasn't overridden.`);}
}