import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

import { SimpleItemComp } from './SimpleItemComp';
import { PicItemComp } from './PicItemComp';
import { VideoItemComp } from './VideoItemComp';
import { ArticleListComp } from './ArticleListComp';
import { isDrawerOpen } from '../main/MainScreen';

interface IState {
    isLogined: boolean;
}

const styles = ReactNative.StyleSheet.create({
    listView: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
});
let data: fm.models.IBaseJson<models.Json.Article[]> = require('./data');

export class Home extends fm.component.NavComp<{}, IState> {
    private _backPressedTime: number = 0;
    private _list: ArticleListComp;

    protected _buildState(props: {}, initialBuild: boolean): IState {
        return {
            isLogined: fm.manager.UserManager.getUser().isLogined,
        };
    }
    public componentDidMount() {
        ReactNative.BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    public componentWillUnmount() {
        ReactNative.BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    private handleBackButton = () => {
        if (!fm.utils.NavUtils.isInMain) {
            return false;
        }
        if (isDrawerOpen) {
            this.props.navigation.navigate('DrawerClose');
            return true;
        }
        let curTime = new Date().getTime();
        if (curTime - this._backPressedTime < 2 * 1000) {
            // ReactNative.BackAndroid.exitApp();
            return false;
        } else {
            this._backPressedTime = curTime;
            fm.utils.ToastUtils.showToast('press back again');
            return true;
        }
    }
    shouldComponentUpdate(nextProps: any, nextState: IState): boolean {
        let result = super.shouldComponentUpdate(nextProps, nextState);
        if (!nextState.isLogined) {
            this.reset('login');
            return false;
        }
        return result;
    }
    private onMenu = () => {
        if (isDrawerOpen) {
            this.props.navigation.navigate('DrawerClose');
        } else {
            this.props.navigation.navigate('DrawerOpen');
        }
    }
    private onTitle = () => {
        this._list._onRefresh();
    }
    private onSearch = () => {

    }
    render() {
        return (
            <fm.component.TitleComponent
                {...this.props}
                onBack={this.onSearch}
                onTitle={this.onTitle}
                onRight={this.onMenu}
                backImg={require('../../../asserts/home/home_search.png')}
                backImageSize={{ width: 22, height: 21 }}
                titleImg={require('../../../asserts/home/logo.png')}
                titleImgSize={{ width: 62, height: 18.5 }}
                rightImg={require('../../../asserts/home/home_menu.png')}
                rightImgSize={{ width: 22, height: 20.5 }}
            >
                <ArticleListComp ref={this._onRefList} {...this.props} />
            </fm.component.TitleComponent>
        );
    }
    private _onRefList = (ref: ArticleListComp) => {
        this._list = ref;
    }
}