interface ConfigObject {
    role?: string;
    button?: ButtonObject;
    message?: string;
    description?: string;
    post?: string;
    disable?: boolean;
}

interface ButtonObject {
    name: string;
    color: string;
    emoji?: string;
}