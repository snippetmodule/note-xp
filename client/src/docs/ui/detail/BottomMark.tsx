import rx = require('reactxp');

import fm = require('../../../framework');
import { ICanExpendedItem } from '../doclist/DocListState';
import { ExpandIcon } from '../doclist/ExpendIcon';

const styles = {
    root: rx.Styles.createViewStyle({
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 8,
        height: 32,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderColor: '#e1e1e1',
    }),
    docicon: rx.Styles.createImageStyle({
        width: 15,
        height: 15,
        marginLeft: 8,
        marginRight: 8,
    }),
    docname: rx.Styles.createLinkStyle({
        fontSize: 14,
        color: '#333',
        textDecorationLine: 'none',
    }),
    docnameFocus: rx.Styles.createLinkStyle({
        color: '#3377c0',
        textDecorationLine: 'underline',
    }),
    expendIcon: rx.Styles.createViewStyle({
        alignItems: 'center',
        width: 31,
        height: 15,
    }),
};
interface IBottomMarkProps {
    data: ICanExpendedItem;
    gotoSelectedPath: (pathname: string) => void;
}
interface IState {
    isDocNameFocus: boolean;
    isPathnameFocus: boolean;
}
export class BottomMark extends rx.Component<IBottomMarkProps, any> {
    _renderExpendIcon = () => {
        if (!this.props.data.data.docType) {
            return null;
        }
        return (
            <ExpandIcon style={styles.expendIcon}
                size={20}
                isExpend={false}
                fillColor="#333"
                focsusColor="#000" />
        );
    }
    public render() {
        const { docInfo, docType, docEntry } = this.props.data.data;
        if (!docType && !docEntry) {
            return null;
        }
        return (
            <rx.View style={styles.root}>
                <rx.Image style={styles.docicon} source={require('../../../../asserts/login/logo.png')} />
                <fm.component.widget.Link
                    url={docInfo.name + ' ' + (docInfo.version || '')}
                    name={docInfo.name + ' ' + (docInfo.version || '')}
                    style={styles.docname}
                    focusStyle={styles.docnameFocus}
                    onClick={this.props.gotoSelectedPath.bind(null, docInfo.pathname)}>
                    {docInfo.name + ' ' + (docInfo.version || '')}
                </fm.component.widget.Link>
                {this._renderExpendIcon()}
                {
                    docType ? (
                        <fm.component.widget.Link
                            url={docType.name}
                            name={docType.name}
                            style={styles.docname}
                            focusStyle={styles.docnameFocus}
                            onClick={this.props.gotoSelectedPath.bind(null, docType.pathname)}>
                            {docType.name}
                        </fm.component.widget.Link>
                        // <rx.Text
                        //     onPress={this.props.gotoSelectedPath.bind(null, docType.pathname)}>
                        //     {docType.name}
                        // </rx.Text>
                    ) : null
                }
                {docEntry ? this._renderExpendIcon() : null}
                <rx.Text style={styles.docname}>{docEntry ? docEntry.name : ''}</rx.Text>
            </rx.View >
        );
    }
}