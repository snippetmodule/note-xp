import RX = require('reactxp');
import React = require('react');

import Md5 = require('./Md5Utils');

type GoParams<P> = {
    component: React.ComponentClass<any>,
    props?: P,
    sceneConfigType?: RX.Types.NavigatorSceneConfigType,
    gestureResponseDistance?: number,
    customSceneConfig?: RX.Types.CustomNavigatorSceneConfig
}
type NavigatorScene = {
    [index: number]: GoParams<any>
};

let _navigatorScene: NavigatorScene = {};

export let _navigator: RX.Navigator;

export function registerMain<P>(params: GoParams<P>) {
    const md5 = 0; // 默认route id 为0
    params.sceneConfigType = params.sceneConfigType || RX.Types.NavigatorSceneConfigType.Fade;
    _navigatorScene[md5] = params;
    this._navigator.immediatelyResetRouteStack([{
        routeId: md5,
        sceneConfigType: params.sceneConfigType
    }]);
}

export function go<P>(params: GoParams<P>) {
    const md5 = new Number(Md5.hash_32(params.component.toString())).valueOf();
    _navigatorScene[md5] = params;
    _navigator.push({
        routeId: md5,
        sceneConfigType: params.sceneConfigType || RX.Types.NavigatorSceneConfigType.FloatFromRight,
        gestureResponseDistance: params.gestureResponseDistance,
        customSceneConfig: params.customSceneConfig
    });
}
export function replace<P>(params: GoParams<P>) {
    let route = _navigator.getCurrentRoutes()[0];
    _navigatorScene[route.routeId] = null;
    const md5 = new Number(Md5.hash_32(params.component.toString())).valueOf();
    _navigatorScene[md5] = params;
    _navigator.replace({
        routeId: md5,
        sceneConfigType: params.sceneConfigType || RX.Types.NavigatorSceneConfigType.FloatFromRight,
        gestureResponseDistance: params.gestureResponseDistance,
        customSceneConfig: params.customSceneConfig
    });
}
export function renderScene(navigatorRoute: RX.Types.NavigatorRoute): JSX.Element {
    let params = _navigatorScene[navigatorRoute.routeId];

    if (!params) {
        params = _navigatorScene[0];
    }
    return React.createElement(params.component, params.props,null);
}
export function goToMain() {
     let main = _navigatorScene[0];
     _navigatorScene = {},
     _navigatorScene[0] = main;
    _navigator.popToTop();
}
export function goBack() {
    let route = _navigator.getCurrentRoutes()[0];
    _navigatorScene[route.routeId] = null;
    _navigator.pop();
}