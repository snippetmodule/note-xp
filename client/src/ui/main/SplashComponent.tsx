import React = require('react');
import ReactNative = require('react-native');

import fm = require('../../framework');

const styles = ReactNative.StyleSheet.create({
    img: {
        bottom: 90,
    },
});

export default class SplashComponent extends fm.component.BaseNavComp<{}, null> {

    private _progressTimerToken: number;

    render() {
        return (
            <fm.component.TitleComponent ref="titleLayout" isShowTitle={false}>
                <fm.component.widget.FitImage source={require('../../../asserts/login/logo.png')} style={styles.img} />
            </fm.component.TitleComponent>
        );
    }

    componentDidMount() {
        this._startTimerr();
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
}
