export default class CaptchaConfig {
    public role: string;
    public button: ButtonObject;
    public message: string;
    public description: string;
    public disable: boolean;
    public post: string;

    constructor(configObject?: ConfigObject){
        this.role = configObject?.role ?? "null";
        this.button = configObject?.button ?? {name: "Captcha", color: "PRIMARY", emoji: "null"};
        this.message = configObject?.message ?? "Click the button to open server verification window.";
        this.description = configObject?.description ?? "Please complete the captcha below.";
        this.disable = configObject?.disable ?? false;
        this.post = configObject?.post ?? "null";
    }
}