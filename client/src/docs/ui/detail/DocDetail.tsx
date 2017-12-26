import rx = require('reactxp');

import fm = require('../../../framework');
import { ICanExpendedItem } from '../doclist/DocListState';
import { DocContent } from './DocContent';
import { BottomMark } from './BottomMark';
import { Home } from './Home';

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
    }),
};
const onLoactionChangeCallback: {
    [key: string]: (path: string) => void,
} = {};
export function onDocsPageLoactionChangeCallback(key: string, callback: (path: string) => void) {
    onLoactionChangeCallback[key] = callback;
}

interface IDocPageProps extends React.Props<any> {
    pathname: string;
    gotoSelectedPath: (pathname: string) => void;
    fetchDetailInfo: (pathname: string) => Promise<IDetailInfo>;
}
interface IState {
    detailResponse: fm.component.AsyncStore.AsyncResponse<IDetailInfo>;
}
export interface IDetailInfo {
    pathname: string;
    htmlResponse: string;
    clickExpendedItem: ICanExpendedItem;
}
export class DocDetail extends fm.component.ComponentBase<IDocPageProps, IState> {
    private mDetailStore: fm.component.AsyncStore.AsyncStore<IDetailInfo>;

    protected _buildState(props: IDocPageProps, initialBuild: boolean): IState {
        if (this.mDetailStore == null) {
            this.mDetailStore = new fm.component.AsyncStore.AsyncStore();
            window.setTimeout(() => this.mDetailStore.exePromise(this._fetchDetail()));
        }
        let response = this.mDetailStore.getResonse();
        if (!response.result) {
            response.state = 'fail';
        }
        return { detailResponse: response };
    }
    private _fetchDetail = async () => {
        const detail = await this.props.fetchDetailInfo(this.props.pathname);
        return detail;
    }
    componentDidUpdate(prevProps: IDocPageProps, prevState: IState) {
        super.componentDidUpdate(prevProps, prevState);
        if (onLoactionChangeCallback
            && this.props.pathname !== prevProps.pathname) {
            this.mDetailStore.exePromise(this._fetchDetail());
        }
    }
    render() {
        if (!this.props.pathname) {
            return (
                <Home />
            );
        }
        return (
            <fm.component.widget.EmptyView
                renderSucess={() => {
                    let clickItem = this.state.detailResponse.result.clickExpendedItem;
                    return (
                        <rx.View style={styles.root}>
                            <DocContent
                                htmlResponse={this.state.detailResponse.result.htmlResponse}
                                clickExpendedItem={clickItem}
                                gotoSelectedPath={this.props.gotoSelectedPath} />
                            {
                                clickItem ? (
                                    <BottomMark
                                        data={clickItem}
                                        gotoSelectedPath={this.props.gotoSelectedPath} />
                                ) : null
                            }

                        </rx.View>
                    );
                }}
                state={this.state.detailResponse.state}
                hint="init docs fail" />
        );
    }
}