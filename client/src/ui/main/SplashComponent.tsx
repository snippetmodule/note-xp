import rx = require('reactxp');

import fm = require('../../framework');
const styles = {
    img: rx.Styles.createImageStyle({
        position:'absolute',
        bottom:90,
        alignSelf: 'center',
        alignContent:'flex-end',
        alignItems:'center',
    }),
};
export default class SplashComponent extends rx.Component<{}, null> {
    private _progressTimerToken: number;
    // private _curTime = new Date().getTime();

    render() {
        return (
            <fm.component.TitleComponent ref='titleLayout' isShowTitle={false}>
                <fm.component.widget.FitImage source='asserts/login/logo.png' style={styles.img}>
                </fm.component.widget.FitImage>
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
