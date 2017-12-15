import rx = require('reactxp');
import fm = require('../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../core/model';
import { SearchInput } from './SearchInput';
import { Docs } from '../core/Docs';
import { ISearchViewItem, SearchResultList } from './SearchResultList';

import uuid = require('uuid');

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
        return (
            <fm.component.widget.EmptyView
                state={this.state.docsResponse.state}
                hint="init docs fail">
                <SearchInput search={this._search} />
                <SearchResultList searchResult={this.state.searchResult} />
            </fm.component.widget.EmptyView>
        );
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
                key: uuid.v4() + item.name + '__' + index,
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