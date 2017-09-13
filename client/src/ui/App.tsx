
import React = require('react');
import ReactNative = require('react-native');
import { StackNavigator, NavigationScreenProp } from 'react-navigation';

import MainScreen = require('./main/MainScreen');
import RegisterScreen = require('./login/RegisterScreen');
import fm = require('../framework');


const AppNavigator = StackNavigator(
    {
        RegisterScreen: {
            name: 'register',
            description: 'A card register',
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
    }
);
export default class App extends React.Component<any, any>{
    render() {
        return (
            <AppNavigator ref={this._ref} />
        );
    }
    _ref = (nav: any) => {
        fm.utils.NavUtils.nav = nav as NavigationScreenProp<any, any>;
    }
}
