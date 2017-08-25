function log(tag: string, message: string, method = 'i') {
    switch (method) {
        case 'i':
            console.info(tag + message);
            break;
        case 'w':
            console.warn(tag + message);
            break;
        case 'e':
            console.error(tag + message);
            break;
        default:
            console.log(tag + message);
            break;
    }

};
export const i = (tag: string, message: string) => log(tag, message, 'i');
export const w = (tag: string, message: string) => log(tag, message, 'w');
export const e = (tag: string, message: string) => log(tag, message, 'e');