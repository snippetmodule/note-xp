import rx = require('reactxp');

export const isWeb = rx.Platform.getType() === 'web';
export const isAndroid = rx.Platform.getType() === 'android';
export const isIos = rx.Platform.getType() === 'ios';
export const isNative = isAndroid || isIos;
export const isWindow = rx.Platform.getType() === 'windows';