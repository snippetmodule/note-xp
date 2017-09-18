import React = require('react');
import ReactNative = require('react-native');
import { CordovaNativeSqliteProvider } from 'nosqlprovider/dist/CordovaNativeSqliteProvider';
import { InMemoryProvider } from 'nosqlprovider/dist/InMemoryProvider';
const rnSqliteProvider = require('react-native-sqlite-storage');

import fm = require('../../framework');

const styles = ReactNative.StyleSheet.create({
    img: {
        bottom: 90,
    },
});

interface IState {
    isLoadingOk: boolean;
}

export = class SplashScreen extends fm.component.NavComp<any, IState> {

    private _progressTimerToken: number;

    constructor(props: any) {
        super(props);

        fm.db.DbUtils.init([
            // Specify the DB providers that are valid on the RN platforms.
            new CordovaNativeSqliteProvider(rnSqliteProvider),
            new InMemoryProvider(),
        ]).then(() => {
            // to do Other Init
            return fm.manager.UserManager.init();
        }).then(() => {
            return ReactNative.InteractionManager.runAfterInteractions(() => {
                if (this.isComponentMounted()) {
                    this.setState({ isLoadingOk: true });
                }
                fm.utils.Log.i('SplashScreen', `init ok:${JSON.stringify(fm.manager.UserManager.getUser())}`);
            });
        }).catch((err) => {
            fm.utils.Log.i('Index', err);
        });
        this.state = { isLoadingOk: false };
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
            if (fm.manager.UserManager.getUser().isLogined) {
                this.reset('main');
            } else {
                this.reset('login');
            }
        }, 500);
    }

    private _stopTimer = () => {
        if (this._progressTimerToken) {
            window.clearTimeout(this._progressTimerToken);
            this._progressTimerToken = undefined;
        }
    }
    render() {
        return (
            <fm.component.TitleComponent ref="titleLayout" isShowTitle={false} {...this.props}>
                <fm.component.widget.FitImage source={require('../../../asserts/login/logo.png')} style={styles.img} />
            </fm.component.TitleComponent>
        );
    }
};
