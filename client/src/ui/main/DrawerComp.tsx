import rx = require('reactxp');

import fm = require('../../framework');
import { Home } from './home/Home';
import { MenuComp } from './MenuComp';

// let BackAndroid: any;
// if (fm.utils.DeviceUtils.isAndroid) {
//     let ReactNative = require('react-native');
//     BackAndroid = ReactNative.BackAndroid;
// }

export class DrawerComp extends rx.Component<{}, null>{

    private _drawer: fm.component.widget.DrawerLayout;
    private _backPressedTime: number = 0;

    public componentDidMount() {
        window.addEventListener('hardwareBackPress',this.handleBackButton);
    }

    public componentWillUnmount() {
        window.removeEventListener('hardwareBackPress',this.handleBackButton);
    }
    private handleBackButton = () => {
        if (this._isDrawerOpen()) {
            this._toggleDrawer();
            return true;
        }
        let curTime = new Date().getTime();
        if (curTime - this._backPressedTime < 2 * 1000) {
            // ReactNative.BackAndroid.exitApp();
            return false;
        } else {
            this._backPressedTime = curTime;
            fm.utils.ToastUtils.showToast('press back again');
            return true;
        }
    }
    render() {
        return (
            <fm.component.widget.DrawerLayout
                ref={(ref: fm.component.widget.DrawerLayout) => this._drawer = ref}
                drawerWidth={270}
                drawerPosition='right'
                renderNavigationView={this._renderDrawer}
            >
                <Home isDrawerOpen={this._isDrawerOpen} toggleDrawer={this._toggleDrawer} />
            </fm.component.widget.DrawerLayout>
        );
    }
    _renderContent = (): JSX.Element => {
        return (
            <Home isDrawerOpen={this._isDrawerOpen} toggleDrawer={this._toggleDrawer} />
        );
    }
    _isDrawerOpen = () => {
        return this._drawer.state.drawerShown;
    }
    _toggleDrawer = () => {
        if (this._drawer.state.drawerShown) {
            this._drawer.closeDrawer();
        } else {
            this._drawer.openDrawer();
        }
    }
    _renderDrawer = () => {
        return (<MenuComp />);
    }
}