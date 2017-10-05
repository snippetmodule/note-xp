function log(tag: string, message: string, method = 'i') {
    switch (method) {
        case 'i':
            console.info(`${tag}\t: ${message}`);
            break;
        case 'w':
            console.warn(`${tag}\t: ${message}`);
            break;
        case 'e':
            console.error(`${tag}\t: ${message}`);
            break;
        default:
            console.log(`${tag}\t: ${message}`);
            break;
    }
}
export const i = (tag: string, message: string) => log(tag, message, 'i');
export const w = (tag: string, message: string) => log(tag, message, 'w');
export const e = (tag: string, message: string) => log(tag, message, 'e');