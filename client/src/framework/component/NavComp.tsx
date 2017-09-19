
import React = require('react');
import ReactNative = require('react-native');
import Navigation = require('react-navigation');
import { ComponentBase } from 'resub';
import Log = require('../utils/Log');

type NavProp<Params> = Navigation.NavigationScreenProps<Params> & Params;

//  Navigation 界面（Screen）之间参数的获取：this.props.navigation.state.params.XXXX
//  Component　组件间的参数获取为：this.props.XXXX
export class NavComp<Params, S> extends ComponentBase<NavProp<Params>, S> {
    constructor(props: NavProp<Params>) {
        super(props);
    }
    go = (routeName: string, params?: Navigation.NavigationParams, action?: Navigation.NavigationAction) => {
        let result = this.props.navigation.navigate(routeName, params, action);
        Log.i('NavComp', `go to:${routeName} result:${result}`);
    }
    // TODO
    replace = (replacedRoute: string, params?: Navigation.NavigationParams) => {
        let index = (this.props.navigation.state as Navigation.NavigationStateRoute<any>).index;
        let result = this.reset(replacedRoute, params, index);
        Log.i('NavComp', `replace:${replacedRoute} result:${result}`);
    }
    goBack = (routeKey?: (string | null)) => {
        let result = this.props.navigation.goBack();
        Log.i('NavComp', `goBack:${routeKey} result:${result}`);
    }

    reset = (resetRoute: string, params = {}, index = 0) => {
        const resetAction = Navigation.NavigationActions.reset({
            index: index,
            actions: [
                Navigation.NavigationActions.navigate({ routeName: resetRoute, params: params }),
            ],
        });
        let result = this.props.navigation.dispatch(resetAction);
        Log.i('NavComp', `reset:${resetRoute} result:${result}`);
    }
}