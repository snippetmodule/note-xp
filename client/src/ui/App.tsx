import rx = require('reactxp');
import Navigator, { Types } from 'reactxp-navigation';

import MainScene = require('./main/MainScene');
import fm = require('../framework');


const styles = {
    navCardStyle: rx.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    })
};
interface State {
    isLoaded: boolean;
}
export class App extends rx.Component<{}, State> {
    render() {
        return (
            <rx.Navigator
                ref={this._onNavigatorRef}
                renderScene={this._renderScene}
                cardStyle={styles.navCardStyle}
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        fm.utils.NavUtils.registerMain(navigator, {
            component: MainScene
        });
        this.setState({ isLoaded: true });
    }
    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        if (this.state && this.state.isLoaded) {
            return fm.utils.NavUtils.renderScene(navigatorRoute);
        } else {
            return null;
        }
    }
}

