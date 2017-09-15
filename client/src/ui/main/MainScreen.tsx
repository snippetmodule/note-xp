import React = require('react');
import ReactNative = require('react-native');
import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
const rnSqliteProvider = require('react-native-sqlite-storage');

import LoginComponent from '../login/LoginComponent';
import SplashComponent from './SplashComponent';

import fm = require('../../framework');

interface IState {
    isLogined: boolean;
    isLoadingOk: boolean;
}

export = class MainScreen extends fm.component.BaseNavComp<any, IState> {

    private _progressTimerToken: number;

    constructor(props: any) {
        super(props);
        fm.db.DbUtils.init([
            // Specify the DB providers that are valid on the RN platforms.
            new CordovaNativeSqliteProvider(rnSqliteProvider),
            new InMemoryProvider(),
        ]).then(() => {
            // to do Other Init
            return fm.manager.UserManager.Instance.init();
        }).then(() => {
            if (this.isComponentMounted()) {
                this.setState({ isLoadingOk: true });
            }
        }).catch((err) => {
            fm.utils.Log.i('Index', err);
        });
        fm.utils.NavUtils._nav = this.props.navigation;
    }

    componentDidUpdate(prevProps: any, prevState: IState) {
        if (this.state.isLoadingOk) {
            this._startTimerr();
        }
    }

    componentWillUnmount() {
        this._stopTimer();
    }

    private _startTimerr = () => {
        this._progressTimerToken = window.setTimeout(() => {
            const params = this.props.navigation.state.params;
            this.replace('drawer');
        }, 500);
    }

    private _stopTimer = () => {
        if (this._progressTimerToken) {
            window.clearTimeout(this._progressTimerToken);
            this._progressTimerToken = undefined;
        }
    }

    protected _buildState(props: {}, initialBuild: boolean): IState {
        return {
            ...this.state,
            isLogined: fm.manager.UserManager.Instance.getUser().isLogined,
        };
    }
    render() {
        if (!this.state.isLoadingOk) {
            return (
                <SplashComponent {...this.props} />
            );
        }
        if (this.state.isLogined) {
            return (
                <SplashComponent {...this.props} />
            );
        }
        return (
            <LoginComponent {...this.props} />
        );
    }
};
