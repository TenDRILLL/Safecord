class CaptchaConfig {
    private readonly role: string;
    private readonly button: object;
    private readonly message: string;
    private readonly description: string;
    private readonly language: string;
    private readonly disable: boolean;
    private readonly post: string;

    constructor(configObject){
        this.role = configObject.role ?? null;
        this.button = configObject.button ?? {name: "Captcha", color: "PRIMARY", emoji: null};
        this.message = configObject.message ?? "Click the button to open server verification window.";
        this.description = configObject.description ?? "Please complete the captcha below.";
        this.language = configObject.language ?? "en-us";
        this.disable = configObject.disable ?? false;
        this.post = configObject.post ?? null;
    }
}

module.exports = CaptchaConfig;