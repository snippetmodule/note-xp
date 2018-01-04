import rx = require('reactxp');
import fm = require('../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../core/model';
import { Docs } from '../core/Docs';

import { SearchResultList } from './result/SearchResultList';
import { DocList } from './doclist/DocList';
import { SearchInput } from './SearchInput';
import { DocDetail, IDetailInfo } from './detail/DocDetail';
import { ICanExpendedItem } from './doclist/DocListState';

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
    }),
    left: rx.Styles.createViewStyle({
        width: 280,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        alignSelf: 'stretch',
        borderRightWidth: 1,
        borderColor: '#e1e1e1',
    }),
};
interface IProp {
    docs: Docs;
}
interface IState {
    searchResult?: ISearchItem[];
}
export class SearchComp extends rx.Component<IProp, IState> {
    private mSearchInput: SearchInput;
    private mDocDetail: DocDetail;
    private mDocList: DocList;

    _enableDoc = (selectedPath: string, docslug: string) => {
        this.mSearchInput.setState({ searchKey: null });
        this.props.docs.addDoc(docslug).then((res) => {
            this.setState({ searchResult: null });
            this.mDocList.componentDidMount();
        }).catch((err) => console.log('enableDoc err:' + docslug + err.stack));
    }
    _disableDoc = (docslug: string) => {
        this.props.docs.removeDoc(docslug).then((res) => {
            this.setState({ ...this.state });
        }).catch((err) => console.log('disableDoc err:' + docslug + err.stack));
    }
    _gotoSelectedPath = (pathname: string) => {
        this.mSearchInput.setState({ searchKey: '', isFocus: false });
        this.mDocDetail.setState({ pathname: pathname });
    }
    _fetchDetailInfo = async (pathname: string): Promise<IDetailInfo> => {
        let _clickExpendedItem: ICanExpendedItem = this.mDocList ? this.mDocList._getItemByPathName(pathname) : null;
        if (_clickExpendedItem && _clickExpendedItem.data.docType && !_clickExpendedItem.data.docEntry) {
            return { pathname: pathname, htmlResponse: null, clickExpendedItem: _clickExpendedItem };
        }
        let htmlResponse: string = await this.props.docs.fetchDetail(pathname);
        return { pathname: pathname, clickExpendedItem: _clickExpendedItem, htmlResponse: htmlResponse };
    }
    _refreshDetail = (pathname: string) => {
        this.mDocDetail.setState({ pathname: pathname });
    }
    render() {
        return (
            <rx.View style={styles.root}>
                <rx.View style={styles.left}>
                    <SearchInput search={this._search} ref={ref => this.mSearchInput = ref} />
                    {
                        this.state && this.state.searchResult && this.state.searchResult.length > 0
                            ? <SearchResultList
                                enableDoc={this._enableDoc}
                                disableDoc={this._disableDoc}
                                gotoDocList={this._gotoSelectedPath}
                                refreshDetail={this._refreshDetail}
                                searchResult={this.state.searchResult} />
                            : <DocList
                                ref={ref => this.mDocList = ref}
                                docs={this.props.docs}
                                enableDoc={this._enableDoc}
                                disableDoc={this._disableDoc}
                                gotoSelectedPath={this._gotoSelectedPath}
                            />
                    }
                </rx.View>
                <DocDetail
                    ref={(ref: DocDetail) => this.mDocDetail = ref}
                    gotoSelectedPath={this._gotoSelectedPath}
                    fetchDetailInfo={this._fetchDetailInfo} />
            </rx.View>
        );
    }
    _search = (key: string) => {
        if (!key) {
            this.setState({ searchResult: null });
            return;
        }
        this.props.docs.search(key)
            .then(r => {
                if (this.mSearchInput.state.searchKey === key) {
                    this.setState({ searchResult: r });
                }
            });
    }
}