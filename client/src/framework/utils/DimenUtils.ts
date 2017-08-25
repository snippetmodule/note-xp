import rx = require('reactxp');

const densityWhenUIDesign: number = 2;

let pixelRatio: number = rx.UserInterface.getPixelRatio();
let window = rx.UserInterface.measureWindow();

export function get(): number {
    //'web' | 'ios' | 'android' | 'windows';
    return pixelRatio;
}

export function getWindowSize(): { width: number, height: number } {
    return { width: window.width, height: window.height };
}

export function dpToPx(dp: number) {
    return pixelRatio * dp;
}

export function pxToDp(px: number) {
    return px / pixelRatio;
}