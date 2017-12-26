import rx = require('reactxp');
import { ISearchItem, IDocInfo } from '../../core/model';

export interface ISearchItemProp {
    data: ISearchItem;
    onClick: () => void;
    enableDoc: (selectedPath: string, docslug: string) => void;
    disableDoc: (docslug: string) => void;
    gotoSelectedPath: (pathname: string) => void;
    isSelected: boolean;
}
const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'stretch',
        paddingVertical: 8,
        paddingLeft: 16,
        paddingRight: 16,
    }),
    selected: rx.Styles.createViewStyle({
        backgroundColor: '#398df0',
    }),
    icon: rx.Styles.createImageStyle({
        width: 15,
        height: 15,
        marginLeft: 8,
    }),
    name: rx.Styles.createTextStyle({
        flex: 1,
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    }),
    nameSelected: rx.Styles.createTextStyle({
        color: '#fff',
    }),
    rightText: rx.Styles.createTextStyle({
        fontSize: 12,
        color: '#888',
    }),
    rightTextSelected: rx.Styles.createTextStyle({
        color: '#fff',
    }),
    empty: rx.Styles.createViewStyle({}),
};
export class SearchItem extends rx.Component<ISearchItemProp, any> {
    _getSelectStyle = (style: any) => {
        return this.props.isSelected ? style : styles.empty;
    }
    _enableDoc = () => {
        event.preventDefault();
        event.stopPropagation();
        this.props.enableDoc(this.props.data.pathname, this.props.data.slug);
    }
    _goSelectedPath = () => {
        event.preventDefault();
        event.stopPropagation();
        this.props.gotoSelectedPath(this.props.data.pathname);
    }
    render() {
        let isEnable = this.props.data.isEnable;
        let enableView = isEnable ? null : (
            <rx.Text onPress={this._enableDoc}
                style={[styles.rightText, this._getSelectStyle(styles.rightTextSelected)]}>
                Enable
            </rx.Text >
        );
        let goSelectView = isEnable ? (
            <rx.View onPress={this._goSelectedPath}>
                <rx.Image style={styles.icon}
                    source={require('../../../../asserts/login/logo.png')} />
            </rx.View>
        ) : null;
        return (
            <rx.View
                style={[styles.root, this._getSelectStyle(styles.selected)]}
                onPress={this.props.onClick}
            >
                <rx.Image style={styles.icon} source={require('../../../../asserts/login/logo.png')} />
                <rx.Text
                    numberOfLines={1} ellipsizeMode="tail"
                    style={[styles.name, this._getSelectStyle(styles.nameSelected)]}>
                    {this.props.data.name}
                </rx.Text>
                {enableView}
                {goSelectView}
            </rx.View>
        );
    }
}