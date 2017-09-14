
import React = require('react');
import ReactNative = require('react-native');
import { NavigationContainer, StackNavigator, NavigationScreenProp } from 'react-navigation';

import MainScreen = require('./main/MainScreen');
import DrawerScreen = require('./main/DrawerScreen');
import RegisterScreen = require('./login/RegisterScreen');
import fm = require('../framework');

const AppNavigator: NavigationContainer = StackNavigator(
    {
        RegisterScreen: {
            name: 'register',
            description: 'A card register',
            screen: RegisterScreen,
        },
        DrawerScreen: {
            name: 'drawer',
            description: 'drawer',
            screen: RegisterScreen,
        },
        Index: {
            screen: MainScreen,
        },
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
            <AppNavigator />
        );
    }
}
