
import React = require('react');
import ReactNative = require('react-native');
import { NavigationScreenProps, NavigationActions } from 'react-navigation';
import { ComponentBase } from 'resub';

interface IProp<Params> extends NavigationScreenProps<Params> {
    children?: React.ReactNode;
    key?: React.Key;
    ref?: React.Ref<any>;
}
export class BaseNavComp<Params, S> extends ComponentBase<IProp<Params>, S> {
    public replace(routeName: string, params = {}) {
        const navigateAction = NavigationActions.navigate({
            routeName: routeName,
            params: params,
            // navigate can have a nested navigate action that will be run inside the child router
            // action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
        });
        this.props.navigation.dispatch(navigateAction);
    }
    public goBack(routeName = '') {
        const backAction = NavigationActions.back({
            key: routeName,
          });
        this.props.navigation.dispatch(backAction);
    }
}