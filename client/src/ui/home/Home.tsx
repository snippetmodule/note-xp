import rx = require('reactxp');
import fm = require('../../framework');
import models = require('../modles');
import utils = require('../utils');

import { SimpleItemComp, IArticleItem } from './SimpleItemComp';
import { PicItemComp } from './PicItemComp';
import { VideoItemComp } from './VideoItemComp';
import { ArticleListComp } from './ArticleListComp';

const styles = {
    listView: rx.Styles.createViewStyle({
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    }),
};
// let data: fm.models.BaseJson<models.Json.Article[]> = require('./data');

interface IProps {
    isDrawerOpen: () => boolean;
    toggleDrawer: () => any;
}
export class Home extends rx.Component<IProps, any> {
    private _list: ArticleListComp;

    private onMenu = () => {
        this.props.toggleDrawer();
    }
    private onTitle = () => {
        this._list._onRefresh();
    }
    private onSearch = () => {

    }
    render() {
        return (
            <fm.component.TitleComponent
                onBack={this.onSearch}
                onTitle={this.onTitle}
                onRight={this.onMenu}
                backImg={require('../../../asserts/home/home_search.png')}
                titleImg={require('../../../asserts/home/logo.png')}
                rightImg={require('../../../asserts/home/home_menu.png')}
            >
                <ArticleListComp ref={this._onRefList} />
            </fm.component.TitleComponent>
        );
    }
    private _onRefList = (ref: ArticleListComp) => {
        this._list = ref;
    }
}