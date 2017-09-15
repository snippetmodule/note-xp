
import React = require('react');
import ReactNative = require('react-native');
import { NavigationContainer, StackNavigator, NavigationScreenProp, NavigationState, NavigationAction } from 'react-navigation';

import SplashScreen = require('./main/SplashScreen');
import MainScreen = require('./main/MainScreen');
import RegisterScreen = require('./login/RegisterScreen');
import fm = require('../framework');

const AppNavigator: NavigationContainer = StackNavigator(
    {
        splash: { screen: SplashScreen },
        main: { screen: MainScreen },
        register: { screen: RegisterScreen },
    },
    {
        initialRouteName: 'splash',
        headerMode: 'none',
        navigationOptions: { gesturesEnabled: true },
        mode: ReactNative.Platform.OS === 'ios' ? 'modal' : 'card',
    },
);
export default class App extends React.Component<any, any> {
    render() {
        return (
            <AppNavigator onNavigationStateChange={fm.utils.NavUtils.onNavigationStateChange} />
        );
    }
}
