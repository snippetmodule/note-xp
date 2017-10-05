import rx = require('reactxp');
import Navigator, { Types } from 'reactxp-navigation';

import MainScene = require('./main/MainScene');
import fm = require('../framework');

const styles = {
    navCardStyle: rx.Styles.createViewStyle({
        backgroundColor: '#f5fcff',
    }),
};
interface IState {
    isLoaded: boolean;
}
export class App extends rx.Component<{}, IState> {
    constructor(props: {}, context: any) {
        super(props, context);
        this.state = { isLoaded: false };
    }
    render() {
        return (
            <Navigator
                ref={this._onNavigatorRef}
                renderScene={this._renderScene}
                cardStyle={styles.navCardStyle}
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        if (this.state.isLoaded === false) {
            fm.utils.NavUtils.registerMain(navigator, {
                component: MainScene,
            });
            this.setState({ isLoaded: true });
        }
    }
    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        if (this.state && this.state.isLoaded) {
            return fm.utils.NavUtils.renderScene(navigatorRoute);
        } else {
            return null;
        }
    }
}
