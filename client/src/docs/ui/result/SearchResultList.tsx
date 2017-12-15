import rx = require('reactxp');
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import fm = require('../../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../../core/model';
import uuid = require('uuid');
import { SearchItem } from './SearchItem';

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        backgroundColor: '#fff',
    }),
    name: rx.Styles.createTextStyle({
        color: '#2b2b2b',
        fontSize: 16,
        flex: 1,
    }),
};
interface IProps {
    enableDoc: (selectedPath: string, docInfo: IDocInfo) => void;
    disableDoc: (docInfo: IDocInfo) => void;
    gotoSelectedPath: (pathname: string) => void;
    searchResult: ISearchItem[];
}
interface IState {
    result: ISearchViewItem[];
}
interface ISearchViewItem extends VirtualListViewItemInfo {
    data: ISearchItem;
    isSelected: boolean;
}

export class SearchResultList extends rx.Component<IProps, IState> {

    private generalList = (data: ISearchItem[]) => {
        return data.map((item, index) => {
            return {
                key: uuid.v4() + item.name + '__' + index,
                height: 30,
                measureHeight: false,
                template: 'simple',
                data: item,
                isSelected: false,
            };
        });
    }
    componentWillMount(): void {
        this.setState({ result: this.generalList(this.props.searchResult) });
    }
    componentWillReceiveProps(nextProps: IProps, nextContext: any) {
        this.setState({ result: this.generalList(nextProps.searchResult) });
    }
    render() {
        return (
            <VirtualListView style={styles.root}
                padding={5}
                itemList={this.state ? this.state.result : []}
                renderItem={this._renderItem}
                animateChanges={true}
                skipRenderIfItemUnchanged={true}
            />
        );
    }
    _onClick = (item: ISearchViewItem) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            result: this.state.result.map((v, i) => {
                return { ...v, isSelected: v.key === item.key };
            }),
        });
    }

    private _renderItem = (item: ISearchViewItem, hasFocus?: boolean) => {
        // fm.utils.Log.i('_renderItem', item.template + item.key);
        let prop = {
            data: item.data,
            isSelected: item.isSelected,
            onClick: () => { this._onClick(item); },
        };
        return (
            <SearchItem {...prop}
                enableDoc={this.props.enableDoc}
                disableDoc={this.props.disableDoc}
                gotoSelectedPath={this.props.gotoSelectedPath} />
        );
    }
}