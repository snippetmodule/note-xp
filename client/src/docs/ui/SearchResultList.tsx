import rx = require('reactxp');
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import fm = require('../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../core/model';

const styles = {
    listView: rx.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    }),
    name: rx.Styles.createTextStyle({
        color: '#2b2b2b',
        fontSize: 16,
        flex: 1,
    }),
};
interface IProps {
    searchResult: ISearchViewItem[];
}
export interface ISearchViewItem extends VirtualListViewItemInfo {
    data: ISearchItem;
}

export class SearchResultList extends rx.Component<IProps, {}> {

    render() {
        return (
            <VirtualListView style={styles.listView}
                padding={5}
                itemList={this.props.searchResult || []}
                renderItem={this._renderItem}
                onScroll={this._onScroll}
                animateChanges={true}
                skipRenderIfItemUnchanged={true}
            />
        );
    }
    private _renderItem = (item: ISearchViewItem, hasFocus?: boolean) => {
        // fm.utils.Log.i('_renderItem', item.template + item.key);
        return (
            <rx.Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                {item.data.name}
            </rx.Text>
        );
    }
    private _onScroll = (scrollTop: number, scrollLeft: number) => {

    }
}