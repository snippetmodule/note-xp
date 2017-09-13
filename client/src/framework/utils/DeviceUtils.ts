import ReactNative = require('react-native');

export const isWeb = ReactNative.Platform.OS === 'web';
export const isAndroid = ReactNative.Platform.OS === 'android';
export const isIos = ReactNative.Platform.OS === 'ios';
export const isNative = isAndroid || isIos;
export const isWindow = ReactNative.Platform.OS === 'windows';