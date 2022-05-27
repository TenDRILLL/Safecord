export default class Command {
    name: string;
    slashObject: object;

    constructor(
        name: string,
        slashObject: object
    )

    getName(): string;
    getSlashObject(): object;

    cmdRun(): void;
    btnRun(): void;
    slmRun(): void;
    acRun(): void;
    msRun(): void;
}