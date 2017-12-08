import rx = require('reactxp');
import Navigator, { Types } from 'reactxp-navigation';

import {DocsScene } from '..//docs/ui/DocsScene';
import fm = require('../framework');

const styles = {
    navCardStyle: rx.Styles.createViewStyle({
        backgroundColor: '#f5fcff',
    }),
};
interface IState {
    isLoaded: boolean;
}
export class App extends rx.Component<{}, {}> {

    componentDidMount() {
        fm.utils.NavUtils.registerMain({
            component: DocsScene,
        });
    }
    render() {
        return (
            <Navigator
                ref={this._onNavigatorRef}
                renderScene={this._renderScene}
                navigateBackCompleted={this._navigateBackCompleted}
                transitionStarted={this._transitionStarted}
                transitionCompleted={this._transitionCompleted}
                cardStyle={styles.navCardStyle}
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        fm.utils.NavUtils.registerNavigator(navigator);
    }
    private _renderScene = (navigatorRoute: Types.NavigatorRoute) => {
        return fm.utils.NavUtils.renderScene(navigatorRoute);
    }
    private _transitionStarted = (progress?: rx.Types.AnimatedValue, toRouteId?: string, fromRouteId?: string, toIndex?: number, fromIndex?: number) => {
        fm.utils.Log.i('App', `toRouteId:${toRouteId},fromRouteId:${fromRouteId},toIndex:${toIndex},fromIndex:${fromIndex}`);
    }
    private _transitionCompleted = () => {
        fm.utils.Log.i('App', '_transitionCompleted');
    }
    private _navigateBackCompleted = () => {
        fm.utils.Log.i('App', '_navigateBackCompleted');
    }
}
