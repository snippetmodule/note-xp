import rx = require('reactxp');
import fm = require('../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../core/model';

const styles = {
    root: rx.Styles.createViewStyle({
        backgroundColor: '#eeeeee',
        height: 48,
        alignItems: 'stretch',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#d7d7d7',
        alignSelf: 'stretch',
    }),
    contain: rx.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 31,
        paddingVertical: 8,
        paddingLeft: 8,
        paddingRight: 8,
        marginHorizontal: 18,
        backgroundColor: '#fff',
        borderColor: '#d2d2d2',
        borderWidth: 1,
        borderRadius: 3,
    }),
    containFocus: rx.Styles.createViewStyle({
        borderColor: '#398df0',
        borderWidth: 1,
    }),
    searchInput: rx.Styles.createTextInputStyle({
        backgroundColor: 'transparent',
        flex: 1,
        fontSize: 14,
        paddingLeft: 8,
        color: '#333',
    }),
    searchIcon: rx.Styles.createImageStyle({
        width: 20, height: 20,
    }),
    closeIcon: rx.Styles.createImageStyle({
        width: 16, height: 16,
    }),
    empty: rx.Styles.createViewStyle({}),
};
interface IProps {
    search: (key: string) => void;
}
interface IState {
    searchKey: string;
    isFocus: boolean;
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
    private _onClose = () => {
        this.setState({ searchKey: null });
        this._onSearchImpl(null);
    }
    private _onFocus = () => {
        this.setState({ isFocus: true });
    }
    private _onBlur = () => {
        this.setState({ isFocus: false });
    }
    render() {
        return (
            <rx.View style={styles.root}>
                <rx.View style={[styles.contain, this.state && this.state.isFocus ? styles.containFocus : styles.empty]}
                    onBlur={this._onBlur}
                    onFocus={this._onFocus}
                >
                    <rx.Image style={styles.searchIcon} source={require('../../../asserts/login/logo.png')} />
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
                    {
                        this.state && this.state.searchKey && this.state.searchKey.length > 0
                            ? (
                                <rx.View onPress={this._onClose}>
                                    <rx.Image style={styles.closeIcon} source={require('../../../asserts/login/logo.png')} />
                                </rx.View>)
                            : null
                    }
                </rx.View>
            </rx.View>

        );
    }
}