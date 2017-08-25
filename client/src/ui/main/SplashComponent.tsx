import rx = require('reactxp');

import fm = require('../../framework');

export default class SplashComponent extends rx.Component<{}, null> {
    private _progressTimerToken: number;
    // private _curTime = new Date().getTime();

    render() {
        return (
            <fm.component.TitleComponent ref='titleLayout' isShowTitle={false}>
                <rx.Image source='asserts/login/logo.png'>
                </rx.Image>
            </fm.component.TitleComponent>
        );
    }
    componentDidMount() {
        this._startTimerr();
    }

    componentWillUnmount() {
        this._stopTimer();
    }
    private _startTimerr() {
        this._progressTimerToken = window.setTimeout(() => {
            //
        }, 1000);
    }

    private _stopTimer() {
        if (this._progressTimerToken) {
            window.clearTimeout(this._progressTimerToken);
            this._progressTimerToken = undefined;
        }
    }
}
