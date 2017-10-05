import rx = require('reactxp');
let isMobile: boolean = false;
let debug: boolean = false;

export const isWeb = rx.Platform.getType() === 'web';

if (isWeb) {
    if (process.env.mobile) {
        isMobile = true;
    }
    if (process.env.dev) {
        debug = true;
    }
}

export const isDebug = debug;
export const isWebMobile = isWeb && isMobile;
export const isWebPC = isWeb && isMobile;

export const isAndroid = rx.Platform.getType() === 'android';
export const isIos = rx.Platform.getType() === 'ios';
export const isNative = isAndroid || isIos;
export const isWindow = rx.Platform.getType() === 'windows';