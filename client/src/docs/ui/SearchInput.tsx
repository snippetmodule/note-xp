import rx = require('reactxp');
import fm = require('../../framework');
import { DocsModelEntriyType, DocsModelTypeType, IDocInfo, ISearchItem } from '../core/model';

const styles = {
    searchInput: rx.Styles.createTextInputStyle({
        marginTop: 46,
        marginLeft: 20,
        marginRight: 20,
        height: 48,
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

    private _onChange = (v: string) => {
        this.setState({ searchKey: v });
        this.props.search(v);
    }
    render() {
        return (
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
        );
    }
}