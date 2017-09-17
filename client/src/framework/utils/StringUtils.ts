//
// var n = +"1"; // the unary + converts to number
// var b = !!"2"; // the !! converts truthy to true, and falsy to false
// var s = ""+3; // the ""+ converts to string via toString()
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