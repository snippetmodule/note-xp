import React = require('react');
import ReactNative = require('react-native');
import { DrawerNavigator } from 'react-navigation';

import fm = require('../../framework');
import { Home } from '../home/Home';
import { MenuComp } from './MenuComp';

// let BackAndroid: any;
// if (fm.utils.DeviceUtils.isAndroid) {
//     let ReactNative = require('react-native');
//     BackAndroid = ReactNative.BackAndroid;
// }
const Drawer = DrawerNavigator(
    {
        DrawerHome: {
            screen: MenuComp,
        },
    },
    {
        drawerWidth: 270,
        drawerPosition: 'left',
        contentComponent: (props: any) => <MenuComp />,
        initialRouteName: 'DrawerHome',
        contentOptions: {
            activeTintColor: '#e91e63',
        },
    });

export default Home;
class DrawerScreen extends fm.component.NavComp<{}, null> {
    private _backPressedTime: number = 0;

    public componentDidMount() {
        ReactNative.BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    public componentWillUnmount() {
        ReactNative.BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    private handleBackButton = () => {
        if (this.props.navigation.state.routeName === 'DrawerOpen') {
            this.props.navigation.navigate('DrawerClose');
            return true;
        }
        let curTime = new Date().getTime();
        if (curTime - this._backPressedTime < 2 * 1000) {
            // ReactNative.BackAndroid.exitApp();
            return false;
        } else {
            this._backPressedTime = curTime;
            fm.utils.ToastUtils.showToast('press back again');
            return true;
        }
    }
    render() {
        return (
            <Drawer {...this.props} />
        );
    }
}