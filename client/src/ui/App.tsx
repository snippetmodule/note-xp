/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

// import MainPanel = require('../MainPanel');
import SecondPanel = require('../SecondPanel');

import MainScene = require('./main/MainScene');

enum NavigationRouteId {
    Main,
    SecondPanel
}

const styles = {
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    })
};

export class App extends RX.Component<{}, null> {
    private _navigator: RX.Navigator;

    componentDidMount() {
        this._navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.Main,
            sceneConfigType: RX.Types.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <RX.Navigator
                ref={this._onNavigatorRef}
                renderScene={this._renderScene}
                cardStyle={styles.navCardStyle}
            />
        );
    }

    private _onNavigatorRef = (navigator: RX.Navigator) => {
        this._navigator = navigator;
    }

    private _renderScene = (navigatorRoute: RX.Types.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.Main:
                return <MainScene />
            case NavigationRouteId.SecondPanel:
                return <SecondPanel onNavigateBack={null} />
            default:
                return <MainScene />
        }
    }
}

