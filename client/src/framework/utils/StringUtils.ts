
export function toNumber(str: string): number {
    if (str) {
        str = str.split('').map((v: string) => v.charCodeAt(0)).join('');
        return Number.parseInt(str);
    }
    return 0;
}
export function isIn(str: any, ...arrays: any[]) {
    for (let v of arrays) {
        if (v === str) {
            return true;
        }
    }
    return false;
}