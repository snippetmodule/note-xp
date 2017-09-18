
import React = require('react');
import ReactNative = require('react-native');
import Navigation = require('react-navigation');
import { ComponentBase } from 'resub';
import Log = require('../utils/Log');

type IProp<Params> = Navigation.NavigationScreenConfigProps & Params;

export class NavComp<Params, S> extends ComponentBase<IProp<Params>, S> {
    constructor(props: IProp<Params>) {
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