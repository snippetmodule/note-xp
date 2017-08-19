function log(tag: string, message: string, method = 'v') {
    switch (method) {
        case 'v':
            console.info(tag + message);
            break;
        case 'd':
            console.debug(tag + message);
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
export const v = (tag: string, message: string) => log(tag, message, 'v');
export const d = (tag: string, message: string) => log(tag, message, 'd');
export const w = (tag: string, message: string) => log(tag, message, 'w');
export const e = (tag: string, message: string) => log(tag, message, 'e');