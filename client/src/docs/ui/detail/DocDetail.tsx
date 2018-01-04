import rx = require('reactxp');

import fm = require('../../../framework');
import { ICanExpendedItem } from '../doclist/DocListState';
import { DocContent } from './DocContent';
import { BottomMark } from './BottomMark';
import { HomeDetail } from './HomeDetail';
import { DeviceUtils } from '../../../framework/utils/index';

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
    }),
};
export interface IDetailInfo {
    pathname: string;
    htmlResponse: string;
    clickExpendedItem: ICanExpendedItem;
}
interface IDocPageProps extends React.Props<any> {
    gotoSelectedPath: (pathname: string) => void;
    fetchDetailInfo: (pathname: string) => Promise<IDetailInfo>;
}
interface IState {
    pathname: string;
    detailResponse: fm.component.AsyncStore.AsyncResponse<IDetailInfo>;
}
export class DocDetail extends fm.component.ComponentBase<IDocPageProps, IState> {
    private mDetailStore: fm.component.AsyncStore.AsyncStore<IDetailInfo>;

    protected _buildState(props: IDocPageProps, initialBuild: boolean): IState {
        if (this.mDetailStore == null) {
            this.mDetailStore = new fm.component.AsyncStore.AsyncStore();
        }
        let response = this.mDetailStore.getResonse();
        return { ...this.state, detailResponse: response };
    }
    private _fetchDetail = async (pathname: string) => {
        const detail = await this.props.fetchDetailInfo(pathname);
        return detail;
    }
    shouldComponentUpdate(nextProps: IDocPageProps, nextState: IState) {
        if (this.state.pathname !== nextState.pathname) {
            window.setTimeout(() => {
                this.mDetailStore.exePromise(this._fetchDetail(nextState.pathname));
            });
        }
        return super.shouldComponentUpdate(nextProps, nextState);
    }
    render() {
        if (!this.state.pathname || this.state.pathname === 'disable') {
            return (
                <HomeDetail />
            );
        }
        return (
            <fm.component.widget.EmptyView
                renderSucess={() => {
                    let clickItem = this.state.detailResponse.result.clickExpendedItem;
                    return (
                        <rx.View style={styles.root}>
                            <DocContent
                                pathname={this.state.pathname}
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