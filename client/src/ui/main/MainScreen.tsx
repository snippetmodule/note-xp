import React = require('react');
import ReactNative = require('react-native');
import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
const rnSqliteProvider = require('react-native-sqlite-storage');

import LoginComponent from '../login/LoginComponent';
import DrawerComp from './DrawerComp';

import fm = require('../../framework');

interface IState {
    isLogined: boolean;
}

export = class MainScreen extends fm.ComponentBase<any, IState> {

    protected _buildState(props: {}, initialBuild: boolean): IState {
        return {
            ...this.state,
            isLogined: fm.manager.UserManager.Instance.getUser().isLogined,
        };
    }
    render() {
        if (this.state.isLogined) {
            return (
                <DrawerComp {...this.props} />
            );
        }
        return (
            <LoginComponent {...this.props} />
        );
    }
};
