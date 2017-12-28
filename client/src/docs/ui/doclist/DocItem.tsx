import rx = require('reactxp');
import { ICanExpendedItem } from './DocListState';

import { IItemProp } from './DocList';
import { ExpandIcon } from './ExpendIcon';

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
    expendIcon: rx.Styles.createViewStyle({
        alignItems: 'center',
        width: 31,
        height: 20,
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
export class DocItem extends rx.Component<IItemProp, any> {
    _renderExpendIcon = () => {
        if (this.props.stateItem.child.length === 0) {
            return (
                <rx.View style={styles.expendIcon} />
            );
        }
        return (
            <ExpandIcon style={styles.expendIcon}
                size={20}
                isExpend={this.props.stateItem.isExpended}
                fillColor="#333"
                focsusColor="#000``" />
        );
    }
    _renderDocIcon = () => {
        if (this.props.stateItem.child.length === 0) {
            return null;
        }
        let isEnable = this.props.stateItem.data.docInfo && this.props.stateItem.data.docInfo.storeValue;
        if ((isEnable && this.props.stateItem.deep === 0)
            || (!isEnable && this.props.stateItem.deep === 1)) {
            return (
                <rx.Image style={styles.icon} source={require('../../../../asserts/login/logo.png')} />
            );
        }

        return null;
    }
    _renderRight = () => {
        const style = [styles.rightText, this._getSelectStyle(styles.rightTextSelected)];
        let isEnable = this.props.stateItem.data.docInfo && this.props.stateItem.data.docInfo.storeValue;
        if (this.props.stateItem.data.name === 'Disable') {
            return null;
        }
        if (isEnable && this.props.stateItem.deep > 0) {
            return (
                <rx.Text style={style}>
                    {this.props.stateItem.child.length === 0 ? ' ' : this.props.stateItem.child.length}
                </rx.Text >
            );
        }
        if (!isEnable && this.props.stateItem.child.length > 0) {
            return null;
        }
        if (this.props._isSelected) {
            if (isEnable && this.props.stateItem.deep === 0) {
                return (
                    <rx.Text style={style} onPress={this.props.disableDoc}>
                        Disable
                    </rx.Text >
                );
            }
            if (!isEnable && this.props.stateItem.child.length === 0) {
                return (
                    <rx.Text style={style} onPress={this.props.enableDoc} >
                        Enable
                    </rx.Text>
                );
            }
        } else {
            return (
                <rx.Text style={style}>
                    {this.props.stateItem.data.docInfo
                        && this.props.stateItem.data.docInfo.release}
                </rx.Text>
            );
        }
        return null;
    }
    _getSelectStyle = (style: any) => {
        return this.props._isSelected ? style : styles.empty;
    }
    render() {
        const { _isSelected, stateItem } = this.props;
        const isLeafNode = this.props.stateItem.child.length === 0;
        const isOpen: boolean = stateItem.isExpended ? true : false;
        // const splits = stateItem.data.docInfo.slug.split('~');
        // const iconClass = '_icon-' + splits[0];
        const stylePadding = { paddingLeft: isLeafNode ? this.props.stateItem.deep * 8 - 8 : this.props.stateItem.deep * 8 };
        return (
            <rx.View
                onPress={this.props.onClickItem}
                style={[styles.root, this._getSelectStyle(styles.selected), stylePadding]}
            >
                {this._renderExpendIcon()}
                {this._renderDocIcon()}
                <rx.Text
                    numberOfLines={1} ellipsizeMode="tail"
                    style={[styles.name, this._getSelectStyle(styles.nameSelected)]}>
                    {stateItem.data.name}
                </rx.Text>
                {this._renderRight()}
            </rx.View>
        );
    }
}