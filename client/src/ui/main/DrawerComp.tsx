import rx = require('reactxp');

import fm = require('../../framework');

import { Home } from './home/Home';
import { MenuComp } from './MenuComp';

export class DrawerComp extends rx.Component<{}, null>{

    private _drawer: fm.component.widget.DrawerControl;

    render() {
        return (
            <fm.component.widget.DrawerControl
                ref={(ref: fm.component.widget.DrawerControl) => this._drawer = ref}
                drawerPosition='right'
                renderContent={this._renderContent}
                renderDrawer={this._renderDrawer}
            />
        );
    }
    _renderContent = (): JSX.Element => {
        return (
            <Home isDrawerOpen={this._isDrawerOpen} toggleDrawer={this._toggleDrawer} />
        );
    }
    _isDrawerOpen = () => {
        return this._drawer.isDrawerOpen();
    }
    _toggleDrawer = () => {
        this._drawer.toggleDrawer();
    }
    _renderDrawer = () => {
        return (<MenuComp />);
    }
}