import rx = require('reactxp');

import fm = require('../../framework');
import { Home } from './home/Home';

const styles = {
    img: rx.Styles.createImageStyle({
        position: 'absolute',
        bottom: 90,
    }),
};

export default class SplashComponent extends rx.Component<{}, null> {

    private _progressTimerToken: number;

    render() {
        return (
            <fm.component.TitleComponent ref='titleLayout' isShowTitle={false}>
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
            fm.utils.NavUtils.replace({ component: Home });
        }, 500);
    }

    private _stopTimer = () => {
        if (this._progressTimerToken) {
            window.clearTimeout(this._progressTimerToken);
            this._progressTimerToken = undefined;
        }
    }
}
