import React = require('react');
import ReactNative = require('react-native');
import { DrawerNavigator } from 'react-navigation';

import fm = require('../../framework');
import { Home } from '../home/Home';
import { MenuComp } from './MenuComp';

const Drawer = DrawerNavigator(
    {
        Home: {
            screen: Home,
        },
        Menu: {
            screen: MenuComp,
        },
    },
    {
        drawerWidth: 270,
        drawerPosition: 'right',
        contentComponent: (props: any) => <MenuComp />,
        initialRouteName: 'Home',
        contentOptions: {
            activeTintColor: '#e91e63',
        },
    });
export let isDrawerOpen: boolean = false;
const defaultGetStateForAction = Drawer.router.getStateForAction;
Drawer.router.getStateForAction = (action, state) => {
    // use 'DrawerOpen' to capture drawer open event
    if (state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
        console.log('DrawerClose');
        isDrawerOpen = false;
        // write the code you want to deal with 'DrawerClose' event
    }else {
        isDrawerOpen = true;
    }
    return defaultGetStateForAction(action, state);
};
export default Drawer;
