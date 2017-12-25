import rx = require('reactxp');
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import { Docs } from '../../core/Docs';
import { ICanExpendedState, DocListState, ICanExpendedItem } from './DocListState';
import { IDocInfo } from '../../core/model';

import uuid = require('uuid');
import { DocItem } from './DocItem';

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
    }),
    name: rx.Styles.createTextStyle({
        color: '#2b2b2b',
        fontSize: 16,
        flex: 1,
    }),
};
interface IProp {
    docs: Docs;
    enableDoc: (selectedPath: string, docInfo: IDocInfo) => void;
    disableDoc: (docInfo: IDocInfo) => void;
    gotoSelectedPath: (pathname: string) => void;
}
interface IState {
    listItems: IDocItem[];
    slectedIndex: number;
}
export interface IItemProp {
    _isSelected: boolean;
    stateItem: ICanExpendedItem;
    onClickItem: () => void;
    enableDoc: () => void;
    disableDoc: () => void;
}
export interface IDocItem extends VirtualListViewItemInfo {
    data: ICanExpendedItem;
}
export class DocList extends rx.Component<IProp, IState> {
    componentDidMount() {
        this.generalList(true);
    }
    private onClickItem = (index: number, stateItem: ICanExpendedItem) => {
        if (stateItem.child.length > 0) {
            stateItem.isExpended = !stateItem.isExpended;
        }
        this.generalList(false, index);
        if (stateItem.data.name === 'disable') {
            return;
        }
        this.props.gotoSelectedPath(stateItem.data.pathname);
        // if (stateItem.data.pathname) {
        //     history.push({ pathname: stateItem.data.pathname });
        // }
    }
    private generalList = (force: boolean, clickIndex: number = this.state ? this.state.slectedIndex : -1) => {
        if (!this.props.docs) { return; }
        const list = new DocListState(this.props.docs, force, clickIndex);
        this.setState({
            listItems: list.listItems.map((item, index) => {
                return {
                    key: uuid.v4() + item.data.pathname + '__' + index,
                    height: 30,
                    measureHeight: false,
                    template: 'simple',
                    data: item,
                };
            }),
            slectedIndex: list.selectedIndex,
        });
    }
    _getItemByPathName = (pathname: string): ICanExpendedItem => {
        for (let item of this.state.listItems) {
            if (item.data.data.pathname === pathname) {
                return item.data;
            }
        }
        return null;
    }
    render() {
        return (
            <VirtualListView style={styles.root}
                padding={5}
                itemList={this.state ? this.state.listItems : []}
                renderItem={this._renderItem}
                animateChanges={true}
                skipRenderIfItemUnchanged={true}
            />
        );
    }
    private _renderItem = (item: IDocItem, hasFocus?: boolean) => {
        const _stateItem: ICanExpendedItem = item.data;
        const index = this.state.listItems.indexOf(item);
        const itemProps: IItemProp = {
            stateItem: _stateItem,
            _isSelected: this.state.slectedIndex === index,
            onClickItem: () => { event.preventDefault(); event.stopPropagation(); this.onClickItem(index, _stateItem); },
            enableDoc: () => { event.preventDefault(); event.stopPropagation(); this.props.enableDoc('', _stateItem.data.docInfo); },
            disableDoc: () => { event.preventDefault(); event.stopPropagation(); this.props.disableDoc(_stateItem.data.docInfo); },
        };
        return (<DocItem key={item.key} {...itemProps} />);
    }
}