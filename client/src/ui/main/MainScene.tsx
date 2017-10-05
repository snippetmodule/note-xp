import rx = require('reactxp');

import LoginComponent from '../login/LoginComponent';
import SplashComponent from './SplashComponent';

import fm = require('../../framework');

interface IState {
    isLogined: boolean;
}

export = class MainScene extends fm.ComponentBase<any, IState> {

    protected _buildState(props: {}, initialBuild: boolean): IState {
        return {
            isLogined: fm.manager.UserManager.Instance.getUser().isLogined,
        };
    }
    render() {
        if (this.state.isLogined) {
            return (
                <SplashComponent />
            );
        }
        return (
            <LoginComponent />
        );
    }
};
