class CaptchaConfig {
    private readonly role: string;
    private readonly button: object;
    private readonly message: string;
    private readonly description: string;
    private readonly language: string;
    private readonly enabled: boolean;

    constructor(configObject){
        this.role = configObject.role ?? null;
        this.button = configObject.button ?? {};
        this.message = configObject.message ?? "example";
        this.description = configObject.description ?? "example";
        this.language = configObject.language ?? "EN-US";
        this.enabled = configObject.enabled ?? true;
    }

}

module.exports = CaptchaConfig;