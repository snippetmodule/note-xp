import RX = require('reactxp');

import MainScene = require('./main/MainScene');
import NavUtils = require('../framework/utils/NavUtils');

const styles = {
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    })
};

export class App extends RX.Component<{}, null> {
    componentDidMount() {
        NavUtils.registerMain({
            component: MainScene
        });
    }

    render() {
        return (
            <RX.Navigator
                ref={this._onNavigatorRef}
                renderScene={NavUtils.renderScene}
                cardStyle={styles.navCardStyle}
            />
        );
    }

    private _onNavigatorRef = (navigator: RX.Navigator) => {
        NavUtils._navigator = navigator;
    }
}

