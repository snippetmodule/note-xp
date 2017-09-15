
import React = require('react');
import ReactNative = require('react-native');
import { NavigationContainer, StackNavigator, NavigationScreenProp, NavigationState, NavigationAction } from 'react-navigation';

import MainScreen = require('./main/MainScreen');
import DrawerScreen = require('./main/DrawerScreen');
import RegisterScreen = require('./login/RegisterScreen');
import fm = require('../framework');

const AppNavigator: NavigationContainer = StackNavigator(
    {
        register: { screen: RegisterScreen },
        drawer: { screen: DrawerScreen },
        Index: { screen: MainScreen },
    },
    {
        initialRouteName: 'Index',
        headerMode: 'none',
        mode: ReactNative.Platform.OS === 'ios' ? 'modal' : 'card',
    },
);
export default class App extends React.Component<any, any> {
    render() {
        return (
            <AppNavigator onNavigationStateChange={this.onNavigationStateChange} />
        );
    }
    onNavigationStateChange = (prevNavigationState: NavigationState, nextNavigationState: NavigationState, action: NavigationAction) => {
        fm.utils.Log.i('NavigationState', 'start------------');
        fm.utils.Log.i('NavigationState', 'prevNavigationState' + JSON.stringify(prevNavigationState));
        fm.utils.Log.i('NavigationState', 'nextNavigationState' + JSON.stringify(nextNavigationState));
        fm.utils.Log.i('NavigationState', 'action' + JSON.stringify(action));
        fm.utils.Log.i('NavigationState', 'end------------');
    }
}
