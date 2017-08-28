import rx = require('reactxp');
import Navigator, { Types } from 'reactxp-navigation';

import MainScene = require('./main/MainScene');
import fm = require('../framework');


const styles = {
    navCardStyle:rx.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    })
};

export class App extends rx.Component<{}, null> {
    componentDidMount() {
        fm.utils.NavUtils.registerMain({
            component: MainScene
        });
    }

    render() {
        return (
            <rx.Navigator
                ref={this._onNavigatorRef}
                renderScene={fm.utils.NavUtils.renderScene}
                cardStyle={styles.navCardStyle}
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        fm.utils.NavUtils._navigator = navigator;
    }
}

