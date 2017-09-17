import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');

const styles = ReactNative.StyleSheet.create({
    img: {
        bottom: 90,
    },
});

export = class SplashScreen extends fm.component.NavComp<any, null> {

    private _progressTimerToken: number;

    componentWillMount() {
        super.componentWillMount();
        this._startTimerr();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this._stopTimer();
    }

    private _startTimerr = () => {
        this._progressTimerToken = window.setTimeout(() => {
            const params = this.props.navigation.state.params;
            this.reset('main');
        }, 100);
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
