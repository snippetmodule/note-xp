import rx = require('reactxp');
import fm = require('../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../core/model';
import { SearchInput } from './SearchInput';
import { Docs } from '../core/Docs';
import { ISearchViewItem, SearchResultList } from './SearchResultList';

interface IState {
    docsResponse: fm.component.AsyncStore.AsyncResponse<Docs>;
    searchResult?: ISearchViewItem[];
}
export class SearchComp extends fm.component.ComponentBase<{}, IState> {
    private mDocsStore: fm.component.AsyncStore.AsyncStore<Docs>;

    async _init(): Promise<Docs> {
        let docs: Docs = new Docs();
        await docs.init();
        return docs;
    }
    protected _buildState(props: {}, initialBuild: boolean): IState {
        if (this.mDocsStore == null) {
            this.mDocsStore = new fm.component.AsyncStore.AsyncStore();
            window.setTimeout(() => this.mDocsStore.exePromise(this._init()));
        }
        return { docsResponse: this.mDocsStore.getResonse() };
    }
    render() {
        switch (this.state.docsResponse.state) {
            case 'sucess':
                return (
                    <rx.View>
                        <SearchInput search={this._search} />
                        <SearchResultList searchResult={this.state.searchResult} />
                    </rx.View>
                );
            case 'fail':
                return (<fm.component.widget.EmptyView hint="init docs fail" state="fail" />);
            default:
                return (<fm.component.widget.EmptyView state="loading" />);
        }
    }
    _search = (key: string) => {
        if (this.state.docsResponse && this.state.docsResponse.result) {
            this.state.docsResponse.result.search(key)
                .then(r => this.setState({ searchResult: this.generalList(r) }));
        }
    }
    private generalList = (data: ISearchItem[]) => {
        return data.map((item, index) => {
            return {
                key: item.name + '__' + index,
                height: 100,
                measureHeight: true,
                template: this._getItemTemplate(item),
                data: item,
            };
        });
    }
    private _getItemTemplate = (item: ISearchItem) => {
        return 'simple';
    }
}