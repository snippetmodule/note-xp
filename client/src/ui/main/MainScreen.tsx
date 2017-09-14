import React = require('react');
import ReactNative = require('react-native');

import LoginComponent from '../login/LoginComponent';
import SplashComponent from './SplashComponent';

import fm = require('../../framework');

interface IState {
    isLogined: boolean;
}

export = class MainScreen extends fm.component.BaseNavComp<any, IState> {

    protected _buildState(props: {}, initialBuild: boolean): IState {
        return {
            isLogined: fm.manager.UserManager.Instance.getUser().isLogined,
        };
    }
    render() {
        if (this.state.isLogined) {
            return (
                <SplashComponent {...this.props}/>
            );
        }
        return (
            <LoginComponent {...this.props}/>
        );
    }
};
