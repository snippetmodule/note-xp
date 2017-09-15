import React = require('react');
import ReactNative = require('react-native');
import { NavigationScreenProp, NavigationRoute, NavigationAction, NavigationParams } from 'react-navigation';

import Md5 = require('./Md5Utils');
import StringUtils = require('./StringUtils');
import DeviceUtils = require('./DeviceUtils');

export let _nav: NavigationScreenProp<NavigationRoute<any>, NavigationAction>;

export function go(routeName: string, params?: NavigationParams, action?: NavigationAction) {
    if (!_nav) {
        return;
    }
    _nav.navigate(routeName, params, action);
}
// TODO
export function replace(routeName: string, params?: NavigationParams) {
    if (!_nav) {
        return;
    }
    _nav.navigate(routeName, params);
}
export function back(routeName?: (string | null)) {
    if (!_nav) {
        return;
    }
    _nav.goBack(routeName);
}

export function goToMain() {
    if (!_nav) {
        return;
    }
    if (_nav.state.routeName !== 'index') {
        back('index');
    }
}
