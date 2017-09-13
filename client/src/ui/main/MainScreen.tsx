import rx = require('reactxp');

import LoginComponent from '../login/LoginComponent';
import SplashComponent from './SplashComponent';

import fm = require('../../framework');

interface State {
    isLogined: boolean;
}

export = class MainScreen extends fm.ComponentBase<any, State> {

    protected _buildState(props: {}, initialBuild: boolean): State {
        return {
            isLogined: fm.manager.UserManager.Instance.getUser().isLogined,
        };
    }
    render(){
        if (this.state.isLogined) {
            return (
                <SplashComponent />
            );
        }
        return (
            <LoginComponent />
        );
    }
}

