import rx = require('reactxp');

import { VirtualListViewProps, VirtualListViewState, VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

interface Prop extends VirtualListViewProps {
    onRefresh?: () => any,
    onRefrreshComplete?: (err: string) => any,
    onMore?: () => any,
    onMoreComplete?: (err: string) => any,
}
export class ListView extends rx.Component<Prop, any>{
    render() {
        return (
            <VirtualListView {...this.props}
                itemList={this._getItemList()}
                renderItem={this._renderItem}
            />
        );
    }
    private _renderItem = (item: VirtualListViewItemInfo, hasFocus?: boolean) => {
        if (item.template === 'listView_pull_to_refresh') {

        }
        if(item.template === 'listView_on_more'){

        }
        return this.props.renderItem ? this.props.renderItem(item, hasFocus) : null;
    }
    private _getItemList = () => {
        let list = this.props.itemList || [];
        if (this.props.onRefresh) {
            list.unshift({
                key: 'listView_pull_to_refresh',
                height: 100,
                template: 'listView_pull_to_refresh',
            });
        }
        if(this.props.onMore){
            list.push({
                key: 'listView_on_more',
                height: 100,
                template: 'listView_on_more',
            });
        }
        return list;
    }
}