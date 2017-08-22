import RX = require('reactxp');

import { TitleComponent } from '../../framework/component/TitleComponent';

export default class SplashComponent extends RX.Component<{}, null> {
    private _progressTimerToken: number;
    // private _curTime = new Date().getTime();

    render() {
        return (
            <TitleComponent ref='titleLayout' isShowTitle={false}>
                <RX.Image source='asserts/login/logo.png'>
                </RX.Image>
            </TitleComponent>
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
