import rx = require('reactxp');
import React = require('react');
import Navigator, { Types } from 'reactxp-navigation';

import Md5 = require('./Md5Utils');
import StringUtils = require('./StringUtils');
import DeviceUtils = require('./DeviceUtils');

type GoParams<P> = {
    component: React.ComponentClass<any>,
    props?: P,
    sceneConfigType?: rx.Types.NavigatorSceneConfigType,
    gestureResponseDistance?: number,
    customSceneConfig?: rx.Types.CustomNavigatorSceneConfig
}
type NavigatorScene = {
    [index: number]: GoParams<any>
};

let _navigatorScene: NavigatorScene = {};

let _navigator: Navigator;

export function registerMain<P>(navigator: Navigator,params: GoParams<P>) {
    _navigator = navigator;
    params = {
        sceneConfigType: rx.Types.NavigatorSceneConfigType.Fade,
        ...params
    };
    const md5 = 0; // 默认route id 为0
    _navigatorScene[md5] = params;
    _navigator.immediatelyResetRouteStack([{
        routeId: md5,
        sceneConfigType: params.sceneConfigType
    }]);
}

export function go<P>(params: GoParams<P>) {
    params = {
        sceneConfigType: rx.Types.NavigatorSceneConfigType.FloatFromRight,
        ...params
    };
    const md5 = StringUtils.toNumber(Md5.hash((params.component as any).name as string));
    _navigatorScene[md5] = params;
    _navigator.push({
        routeId: md5,
        sceneConfigType: params.sceneConfigType,
        gestureResponseDistance: params.gestureResponseDistance,
        customSceneConfig: params.customSceneConfig
    });
}
let count = 2;
export function replace<P>(params: GoParams<P>) {
    params = {
        sceneConfigType: rx.Types.NavigatorSceneConfigType.FloatFromRight,
        ...params
    };
    let route = _navigator.getCurrentRoutes().reverse()[0];
    _navigatorScene[route.routeId] = null;
    const md5 = StringUtils.toNumber(Md5.hash((params.component as any).name as string));
    _navigatorScene[md5] = params;
    _navigator.replace({
        routeId: md5,
        sceneConfigType: params.sceneConfigType,
        gestureResponseDistance: params.gestureResponseDistance,
        customSceneConfig: params.customSceneConfig
    });
}
export function renderScene(navigatorRoute: Types.NavigatorRoute): JSX.Element {
    let params = _navigatorScene[navigatorRoute.routeId];

    if (!params) {
        params = _navigatorScene[0];
    }
    return React.createElement(params.component, params.props, null);
}
export function goToMain() {
    let main = _navigatorScene[0];
    _navigatorScene = {},
        _navigatorScene[0] = main;
    _navigator.popToTop();
}
export function goBack() {
    let route = _navigator.getCurrentRoutes().reverse()[0];
    _navigatorScene[route.routeId] = null;
    _navigator.pop();
}