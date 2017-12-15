import rx = require('reactxp');

import fm = require('../../../framework');
import { ICanExpendedItem } from '../doclist/DocListState';
import { BottomMark } from './BottomMark';

const styles = {
    root: rx.Styles.createViewStyle({
        flex: 1,
    }),
};
interface IDocContentProp {
    htmlResponse?: string;
    clickExpendedItem?: ICanExpendedItem;
    gotoSelectedPath: (pathname: string) => void;
}

export class DocContent extends rx.Component<IDocContentProp, any> {
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
                    <rx.View style={styles.root}>
                        <rx.Text>
                            {clickExpendedItem.data.name + ' / ' + clickExpendedItem.parent.data.name}
                        </rx.Text>
                        <rx.View>
                            {clickExpendedItem.child.map((item, index) => {
                                return (
                                    <rx.Text key={index}
                                        onPress={this.props.gotoSelectedPath.bind(null, item.data.pathname)} >
                                        {item.data.name}
                                    </rx.Text>
                                );
                            })}
                        </rx.View>
                    </rx.View>
                );
            }
        }

        return (
            <fm.component.widget.HtmlView
                htmlContent={htmlContent}
                className={'_page ' + iconCss} />
        );
    }
}