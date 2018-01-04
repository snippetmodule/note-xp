import rx = require('reactxp');

import fm = require('../../../framework');
import { ICanExpendedItem } from '../doclist/DocListState';
import { BottomMark } from './BottomMark';
import { config } from '../../core/Docs';

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
        paddingTop: 18,
        paddingLeft: 24,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }),
    entryLayout: rx.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    entryName: rx.Styles.createTextStyle({
        fontSize: 24,
        color: '#333',
        marginRight: 16,
    }),
    entryAfter: rx.Styles.createViewStyle({
        height: 1,
        flex: 1,
        backgroundColor: '#e5e5e5',
    }),
    typeList: rx.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
        marginVertical: 21,
        paddingLeft: 14,
    }),
    typeName: rx.Styles.createLinkStyle({
        color: '#3377c0',
        fontSize: 14,
        paddingVertical: 3,
        marginTop: 3.5,
        textDecorationLine: 'none',
    }),
    typeNameFocus: rx.Styles.createLinkStyle({
        textDecorationLine: 'underline',
    }),
};
interface IDocContentProp {
    pathname: string;
    htmlResponse?: string;
    clickExpendedItem?: ICanExpendedItem;
    gotoSelectedPath: (pathname: string) => void;
}

export class DocContent extends rx.Component<IDocContentProp, any> {
    _onLinkPress = (url: string) => {
        if (url === config.docs_host_link) {
            let split = this.props.pathname.split('/');
            this.props.gotoSelectedPath(`/${split[1]}/${split[2]}${url}`);
        } else {
            window.open(url);
        }
    }
    render() {
        const clickExpendedItem = this.props.clickExpendedItem;
        let htmlContent = this.props.htmlResponse;
        const iconCss = (clickExpendedItem && clickExpendedItem.data.docInfo ? '_' + clickExpendedItem.data.docInfo.type : '');
        if (clickExpendedItem) {
            const mDocInfo = clickExpendedItem.data.docInfo;
            if (mDocInfo && mDocInfo.links) {
                htmlContent = '<p class="_links">' +
                    (mDocInfo.links.home ? ('<a href="XXXX" class="_links-link">Homepage</a>'.replace('XXXX', mDocInfo.links.home)) : '') +
                    (mDocInfo.links.code ? ('<a href="XXXX" class="_links-link">Source code</a>'.replace('XXXX', mDocInfo.links.code)) : '') +
                    '</p>' + htmlContent;
            }
            if (clickExpendedItem.data.docType && !clickExpendedItem.data.docEntry) {
                return (
                    <rx.ScrollView style={styles.root}>
                        <rx.View style={styles.entryLayout}>
                            <rx.Text style={styles.entryName}>
                                {clickExpendedItem.parent.data.name + ' / ' + clickExpendedItem.data.name}
                            </rx.Text>
                            <rx.View style={styles.entryAfter} />
                        </rx.View>

                        <rx.View style={styles.typeList}>
                            {clickExpendedItem.child.map((item, index) => {
                                return (
                                    <fm.component.widget.Link
                                        url={item.data.name}
                                        key={index + item.data.name}
                                        style={styles.typeName}
                                        focusStyle={styles.typeNameFocus}
                                        name={item.data.name}
                                        onClick={this.props.gotoSelectedPath.bind(null, item.data.pathname)} />
                                );
                            })}
                        </rx.View>
                    </rx.ScrollView>
                );
            }
        }

        return (
            <rx.ScrollView style={styles.root}>
                <fm.component.widget.HtmlView
                    value={htmlContent}
                    onLinkPress={this._onLinkPress} />
            </rx.ScrollView>
        );
    }
}