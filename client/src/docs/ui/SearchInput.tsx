import rx = require('reactxp');
import fm = require('../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../core/model';

const styles = {
    root: rx.Styles.createViewStyle({
        backgroundColor: '#ccc',
        alignSelf: 'stretch',
    }),
    contain: rx.Styles.createViewStyle({
        margin: 20,
        backgroundColor: '#fff',
        borderColor: '#d2d2d2',
        borderRadius: 3,
    }),
    searchInput: rx.Styles.createTextInputStyle({
        height: 40,
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#333333',
    }),
};
interface IProps {
    search: (key: string) => void;
}
interface IState {
    searchKey: string;
}
export class SearchInput extends rx.Component<IProps, IState> {
    private _mSearchTimer: number;

    componentWillUnmount(): void {
        if (this._mSearchTimer) {
            window.clearTimeout(this._mSearchTimer);
        }
    }

    private _onSearchImpl = (v: string) => {
        if (this._mSearchTimer) {
            window.clearTimeout(this._mSearchTimer);
        }
        this._mSearchTimer = window.setTimeout(() => {
            this.props.search(v);
        }, this._mSearchTimer === null ? 0 : 500);
    }
    private _onChange = (v: string) => {
        this.setState({ searchKey: v });
        this._onSearchImpl(v);
    }
    render() {
        return (
            <rx.View style={styles.root}>
                <rx.View style={styles.contain}>
                    <rx.TextInput
                        placeholder="Please Input Search Text"
                        placeholderTextColor="#BBBBBB"
                        multiline={false}
                        autoFocus={true}
                        maxLength={11}
                        returnKeyType="next"
                        keyboardType="numeric"
                        style={styles.searchInput}
                        value={this.state == null ? '' : this.state.searchKey}
                        onChangeText={this._onChange}
                    />
                </rx.View>
            </rx.View>

        );
    }
}