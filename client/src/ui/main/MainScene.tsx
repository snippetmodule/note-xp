import RX = require('reactxp');
import { ComponentBase } from 'resub';

import LoginComponent from '../login/LoginComponent';
import SplashComponent from './SplashComponent';
import { default as UserManager } from '../../framework/manager/UserManager';

interface State {
    isLogined: boolean;
}

export = class MainScene extends ComponentBase<any, State> {

    protected _buildState(props: {}, initialBuild: boolean): State {
        return {
            isLogined: UserManager.getUser().isLogined,
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

