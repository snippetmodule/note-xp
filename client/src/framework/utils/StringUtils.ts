
export function toNumber(str: string): number {
    if (str) {
        str = str.split('').map(v => v.charCodeAt(0)).join('');
        return new Number(str).valueOf();
    }
    return 0;
}