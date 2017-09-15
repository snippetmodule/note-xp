import ReactNative = require('react-native');

const densityWhenUIDesign: number = 2;

let pixelRatio: number = ReactNative.PixelRatio.get();
let window = ReactNative.Dimensions.get('window');

export function get(): number {
    // 'web' | 'ios' | 'android' | 'windows';
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