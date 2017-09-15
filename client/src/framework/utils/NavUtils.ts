import React = require('react');
import ReactNative = require('react-native');
import Navigation = require('react-navigation');

import Log = require('./Log');
// export function withNavigation(){
//     return ;
// }
export function onNavigationStateChange(prevNavigationState: Navigation.NavigationState, nextNavigationState: Navigation.NavigationState, action: Navigation.NavigationAction) {
    Log.i('NavUtils', 'start------------');
    Log.i('NavUtils', 'prevNavigationState' + JSON.stringify(prevNavigationState));
    Log.i('NavUtils', 'nextNavigationState' + JSON.stringify(nextNavigationState));
    Log.i('NavUtils', 'action' + JSON.stringify(action));
    Log.i('NavUtils', 'end------------');
}
