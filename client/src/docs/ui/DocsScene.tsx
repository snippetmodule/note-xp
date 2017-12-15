
import rx = require('reactxp');
import fm = require('../../framework');
import { SearchComp } from './SearchComp';
import { Docs } from '../core/Docs';
import { IDocInfo } from '../core/model';

interface IState {
    docsResponse: fm.component.AsyncStore.AsyncResponse<Docs>;
}
export class DocsScene extends fm.component.ComponentBase<{}, IState> {
    private mDocsStore: fm.component.AsyncStore.AsyncStore<Docs>;

    protected _buildState(props: {}, initialBuild: boolean): IState {
        if (this.mDocsStore == null) {
            this.mDocsStore = new fm.component.AsyncStore.AsyncStore();
            window.setTimeout(() => this.mDocsStore.exePromise(this._init()));
        }
        return { docsResponse: this.mDocsStore.getResonse() };
    }
    async _init(): Promise<Docs> {
        let docs: Docs = new Docs();
        await docs.init();
        return docs;
    }

    render() {
        return (
            <fm.component.widget.EmptyView
                state={this.state.docsResponse.state}
                hint={'init docs fail'}>
                <SearchComp docs={this.state.docsResponse.result} />
            </fm.component.widget.EmptyView>
        );
    }
}